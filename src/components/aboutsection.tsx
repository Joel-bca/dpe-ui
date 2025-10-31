"use client";

import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <>
      {/* ===== ABOUT DPE SECTION ===== */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-black px-6 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-purple-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-[90%] md:w-[95%] lg:w-[90%] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://dpe-byc-assets.s3.eu-north-1.amazonaws.com/campus.jpg"
                alt="Christ University BYC Campus"
                width={600}
                height={400}
                className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6 md:pl-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Department of Physical Education | BYC Campus
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              The Department of Physical Education at Christ University BYC Campus fosters
              holistic development through excellence in sports and physical well-being.
              Our department has nurtured numerous athletes who have represented the
              University and beyond, promoting teamwork, discipline, and fitness for life.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-md leading-relaxed">
              With a state-of-the-art sports complex and a culture rooted in passion,
              leadership, and perseverance, we empower students to balance academics
              and athletics — shaping champions on and off the field.
            </p>

            <HoverBorderGradient as={Link} href="#about-committees">
              <span className="text-white font-medium text-lg">Learn More</span>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT COMMITTEES ===== */}
      <section
        id="about-committees"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-black px-6 py-16"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-transparent to-blue-400/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-[90%] md:w-[95%] lg:w-[90%] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://dpe-byc-assets.s3.eu-north-1.amazonaws.com/department.jpg"
                alt="DPE Committees"
                width={600}
                height={400}
                className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6 md:pl-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              About Our Committees
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              The Department of Physical Education houses five dedicated committees that
              ensure every event runs seamlessly — IT & Records, Media, Logistics,
              Medical, and Public Relations. Each team collaborates to plan, organize,
              and execute sporting events with precision and passion.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-md leading-relaxed">
              From digital operations to medical preparedness, our committees form the
              foundation of DPE’s excellence — blending leadership, innovation, and
              teamwork in every endeavor.
            </p>

            <HoverBorderGradient as="a" href="/committee">
              <span className="text-white font-medium text-lg">Learn More</span>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT EVENTS ===== */}
      <section
        id="about-events"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-black px-6 py-16"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-cyan-400/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-[90%] md:w-[95%] lg:w-[90%] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://dpe-byc-assets.s3.eu-north-1.amazonaws.com/event.jpg"
                alt="DPE Events"
                width={600}
                height={400}
                className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6 md:pl-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Events We Host
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              From intercollegiate tournaments to university-level championships,
              the Department of Physical Education at Christ University BYC Campus
              proudly organizes diverse sports and fitness events throughout the year.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-md leading-relaxed">
              Each event embodies our mission to nurture teamwork, discipline, and
              athletic excellence — uniting athletes across the campus and beyond.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
