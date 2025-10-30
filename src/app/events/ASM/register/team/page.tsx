"use client";

import React, { useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../../../../../amplify_outputs.json';
import RegisterLayout from "@/app/events/ASM/register/registrationlayout";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getNewClearId } from "@/lib/utils";
import { generateClient } from "aws-amplify/api";
import { listUsers, listIndividualRegistrations, listTeams } from "@/graphql/queries";
import { createUser as createUserMutation, createTeam } from "@/graphql/mutations";

const client = generateClient({ authMode: 'apiKey' });

const TeamMember = z.object({
  name: z.string().min(3, "Member name required"),
  registrationNumber: z.string().min(3, "Reg. number required"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
  school: z.string().min(1, "Select school"),
  department: z.string().min(1, "Enter department shortform"),
  classSection: z.string().optional(),
  educationLevel: z.enum(["UG", "PG", "PHD"], "Select UG, PG or PHD"),
});

const TeamSchema = z.object({
  teamName: z.string().min(3, "Team name is required"),
  event: z.string().min(1, "Select an event"),
  captain: TeamMember,
  members: z.array(TeamMember).min(1, "Add at least one member").max(20),
  accept: z.boolean().refine(Boolean, "You must accept"),
});

type TeamForm = z.infer<typeof TeamSchema>;

// School mappings
const SCHOOLS = [
  { name: "School of Business and Management", short: "SBM" },
  { name: "School of Commerce, Finance and Accountancy", short: "SCFA" },
  { name: "School of Psychological Sciences", short: "SOPS" },
  { name: "School of Sciences", short: "SOS" },
  { name: "School of Social Sciences", short: "SOSS" },
];

// Event mappings for team events
const TEAM_EVENTS_MAP = [
  { name: "Football", id: "SIDT01" },
  { name: "Basketball", id: "SIDT02" },
  { name: "Volleyball", id: "SIDT03" },
  { name: "Kabaddi", id: "SIDT04" },
  { name: "Badminton", id: "SIDT05" },
  { name: "Table Tennis", id: "SIDT06" },
  { name: "Chess", id: "SIDT07" },
  { name: "Beach Volleyball", id: "SIDT08" },
  { name: "Throwball", id: "SIDT09" },
  { name: "Mix relay", id: "SIDT10" },
];

function SimpleToast({ message }: { message: string }) {
  return (
    <div
      className="fixed right-5 bottom-6 z-50 rounded-md bg-gray-900 text-white px-4 py-2 text-sm shadow-lg"
      role="status"
    >
      {message}
    </div>
  );
}

export default function TeamRegister() {
  useEffect(() => {
    Amplify.configure(amplifyconfig);
  }, []);

  const steps = ["Team", "Captain", "Players", "Confirm"];
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, control, handleSubmit, watch, trigger, formState, setError, setValue } = useForm<TeamForm>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      teamName: "",
      event: "",
      captain: { name: "", registrationNumber: "", email: "", phone: "", school: "", department: "", educationLevel: "UG" },
      members: [{ name: "", registrationNumber: "", email: "", phone: "", school: "", department: "", educationLevel: "UG" }],
      accept: false,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "members" });
  const watched = watch();

  useEffect(() => {
    if (fields.length === 0) append({ name: "", registrationNumber: "", email: "", phone: "", school: "", department: "", educationLevel: "UG" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function next() {
    let ok = false;
    if (step === 0) ok = await trigger(["teamName", "event"]);
    if (step === 1) ok = await trigger(["captain.name", "captain.registrationNumber", "captain.email", "captain.phone", "captain.school", "captain.department"]);
    if (step === 2) {
      ok = true;
      for (let i = 0; i < fields.length; i++) {
        const fieldOk = await trigger([`members.${i}.name`, `members.${i}.registrationNumber`, `members.${i}.email`, `members.${i}.phone`, `members.${i}.school`, `members.${i}.department`]);
        if (!fieldOk) {
          ok = false;
          break;
        }
      }
    }
    if (ok) {
      setToast(null);
      setStep((s) => Math.min(steps.length - 1, s + 1));
    } else {
      setToast("Please fix errors in this step.");
      window.setTimeout(() => setToast(null), 3000);
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(data: TeamForm) {
    setSubmitting(true);
    setToast(null);

    try {
      // Real backend integration - preserved as-is
      const eventMap = TEAM_EVENTS_MAP.find(e => e.name === data.event);
      if (!eventMap) throw new Error("Invalid event selected");

      // Check if team name already exists for this event
      const existingTeamResult = await client.graphql({
        query: listTeams,
        variables: { filter: { eventId: { eq: eventMap.id } } },
        authMode: 'apiKey'
      });

      const teamExists = existingTeamResult?.data?.listTeams?.items?.some(team => team.teamName === data.teamName);
      if (teamExists) {
        throw new Error("Team name already exists for this event. Please choose a different team name.");
      }

      // Format captain phone to E.164 for AWSPhone
      let captainFormattedPhone = data.captain.phone.trim();
      if (captainFormattedPhone.length === 10 && /^[6-9]\d{9}$/.test(captainFormattedPhone)) {
        captainFormattedPhone = `+91${captainFormattedPhone}`;
      }

      // Check/create captain
      const existingCaptainResult = await client.graphql({
        query: listUsers,
        variables: { filter: { regNumber: { eq: data.captain.registrationNumber } } },
        authMode: 'apiKey'
      });

      let captainId;
      let captainIsExisting = false;
      if (existingCaptainResult?.data?.listUsers?.items?.length > 0) {
        captainId = existingCaptainResult.data.listUsers.items[0].clearId;
        captainIsExisting = true;
        // Check if captain is already registered for this event (individual or team)
        const captainIndividualRegs = await client.graphql({
          query: listIndividualRegistrations,
          variables: { filter: { playerClearId: { eq: captainId }, eventId: { eq: eventMap.id } } },
          authMode: 'apiKey'
        });
        const captainTeamRegs = await client.graphql({
          query: listTeams,
          variables: { filter: { captainClearId: { eq: captainId }, eventId: { eq: eventMap.id } } },
          authMode: 'apiKey'
        });
        if (captainIndividualRegs?.data?.listIndividualRegistrations?.items?.length > 0 ||
            captainTeamRegs?.data?.listTeams?.items?.length > 0) {
          throw new Error(`Captain ${data.captain.name} is already registered for this event.`);
        }
      } else {
        const captainClearId = getNewClearId(data.captain.name, data.captain.school, data.captain.educationLevel);
        const createCaptainResult = await client.graphql({
          query: createUserMutation,
          variables: {
            input: {
              clearId: captainClearId,
              fullName: data.captain.name,
              regNumber: data.captain.registrationNumber,
              christGmail: data.captain.email,
              phoneNumber: captainFormattedPhone,
              deptShort: data.captain.department,
              schoolShort: data.captain.school,
              classSection: data.captain.classSection || "",
              educationLevel: data.captain.educationLevel,
            }
          },
          authMode: 'apiKey'
        });
        captainId = createCaptainResult.data.createUser.clearId;
      }

      // Create members
      const memberClearIds: string[] = [];
      const memberIsExisting: boolean[] = [];
      for (const member of data.members) {
        const memberClearId = getNewClearId(member.name, member.school, member.educationLevel);
        const existingMemberResult = await client.graphql({
          query: listUsers,
          variables: { filter: { regNumber: { eq: member.registrationNumber } } },
          authMode: 'apiKey'
        });

        let memberId = memberClearId;
        let isExisting = false;
        if (existingMemberResult?.data?.listUsers?.items?.length > 0) {
          memberId = existingMemberResult.data.listUsers.items[0].clearId;
          isExisting = true;
          // Check if member is already registered for this event
          const memberIndividualRegs = await client.graphql({
            query: listIndividualRegistrations,
            variables: { filter: { playerClearId: { eq: memberId }, eventId: { eq: eventMap.id } } },
            authMode: 'apiKey'
          });
          const memberTeamRegs = await client.graphql({
            query: listTeams,
            variables: { filter: { teamMemberClearIds: { contains: memberId }, eventId: { eq: eventMap.id } } },
            authMode: 'apiKey'
          });
          if (memberIndividualRegs?.data?.listIndividualRegistrations?.items?.length > 0 ||
              memberTeamRegs?.data?.listTeams?.items?.length > 0) {
            throw new Error(`Player ${member.name} is already registered for this event.`);
          }
        } else {
          // Format member phone to E.164 for AWSPhone
          let memberFormattedPhone = member.phone.trim();
          if (memberFormattedPhone.length === 10 && /^[6-9]\d{9}$/.test(memberFormattedPhone)) {
            memberFormattedPhone = `+91${memberFormattedPhone}`;
          }

          const createMemberResult = await client.graphql({
            query: createUserMutation,
            variables: {
              input: {
                clearId: memberClearId,
                fullName: member.name,
                regNumber: member.registrationNumber,
                christGmail: member.email,
                phoneNumber: memberFormattedPhone,
                deptShort: member.department,
                schoolShort: member.school,
                classSection: member.classSection || "",
                educationLevel: member.educationLevel,
              }
            },
            authMode: 'apiKey'
          });
          memberId = createMemberResult.data.createUser.clearId;
        }
        memberClearIds.push(memberId);
        memberIsExisting.push(isExisting);
      }

      // Create team
      await client.graphql({
        query: createTeam,
        variables: {
          input: {
            teamName: data.teamName,
            eventId: eventMap.id,
            captainClearId: captainId,
            teamMemberClearIds: memberClearIds,
          }
        }
      });

      // Send emails to all team members
      const recipients = [];

      // Captain
      recipients.push({
        clearId: captainId,
        email: data.captain.email,
        fullName: data.captain.name,
        isExisting: captainIsExisting,
      });

      // Members
      for (let i = 0; i < data.members.length; i++) {
        const member = data.members[i];
        const memberId = memberClearIds[i];
        const isExistingMember = memberIsExisting[i];

        recipients.push({
          clearId: memberId,
          email: member.email,
          fullName: member.name,
          isExisting: isExistingMember,
        });
      }

      try {
        const emailResponse = await fetch('/api/send-registration-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipients,
            captainName: data.captain.name,
            eventName: data.event,
          }),
        });

        const emailResult = await emailResponse.json();
        if (emailResponse.ok && emailResult.success) {
          setToast(`Team registered successfully! Emails sent to all members.`);
        } else {
          console.error('Failed to send emails:', emailResult);
          setToast(`Team registered successfully! (Note: Email delivery delayed — you’ll receive your CLEAR ID within 24 hours.)`);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        setToast(`Team registered successfully! (Note: Email delivery delayed — you’ll receive your CLEAR ID within 24 hours.)`);
      }

      console.log("Team data:", { teamName: data.teamName, eventId: eventMap.id, captainId, memberIds: memberClearIds });
    } catch (error: any) {
      console.error("Team registration error:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
        errors: error.errors,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors
      });
      const errorMsg = error.errors?.[0]?.message || error.message || error.networkError?.message || "Team registration failed. Please try again.";
      setToast(errorMsg);
      window.setTimeout(() => setToast(null), 6000);
    } finally {
      setSubmitting(false);
    }
  }

  // -- Style tokens used in this file:
  // cardBg = white, pageBg = gray-50, border = gray-200, text = gray-800, muted = gray-500, primary = gray-900

  return (
    <RegisterLayout steps={steps} currentStep={step} caption="Register your team. Team name must be unique.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Team Registration</h2>
            <p className="text-sm text-gray-500 mt-1">Professional registration — quick and secure</p>
          </div>
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{step + 1} / {steps.length}</div>
        </div>

        {/* Step box */}
        <div className="space-y-4">
          {/* Step 0 - Team */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="text-sm text-gray-700">Team Name *</FieldLabel>
                  <FieldContent>
                    <Input {...register("teamName")} placeholder="Enter unique team name" className={`w-full rounded-md border ${formState.errors.teamName ? "border-red-400" : "border-gray-300"}`} />
                    <FieldError>{formState.errors.teamName?.message as any}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-gray-700">Event *</FieldLabel>
                  <FieldContent>
                    <Select onValueChange={(value) => { setValue("event", value, { shouldValidate: true }); }} value={watched.event}>
                      <SelectTrigger className={`w-full rounded-md border ${formState.errors.event ? "border-red-400" : "border-gray-300"}`}>
                        <SelectValue placeholder="Choose an event" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAM_EVENTS_MAP.map((ev) => (
                          <SelectItem key={ev.name} value={ev.name}>{ev.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>{formState.errors.event?.message as any}</FieldError>
                  </FieldContent>
                </Field>
              </div>
            </motion.div>
          )}

          {/* Step 1 - Captain */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="font-semibold text-lg text-gray-800 mb-4">Captain Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="text-sm text-gray-700">Captain Name *</FieldLabel>
                  <FieldContent>
                    <Input {...register("captain.name")} placeholder="Captain name" className={formState.errors.captain?.name ? "border-red-400" : "border-gray-300"} />
                    <FieldError>{formState.errors.captain?.name?.message as any}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-gray-700">Captain Reg. Number *</FieldLabel>
                  <FieldContent>
                    <Input {...register("captain.registrationNumber")} placeholder="Captain reg. number" className={formState.errors.captain?.registrationNumber ? "border-red-400" : "border-gray-300"} />
                    <FieldError>{formState.errors.captain?.registrationNumber?.message as any}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-gray-700">Captain Email *</FieldLabel>
                  <FieldContent>
                    <Input {...register("captain.email")} placeholder="Captain email" className={formState.errors.captain?.email ? "border-red-400" : "border-gray-300"} />
                    <FieldError>{formState.errors.captain?.email?.message as any}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-gray-700">Captain Phone *</FieldLabel>
                  <FieldContent>
                    <Input {...register("captain.phone")} placeholder="Captain phone" className={formState.errors.captain?.phone ? "border-red-400" : "border-gray-300"} />
                    <FieldError>{formState.errors.captain?.phone?.message as any}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-gray-700">Captain School *</FieldLabel>
                  <FieldContent>
                    <Select onValueChange={(value) => setValue("captain.school", value, { shouldValidate: true })} value={watched.captain.school}>
                      <SelectTrigger className={`w-full rounded-md border ${formState.errors.captain?.school ? "border-red-400" : "border-gray-300"}`}>
                        <SelectValue placeholder="Choose school" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCHOOLS.map((school) => (
                          <SelectItem key={school.short} value={school.short}>{school.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>{formState.errors.captain?.school?.message as any}</FieldError>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm text-gray-700">Captain Department *</FieldLabel>
                  <FieldContent>
                    <Input {...register("captain.department")} placeholder="Department shortform" className={formState.errors.captain?.department ? "border-red-400" : "border-gray-300"} />
                    <FieldError>{formState.errors.captain?.department?.message as any}</FieldError>
                  </FieldContent>
                </Field>
              </div>
            </motion.div>
          )}

          {/* Step 2 - Players */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Team Players</h4>

              <div className="space-y-4">
                {fields.map((f, i) => (
                  <div key={f.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-800">Player {i + 1}</div>
                      <button type="button" onClick={() => remove(i)} className="text-sm text-red-600 hover:text-red-800 transition-colors px-2 py-1 rounded">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field>
                        <FieldLabel className="text-sm text-gray-700">Player Name *</FieldLabel>
                        <FieldContent>
                          <Input {...register(`members.${i}.name` as const)} placeholder="Full name" className={formState.errors.members?.[i]?.name ? "border-red-400" : "border-gray-300"} />
                          <FieldError>{formState.errors.members?.[i]?.name?.message as any}</FieldError>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel className="text-sm text-gray-700">Player Reg. Number *</FieldLabel>
                        <FieldContent>
                          <Input {...register(`members.${i}.registrationNumber` as const)} placeholder="Reg. number" className={formState.errors.members?.[i]?.registrationNumber ? "border-red-400" : "border-gray-300"} />
                          <FieldError>{formState.errors.members?.[i]?.registrationNumber?.message as any}</FieldError>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel className="text-sm text-gray-700">Player Email *</FieldLabel>
                        <FieldContent>
                          <Input {...register(`members.${i}.email` as const)} placeholder="Email" className={formState.errors.members?.[i]?.email ? "border-red-400" : "border-gray-300"} />
                          <FieldError>{formState.errors.members?.[i]?.email?.message as any}</FieldError>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel className="text-sm text-gray-700">Player Phone *</FieldLabel>
                        <FieldContent>
                          <Input {...register(`members.${i}.phone` as const)} placeholder="Phone" className={formState.errors.members?.[i]?.phone ? "border-red-400" : "border-gray-300"} />
                          <FieldError>{formState.errors.members?.[i]?.phone?.message as any}</FieldError>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel className="text-sm text-gray-700">Player School *</FieldLabel>
                        <FieldContent>
                          <Select onValueChange={(value) => setValue(`members.${i}.school` as const, value, { shouldValidate: true })} value={watched.members?.[i]?.school}>
                            <SelectTrigger className={`w-full rounded-md border ${formState.errors.members?.[i]?.school ? "border-red-400" : "border-gray-300"}`}>
                              <SelectValue placeholder="Choose school" />
                            </SelectTrigger>
                            <SelectContent>
                              {SCHOOLS.map((school) => (
                                <SelectItem key={school.short} value={school.short}>{school.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldError>{formState.errors.members?.[i]?.school?.message as any}</FieldError>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel className="text-sm text-gray-700">Player Department *</FieldLabel>
                        <FieldContent>
                          <Input {...register(`members.${i}.department` as const)} placeholder="Department shortform" className={formState.errors.members?.[i]?.department ? "border-red-400" : "border-gray-300"} />
                          <FieldError>{formState.errors.members?.[i]?.department?.message as any}</FieldError>
                        </FieldContent>
                      </Field>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => append({ name: "", registrationNumber: "", email: "", phone: "", school: "", department: "", educationLevel: "UG" })}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
                  >
                    + Add Player
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 - Confirm */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Confirm Team</h4>
              <div className="text-sm text-gray-700 space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div><strong>Team:</strong> <span className="text-gray-800 ml-2">{watched.teamName}</span></div>
                <div><strong>Event:</strong> <span className="text-gray-800 ml-2">{watched.event}</span></div>
                <div><strong>Captain:</strong> <span className="text-gray-800 ml-2">{watched.captain.name} ({watched.captain.registrationNumber})</span></div>
                <div><strong>Players:</strong> <span className="text-gray-800 ml-2">{watched.members?.length || 0}</span></div>
              </div>

              <Field>
                <FieldContent className="flex items-start gap-3 mt-6 p-4 bg-white rounded-lg border border-gray-100">
                  <Checkbox id="accept" checked={watched.accept} onCheckedChange={(checked) => setValue("accept", checked as boolean, { shouldValidate: true })} />
                  <FieldLabel htmlFor="accept" className="text-sm leading-relaxed text-gray-700">I confirm these details are correct and accept the event rules and terms.</FieldLabel>
                  <FieldError>{formState.errors.accept?.message as any}</FieldError>
                </FieldContent>
              </Field>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 bg-white/0">
          <button
            type="button"
            onClick={back}
            className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            disabled={step === 0}
          >
            Back
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {step < steps.length - 1 ? (
              <Button type="button" onClick={next} className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition w-full sm:w-auto">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className={`px-4 py-2 rounded-full ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600"} text-white transition w-full sm:w-auto`}
                disabled={submitting || !formState.isValid}
              >
                {submitting ? (
                  <>
                    <Spinner className="mr-2" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Team"
                )}
              </Button>
            )}
          </div>
        </div>
      </form>

      {toast && <SimpleToast message={toast} />}
    </RegisterLayout>
  );
}
