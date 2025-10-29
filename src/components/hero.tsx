"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

// ======= HERO SECTION COMPONENT =======
export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center brightness-[0.55]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      {/* Text Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Department of Physical Education | BYC
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Empowering athletes, shaping champions, and building a community of
          excellence.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          {/* Using your custom HoverBorderGradient button */}

          <a href="/committee">
          <HoverBorderGradient className="text-white text-lg font-medium">
           Join Committee
          </HoverBorderGradient>
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </section>
  );
};
