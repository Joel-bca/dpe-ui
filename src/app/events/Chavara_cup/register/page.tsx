"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterLayout from "@/app/events/Chavara_cup/chavaralayout"; // Using your existing layout
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
import { v4 as uuidv4 } from 'uuid';

// --- 1. CONFIGURATION ---

const SPORT_NAME = "Beach Volleyball";
const CATEGORIES = ["Men", "Women", "Mixed"];

// --- 2. VALIDATION SCHEMA ---

const TeammateSchema = z.object({
  name: z.string().min(3, "Full Name is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Valid Date of Birth is required" }),
  collegeId: z.string().min(2, "ID/Reg No. is required"), 
});

const TeamSchema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  collegeName: z.string().min(3, "College name is required"),
  category: z.enum(["Men", "Women", "Mixed"]).pipe(z.literal("Men").or(z.literal("Women")).or(z.literal("Mixed"))).catch("Men"),
  
  captain: z.object({
    name: z.string().min(3, "Captain's name is required"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit mobile number required"),
    email: z.string().email("Valid email required"),
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Valid DOB is required" }),
    collegeId: z.string().min(2, "ID/Reg No. is required"),
  }),

  // Beach Volleyball Rule: Min 1 partner (Total 2), Max 2 partners (Total 3)
  members: z.array(TeammateSchema)
    .min(1, "Beach Volleyball requires at least 1 partner")
    .max(2, "Max 2 partners allowed (1 substitute)"), 
  
  accept: z.boolean().refine((val) => val === true, "You must accept the rules"),
});

type TeamForm = z.infer<typeof TeamSchema>;

// --- 3. COMPONENT ---

export default function TeamRegister() {
  const router = useRouter();
  const steps = ["Team Info", "Captain", "Squad", "Confirm"];
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [registrationAttempted, setRegistrationAttempted] = useState(false);

  const { register, control, handleSubmit, watch, trigger, formState, setValue } = useForm<TeamForm>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      teamName: "",
      collegeName: "",
      category: "Men",
      captain: { name: "", phone: "", email: "", dob: "", collegeId: "" },
      members: [{ name: "", dob: "", collegeId: "" }], // Start with 1 empty slot
      accept: false,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "members" });
  const watched = watch();

  // --- LOGIC ---

  function generateDedupKey(sport: string, phone: string) {
    // Unique ID = BEACH VOLLEYBALL#9876543210
    return `${sport.toUpperCase()}#${phone.trim()}`;
  }

  async function next() {
    let isValid = false;
    if (step === 0) isValid = await trigger(["teamName", "collegeName", "category"]);
    if (step === 1) isValid = await trigger("captain");
    if (step === 2) isValid = await trigger("members");

    if (isValid) {
      setToast(null);
      setStep((s) => Math.min(steps.length - 1, s + 1));
    } else {
      setToast({ msg: "Please fill all required fields correctly.", type: "error" });
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit(data: TeamForm) {
    // Prevent multiple submissions
    if (submitting || registrationAttempted) {
      setToast({ msg: "Registration is already in progress. Please wait...", type: "error" });
      return;
    }

    setSubmitting(true);
    setRegistrationAttempted(true);
    setToast(null);

    try {
      // 1. Generate Unique Key
      const dedupKey = generateDedupKey(SPORT_NAME, data.captain.phone);

      // 2. Prepare Payload
      const payload = {
        TeamID: uuidv4(),
        TeamName: data.teamName,
        CollegeName: data.collegeName,
        SportCategory: SPORT_NAME,
        Category: data.category, // Men/Women/Mixed
        
        // Captain Data
        CaptainName: data.captain.name,
        CaptainPhone: data.captain.phone,
        CaptainEmail: data.captain.email,
        CaptainDOB: data.captain.dob,
        CaptainID: data.captain.collegeId, // College ID / Reg No
        
        // Squad Data (Stored as stringified JSON for simplicity in NoSQL)
        Teammates: JSON.stringify(data.members),
        
        // Safety Keys for Duplicate Prevention
        DedupKey: dedupKey,
        RegistrationDate: new Date().toISOString(),
      };

      // 3. Save to DynamoDB via API route
      const response = await fetch("/api/chavara-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle duplicate entry error specifically
        if (response.status === 409 || result.message?.includes("already registered")) {
          throw new Error("This team (phone number) has already been registered. Please use a different captain phone number.");
        }
        throw new Error(result.message || "Registration failed. Please try again.");
      }

      setToast({ msg: "✓ Team Registered Successfully! Redirecting to home...", type: "success" });
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);

    } catch (error: any) {
      console.error("Registration Error:", error);
      setToast({ msg: error.message || "Submission failed. Please try again.", type: "error" });
      // Allow user to retry if there's an error
      setRegistrationAttempted(false);
      setSubmitting(false);
    }
  }

  // --- UI RENDER ---

  return (
    <RegisterLayout steps={steps} currentStep={step} caption="Inter-Collegiate Beach Volleyball Registration">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Chavara Cupeam Entry</h2>
            <p className="text-sm text-gray-500">Beach Volleyball ({watched.category})</p>
          </div>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Step {step + 1}/4</span>
        </div>

        {/* STEP 0: TEAM INFO */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <Field>
              <FieldLabel>Team Name *</FieldLabel>
              <FieldContent>
                <Input {...register("teamName")} placeholder="e.g. Spikers A" />
                <FieldError>{formState.errors.teamName?.message}</FieldError>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>College Name *</FieldLabel>
              <FieldContent>
                <Input {...register("collegeName")} placeholder="Full College Name" />
                <FieldError>{formState.errors.collegeName?.message}</FieldError>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Category *</FieldLabel>
              <FieldContent>
                <Select onValueChange={(val) => setValue("category", val as any, { shouldValidate: true })} value={watched.category}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FieldError>{formState.errors.category?.message}</FieldError>
              </FieldContent>
            </Field>
          </motion.div>
        )}

        {/* STEP 1: CAPTAIN */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Captain's Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Full Name *</FieldLabel>
                <FieldContent>
                  <Input {...register("captain.name")} placeholder="Name as on ID Card" />
                  <FieldError>{formState.errors.captain?.name?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Date of Birth *</FieldLabel>
                <FieldContent>
                  <Input type="date" {...register("captain.dob")} />
                  <FieldError>{formState.errors.captain?.dob?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>College ID / Reg No *</FieldLabel>
                <FieldContent>
                  <Input {...register("captain.collegeId")} placeholder="Roll No / Reg No" />
                  <FieldError>{formState.errors.captain?.collegeId?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Phone Number *</FieldLabel>
                <FieldContent>
                  <Input {...register("captain.phone")} placeholder="9876543210" />
                  <FieldError>{formState.errors.captain?.phone?.message}</FieldError>
                </FieldContent>
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel>Email Address *</FieldLabel>
                <FieldContent>
                  <Input {...register("captain.email")} placeholder="For ticket delivery" />
                  <FieldError>{formState.errors.captain?.email?.message}</FieldError>
                </FieldContent>
              </Field>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SQUAD */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
             <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-semibold text-gray-700">Teammates</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Total: {fields.length + 1} Players (Max 3)</span>
             </div>

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">Player {index + 2}</div>
                {index > 0 && (
                   <button type="button" onClick={() => remove(index)} className="absolute top-2 right-16 text-red-500 text-xs hover:underline">Remove</button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Full Name *</label>
                    <Input {...register(`members.${index}.name`)} placeholder="Name" />
                    <p className="text-xs text-red-500">{formState.errors.members?.[index]?.name?.message}</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Date of Birth *</label>
                    <Input type="date" {...register(`members.${index}.dob`)} />
                    <p className="text-xs text-red-500">{formState.errors.members?.[index]?.dob?.message}</p>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-gray-600">College ID / Reg No *</label>
                    <Input {...register(`members.${index}.collegeId`)} placeholder="ID used for verification" />
                    <p className="text-xs text-red-500">{formState.errors.members?.[index]?.collegeId?.message}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {fields.length < 2 ? (
                <Button type="button" variant="outline" onClick={() => append({ name: "", dob: "", collegeId: "" })} className="w-full border-dashed border-2 text-gray-600">
                + Add Substitute Player (Optional)
                </Button>
            ) : (
                <div className="text-center text-xs text-amber-600 py-2 bg-amber-50 rounded">
                    Maximum squad size reached (3 players).
                </div>
            )}
            
            <p className="text-xs text-red-500 text-center mt-2">{formState.errors.members?.message}</p>
          </motion.div>
        )}

        {/* STEP 3: CONFIRM */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="font-semibold text-gray-800">Review & Confirm</h3>
            
            <div className="bg-gray-50 p-5 rounded-lg text-sm text-gray-700 space-y-3 border border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Team:</strong> {watched.teamName}</p>
                <p><strong>College:</strong> {watched.collegeName}</p>
                <p><strong>Captain:</strong> {watched.captain.name}</p>
                <p><strong>Category:</strong> {watched.category}</p>
                <p><strong>Phone:</strong> {watched.captain.phone}</p>
                <p><strong>Total Players:</strong> {watched.members.length + 1}</p>
              </div>
            </div>

            <Field>
              <FieldContent className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg">
                <Checkbox id="accept" checked={watched.accept} onCheckedChange={(c) => setValue("accept", c as boolean, { shouldValidate: true })} />
                <label htmlFor="accept" className="text-sm text-gray-600 leading-tight pt-0.5">
                  I confirm that all provided details (Names, DOBs, IDs) match our physical College ID cards. We understand IDs will be verified at the venue.
                </label>
              </FieldContent>
              <FieldError>{formState.errors.accept?.message}</FieldError>
            </Field>
          </motion.div>
        )}

        {/* FOOTER */}
        <div className="flex justify-between pt-6 border-t border-gray-100">
          <Button type="button" variant="ghost" onClick={back} disabled={step === 0 || submitting || registrationAttempted}>Back</Button>
          
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next} disabled={submitting || registrationAttempted}>Next Step</Button>
          ) : (
            <Button 
              type="submit" 
              disabled={submitting || !watched.accept || registrationAttempted} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? <><Spinner className="mr-2" /> Registering...</> : registrationAttempted ? "Registration Complete" : "Submit Registration"}
            </Button>
          )}
        </div>

        {/* TOAST NOTIFICATION */}
        {toast && (
          <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl text-white font-medium z-50 animate-in slide-in-from-bottom-5 ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
            {toast.msg}
          </div>
        )}
      </form>
    </RegisterLayout>
  );
}