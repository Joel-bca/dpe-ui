"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HomeCommitteePreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/Joel-bca/dpe_assests_RR/6e0374695fd4d95093047e556f94710d41e7b2ef/hero-bg.jpg')",
            backgroundPosition: "center",
          }}
        />

        {/* Blue-tinted Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-900/60 to-slate-900/50" />

        {/* Additional subtle gradient for text area protection */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="w-full h-full flex flex-col md:flex-row">
          {/* Left Side - Visual Area (Desktop only) */}
          <div className="hidden md:flex md:w-2/5 h-full items-center justify-center" />

          {/* Right Side - Content Area */}
          <div className="w-full md:w-3/5 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col space-y-6 max-w-lg"
            >
              {/* Heading */}
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                Meet the Team Behind the Events
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-gray-100 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Discover the passionate student leaders driving impactful events
                and building a vibrant, community-driven athletic culture.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Link href="/committee">
                  <Button
                    variant="default"
                    size="lg"
                    className="group bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Meet the Team</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
