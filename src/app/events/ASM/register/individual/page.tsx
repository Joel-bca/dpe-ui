"use client";
import React, { useState } from "react";
import RegisterLayout from "@/app/events/ASM/register/registrationlayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getNewClearId } from "@/lib/utils";
import { generateClient } from "aws-amplify/api";
import { listUsers, listIndividualRegistrations } from "@/graphql/queries";
import {
  createUser as createUserMutation,
  createIndividualRegistration as createIndividualRegistrationMutation,
} from "@/graphql/mutations";
import { useRouter } from "next/navigation";

const client = generateClient({ authMode: "apiKey" });

// ---------- Validation schemas (unchanged logic) ----------
const PersonalSchema = z.object({
  fullName: z.string().min(3, "Enter your full name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
});

const CollegeSchema = z.object({
  registrationNumber: z.string().min(3, "Enter registration number"),
  collegeEmail: z.string().email("Enter a valid college email").refine((email) => {
    const domain = email.split('@')[1];
    return domain && domain.endsWith('.christuniversity.in');
  }, "Please use your official CHRIST University email (ending with .christuniversity.in)"),
  school: z.string().min(1, "Select your school"),
  department: z.string().min(1, "Enter department shortform"),
  classSection: z.string().min(1, "Enter class and section"),
  educationLevel: z.enum(["UG", "PG", "PHD"], "Select UG, PG or PHD"),
});     

const EventsSchema = z.object({
  events: z
    .array(z.string())
    .min(1, "Select at least one event")
    .refine((events) => {
      const selectedEvents = events
        .map((ev) => AVAILABLE_EVENTS.find((e) => e.name === ev))
        .filter(Boolean) as typeof AVAILABLE_EVENTS;
      const trackCount = selectedEvents.filter(
        (e) => e.category === "track"
      ).length;
      const throwCount = selectedEvents.filter(
        (e) => e.category === "throw"
      ).length;
      const jumpCount = selectedEvents.filter(
        (e) => e.category === "jump"
      ).length;
      if (trackCount > 2) return false;
      if (throwCount > 1) return false;
      if (jumpCount > 1) return false;
      return true;
    }, "Max 2 track events, 1 throw event, 1 jump event per participant"),
  accept: z.boolean().refine((v) => v === true, "You must confirm the details"),
});

const FullSchema = PersonalSchema.merge(CollegeSchema).merge(EventsSchema);

type FormValues = z.infer<typeof FullSchema>;

// Keep school & events data unchanged
const SCHOOLS = [
  { name: "School of Business and Management", short: "SBM" },
  { name: "School of Commerce, Finance and Accountancy", short: "SCFA" },
  { name: "School of Psychological Sciences", short: "SOPS" },
  { name: "School of Sciences", short: "SOS" },
  { name: "School of Social Sciences", short: "SOSS" },
];

const AVAILABLE_EVENTS = [
  { name: "100m", id: "SIDI01", category: "track" },
  { name: "200m", id: "SIDI02", category: "track" },
  { name: "400m", id: "SIDI03", category: "track" },
  { name: "800m", id: "SIDI04", category: "track" },
  { name: "1500m", id: "SIDI05", category: "track" },
  { name: "Shot Put", id: "SIDI07", category: "throw" },
  { name: "Discus Throw", id: "SIDI08", category: "throw" },
  { name: "Javelin Throw", id: "SIDI09", category: "throw" },
  { name: "Long Jump", id: "SIDI010", category: "jump" },
];

// Small visual helper: badge component (local, tiny)
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      {children}
    </span>
  );
}

function SimpleToast({ message, isError = false }: { message: string; isError?: boolean }) {
  return (
    <div className={`fixed right-4 bottom-6 z-50 rounded-md px-4 py-2 text-sm ${isError ? 'bg-red-600 text-white' : 'bg-black/85 text-white'}`}>
      {message}
    </div>
  );
}

export default function IndividualRegister() {
  const router = useRouter();

  const steps = ["Personal", "College", "Events", "Confirm"];
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState<{ message: string; isError: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(FullSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      phone: "",
      registrationNumber: "",
      collegeEmail: "",
      school: "",
      department: "",
      classSection: "",
      educationLevel: "UG",
      events: [],
      accept: false,
    },
  });

  const { register, handleSubmit, watch, trigger, formState } = methods;
  const watched = watch();

  // Helper to count selected categories (for UI hints)
  const countByCategory = (category: string) =>
    (watched.events || [])
      .map((ev: string) => AVAILABLE_EVENTS.find((a) => a.name === ev))
      .filter(Boolean)
      .filter((e: any) => e.category === category).length;

  async function next() {
    let ok = false;
    if (step === 0) ok = await trigger(["fullName", "phone"]);
    if (step === 1)
      ok = await trigger([
        "registrationNumber",
        "collegeEmail",
        "school",
        "department",
        "classSection",
        "educationLevel",
      ]);
    if (step === 2) ok = await trigger(["events", "accept"]);
    if (ok) setStep((s) => Math.min(steps.length - 1, s + 1));
    else setToast({ message: "Please fix validation errors in this step.", isError: true });
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  // onSubmit is intentionally NOT modified in behaviour (frontend-only changes requested)
  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    setToast(null);

    try {
      const clearId = getNewClearId(
        data.fullName,
        data.school,
        data.educationLevel
      );

      let formattedPhone = data.phone;
      if (data.phone.length === 10 && /^[6-9]\d{9}$/.test(data.phone)) {
        formattedPhone = `+91${data.phone}`;
      }

      // Check for existing user by registration number, college email, and phone number
      // Fetch all users with pagination to ensure we get all records
      let allUsers: any[] = [];
      let nextToken: string | null = null;
      do {
        const result: any = await client.graphql({
          query: listUsers,
          variables: { nextToken },
          authMode: "apiKey",
        });
        allUsers = allUsers.concat(result.data.listUsers.items);
        nextToken = result.data.listUsers.nextToken;
      } while (nextToken);

      const existingUsers = allUsers.filter(
        (user) =>
          user.regNumber &&
          user.regNumber.trim() === data.registrationNumber.trim() &&
          user.christGmail &&
          user.christGmail.trim().toLowerCase().split('@')[0] ===
            data.collegeEmail.trim().toLowerCase().split('@')[0] &&
          user.phoneNumber &&
          user.phoneNumber.trim() === formattedPhone.trim()
      );

      let userClearId = clearId;
      if (existingUsers.length > 0) {
        userClearId = existingUsers[0].clearId;
        setToast({ message: "User found, using existing profile.", isError: false });
      } else {
        const createUserResult = await client.graphql({
          query: createUserMutation,
          variables: {
            input: {
              clearId,
              fullName: data.fullName,
              regNumber: data.registrationNumber.trim(),
              christGmail: data.collegeEmail.trim().toLowerCase(),
              phoneNumber: formattedPhone.trim(),
              deptShort: data.department,
              schoolShort: data.school,
              classSection: data.classSection,
              educationLevel: data.educationLevel,
            },
          },
          authMode: "apiKey",
        });
        userClearId = createUserResult.data.createUser.clearId;
      }

      // Fetch existing registrations for the user
      let allRegistrations: any[] = [];
      let regNextToken: string | null = null;
      do {
        const regResult: any = await client.graphql({
          query: listIndividualRegistrations,
          variables: { filter: { playerClearId: { eq: userClearId } }, nextToken: regNextToken },
          authMode: "apiKey",
        });
        allRegistrations = allRegistrations.concat(regResult.data.listIndividualRegistrations.items);
        regNextToken = regResult.data.listIndividualRegistrations.nextToken;
      } while (regNextToken);

      // Count existing events by category
      const existingCounts = { track: 0, throw: 0, jump: 0 };
      allRegistrations.forEach((reg) => {
        const event = AVAILABLE_EVENTS.find((ev) => ev.id === reg.eventId);
        if (event) {
          existingCounts[event.category as keyof typeof existingCounts]++;
        }
      });

      const selectedEvents = data.events
        .map((eventName) =>
          AVAILABLE_EVENTS.find((ev) => ev.name === eventName)
        )
        .filter(Boolean) as typeof AVAILABLE_EVENTS;

      // Calculate new counts
      const newCounts = { ...existingCounts };
      selectedEvents.forEach((ev) => {
        newCounts[ev.category as keyof typeof newCounts]++;
      });

      // Check rules
      const violations: string[] = [];
      if (newCounts.track > 2) {
        violations.push(`more than 2 track events (you have ${existingCounts.track} existing, trying to add ${selectedEvents.filter(e => e.category === 'track').length})`);
      }
      if (newCounts.throw > 1) {
        violations.push(`more than 1 throw event (you have ${existingCounts.throw} existing, trying to add ${selectedEvents.filter(e => e.category === 'throw').length})`);
      }
      if (newCounts.jump > 1) {
        violations.push(`more than 1 jump event (you have ${existingCounts.jump} existing, trying to add ${selectedEvents.filter(e => e.category === 'jump').length})`);
      }

      if (violations.length > 0) {
        const violationMsg = violations.join(', ');
        const itContacts = [
          { name: "Sanda Krishna", phone: "+91 94008 79013" },
          { name: "Ajay Krishna", phone: "+91 88912 23121" },
          { name: "Bhadra", phone: "+91 9539711355" },
          { name: "Naveen", phone: "+91 85479 53668" },
          { name: "Joel", phone: "+91 88384 19895" },
        ];
        const contactsStr = itContacts.map(c => `${c.name} (${c.phone})`).join(', ');
        setToast({ message: `You have violated the event registration rules by attempting to register for ${violationMsg}. You can register for up to 2 track events, 1 throw event, and 1 jump event. Please contact an IT team member: ${contactsStr}. Send a screenshot and message or call them for assistance. We're here to help! - IT Committee✨`, isError: true });
        setSubmitting(false);
        return;
      }

      // Register for events
      for (const ev of selectedEvents) {
        await client.graphql({
          query: createIndividualRegistrationMutation,
          variables: {
            input: {
              eventId: ev.id,
              playerClearId: userClearId,
            },
          },
          authMode: "apiKey",
        });
      }

      setToast({ message: "successful", isError: false });
      setTimeout(() => {
        setToast(null);
        router.push("/");
      }, 1000);

      console.log("Registration data:", {
        ...data,
        clearId: userClearId,
        events: selectedEvents,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMsg =
        error.errors?.[0]?.message ||
        error.message ||
        error.networkError?.message ||
        "Registration failed. Please try again.";
      setToast({ message: errorMsg, isError: true });
    } finally {
      setSubmitting(false);
    }
  }

  // ---------- UI ----------
  return (
    <RegisterLayout
      steps={steps}
      currentStep={step}
      caption="Complete all steps to register."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Individual Registration
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill the form carefully — you can review before submission.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {step + 1} / {steps.length}
            </div>
            <div className="w-48">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-indigo-500 to-blue-400`}
                  style={{
                    width: `${Math.round(((step + 1) / steps.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step content container */}
        <div className="bg-white p-6 rounded-xl shadow-inner">
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Full Name *</FieldLabel>
                  <FieldContent>
                    <Input
                      {...register("fullName")}
                      placeholder="As per college records"
                      className={
                        formState.errors.fullName ? "border-red-400" : ""
                      }
                    />
                    <FieldError>
                      {formState.errors.fullName?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Phone *</FieldLabel>
                  <FieldContent>
                    <Input
                      {...register("phone")}
                      placeholder="10-digit mobile number"
                      className={formState.errors.phone ? "border-red-400" : ""}
                    />
                    <FieldError>
                      {formState.errors.phone?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                {/* Quick tips card */}
                <div className="md:col-span-2 mt-2">
                  <div className="rounded-md bg-indigo-50 p-3 text-sm text-indigo-800">
                    Tip: Use your official college email so the QR ticket is
                    delivered correctly.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Registration Number *</FieldLabel>
                  <FieldContent>
                    <Input
                      {...register("registrationNumber")}
                      placeholder="e.g. 2543140"
                      className={
                        formState.errors.registrationNumber
                          ? "border-red-400"
                          : ""
                      }
                    />
                    <FieldError>
                      {formState.errors.registrationNumber?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>College Email *</FieldLabel>
                  <FieldContent>
                    <Input
                      {...register("collegeEmail")}
                      placeholder="you@christuniversity.in"
                      className={
                        formState.errors.collegeEmail ? "border-red-400" : ""
                      }
                    />
                    <FieldError>
                      {formState.errors.collegeEmail?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>School *</FieldLabel>
                  <FieldContent>
                    <Select
                      onValueChange={(value) =>
                        methods.setValue("school", value, {
                          shouldValidate: true,
                        })
                      }
                      value={watched.school}
                    >
                      <SelectTrigger
                        className={`w-full ${formState.errors.school ? "border-red-400" : ""}`}
                      >
                        <SelectValue placeholder="Select your school" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCHOOLS.map((school) => (
                          <SelectItem key={school.short} value={school.short}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>
                      {formState.errors.school?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Department *</FieldLabel>
                  <FieldContent>
                    <Input
                      {...register("department")}
                      placeholder="Dept shortform (e.g.CS, DOC)"
                      className={
                        formState.errors.department ? "border-red-400" : ""
                      }
                    />
                    <FieldError>
                      {formState.errors.department?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Class & Section *</FieldLabel>
                  <FieldContent>
                    <Input
                      {...register("classSection")}
                      placeholder="e.g. 1 BCA A, 1 BCOM F, 2 MDS B"
                      className={
                        formState.errors.classSection ? "border-red-400" : ""
                      }
                    />
                    <FieldError>
                      {formState.errors.classSection?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Education Level *</FieldLabel>
                  <FieldContent>
                    <Select
                      onValueChange={(value) =>
                        methods.setValue(
                          "educationLevel",
                          value as "UG" | "PG" | "PHD",
                          { shouldValidate: true }
                        )
                      }
                      value={watched.educationLevel}
                    >
                      <SelectTrigger
                        className={`w-full ${formState.errors.educationLevel ? "border-red-400" : ""}`}
                      >
                        <SelectValue placeholder="Select UG or PG" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UG">UG</SelectItem>
                        <SelectItem value="PG">PG</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError>
                      {formState.errors.educationLevel?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <div className="md:col-span-2 mt-2 grid grid-cols-2 gap-3">
                  <Badge>Track selected: {countByCategory("track")}</Badge>
                  <Badge>Throw selected: {countByCategory("throw")}</Badge>
                  <Badge>Jump selected: {countByCategory("jump")}</Badge>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <Field>
                  <FieldLabel className="mb-2">Select Events *</FieldLabel>
                  <FieldContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {AVAILABLE_EVENTS.map((ev) => {
                        const eventName = ev.name;
                        const selected = (watched.events || []).includes(
                          eventName
                        );

                        return (
                          <button
                            type="button"
                            key={eventName}
                            onClick={() => {
                              const current = watched.events || [];
                              const newArr = current.includes(eventName)
                                ? current.filter((x: string) => x !== eventName)
                                : [...current, eventName];
                              methods.setValue("events", newArr, {
                                shouldValidate: true,
                              });
                            }}
                            className={`text-left p-4 rounded-xl border-2 shadow-sm flex flex-col justify-between min-h-[72px] transition-all duration-200 ${selected ? "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-300 text-indigo-900 shadow-md" : "bg-white border-gray-200 text-gray-700 hover:shadow-md"}`}
                            aria-pressed={selected}
                            aria-label={`Toggle event ${eventName}`}
                          >
                            <div>
                              <div className="font-semibold text-sm">
                                {eventName}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 capitalize">
                                {ev.category}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="text-xs text-gray-500">
                                ID:{" "}
                                <span className="font-medium text-gray-700">
                                  {ev.id}
                                </span>
                              </div>
                              {selected && (
                                <div className="text-xs font-medium text-indigo-700">
                                  Selected
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <FieldError>
                      {formState.errors.events?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldContent className="flex items-start gap-3 mt-6 p-4 bg-gray-50 rounded-xl">
                    <Checkbox
                      id="accept"
                      checked={watched.accept}
                      onCheckedChange={(checked) =>
                        methods.setValue("accept", checked as boolean, {
                          shouldValidate: true,
                        })
                      }
                    />
                    <FieldLabel
                      htmlFor="accept"
                      className="text-sm leading-relaxed"
                    >
                      I confirm my details are correct and accept the event
                      rules and terms.
                    </FieldLabel>
                    <FieldError>
                      {formState.errors.accept?.message as any}
                    </FieldError>
                  </FieldContent>
                </Field>

                <div className="mt-3 text-sm text-gray-600">
                  <strong>Remember:</strong> You can choose up to{" "}
                  <strong>2 track</strong> events, <strong>1 throw</strong>{" "}
                  event and <strong>1 jump</strong> event.
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-medium">Review & Confirm</h3>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <strong>Name:</strong> {watched.fullName}
                  </div>
                  <div>
                    <strong>Phone:</strong> {watched.phone}
                  </div>
                  <div>
                    <strong>Reg No:</strong> {watched.registrationNumber}
                  </div>
                  <div>
                    <strong>College Email:</strong> {watched.collegeEmail}
                  </div>
                  <div>
                    <strong>School:</strong> {watched.school} —{" "}
                    {watched.educationLevel}
                  </div>
                  <div>
                    <strong>Department:</strong> {watched.department}
                  </div>
                </div>

                <div>
                  <strong>Events:</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(watched.events || []).map((ev: string) => (
                      <span
                        key={ev}
                        className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-800"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  By submitting, you agree that the details are accurate. An
                  email with your QR ticket will be sent to the college email
                  provided.
                  <p className="mt-4 italic text-sm text-gray-600">
                    <strong>Please avoid clicking the submit button multiple times. Once
                    you submit, you will be redirected to the main webpage. If
                    you are unsure whether your registration was successful,
                    kindly reach out to the IT/Technical Support Team listed
                   — we’re here to help! - IT Committee✨</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t bg-white/50 rounded-b-xl p-4">
          <button
            type="button"
            onClick={back}
            className="px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
            disabled={step === 0}
          >
            Back
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={next}
                className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all flex-1 sm:flex-none"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className={`px-6 py-3 rounded-full ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"} text-white transition-all flex-1 sm:flex-none`}
                disabled={submitting || !formState.isValid}
              >
                {submitting ? (
                  <>
                    <Spinner className="mr-2" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            )}
          </div>
        </div>
      </form>

      {toast && <SimpleToast message={toast.message} isError={toast.isError} />}
    </RegisterLayout>
  );
