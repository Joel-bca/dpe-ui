"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { AboutSection } from "@/components/aboutsection";
import { Info } from "lucide-react";

export default function CommitteePage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const handleRegister = (committeeName: string) => {
    setSelectedCommittee(committeeName);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white min-h-screen relative">
      {/* ===== HERO SECTION ===== */}
      <section className="relative flex flex-col items-center justify-center h-[90vh] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/department.jpg')] bg-cover bg-center opacity-05"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80"></div>

        <motion.div
          className="relative z-10 px-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Our Committees
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            The heart of the Department of Physical Education — driven by passion,
            teamwork, and leadership.
          </p>
        </motion.div>
      </section>

      <AboutSection />
      </div>
  );
}
