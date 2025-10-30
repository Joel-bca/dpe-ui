"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Users, Phone, Mail } from "lucide-react";

export default function ASMPage() {
  const cards = [
    {
      title: "Individual Events",
      desc: "Register for solo track, field, and athletic events.",
      href: "/events/ASM/register/individual",
      icon: <User className="w-8 h-8 text-gray-800" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-900">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/event.jpg')] bg-cover bg-center brightness-[0.55]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-3xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Annual Sports Meet (ASM)
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Be part of Christ University’s biggest celebration of athletic
            excellence and teamwork.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <a href="/ASM 2025-26.pdf" download="ASM 2025-26.pdf" className="bg-gradient-to-r from-gray-800 to-gray-600 text-white hover:opacity-90 px-6 py-2 rounded-xl inline-block">
              Download Rulebook
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== RULES & REGULATIONS ===== */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Rules & Regulations
        </h2>

        <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-8 space-y-5 leading-relaxed">
          <p className="text-gray-800">
            <strong>Important Note:</strong> Once registration is completed, no
            edits will be allowed without approval through the DPE coordinators
            and leads. Please ensure all information is accurate before
            submission.
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              Only <strong>Christ-provided Gmail accounts</strong> are permitted
              for registration. Unauthorized domains will not receive a CLEAR ID.
            </li>
            <li>
              For team events, ensure all teammate names and details are entered
              correctly.
            </li>
            <li>
              All participants (staff & students) must register within the
              scheduled dates.
            </li>
            <li>A Mixed Relay will be conducted for both staff and students.</li>
            <li>
              Proper sports attire and shoes are mandatory for all participants.
            </li>
            <li>
              Each participant can enter a maximum of:
              <ul className="list-inside list-disc ml-6">
                <li>2 Track Events</li>
                <li>1 Field Event (Throw)</li>
                <li>1 Field Event (Jump)</li>
              </ul>
              (Relay excluded)
            </li>
            <li><br>All Teams event will be physical registion near T-Juction.</br></li>
            <li>Only one relay team per School is permitted.</li>
            <li>Mixed relay will be conducted in Kengeri Campus</li>
            <li>
              College ID Cards must be presented during competitions.
            </li>
            <li>
              Best Male & Female Athletes (Staff & Student) will be recognized and rewarded.
            </li>
            <li>
              Breakfast & Lunch will be provided only to athletic officials,
              staff, and volunteers.
            </li>
            <li>Officials’ decisions are final. No appeals will be entertained.</li>
            <li>
              The Organizing Committee reserves the right to make emergency
              decisions if required.
            </li>
            <li>
              Any indiscipline or violation may result in disqualification or
              further action.
            </li>
          </ul>
          <div className="mt-6 text-gray-700">
            <p className="font-semibold">In case of any registration issues:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                If any error message appears during registration, please contact
                the DPE tech team with a screenshot of the error.
              </li>
              <li>
                For CLEAR ID generation issues, note that your ID QR will be
                sent to your registered Christ Gmail ID, if not please contact the DPE IT Team.
              </li>
            </ul>
            <p className="mt-4 italic text-sm text-gray-600">
              Any error during applying is not the responsibility 
              of the Department of Physical Education.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REGISTRATION SECTION ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Register for ASM Events
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden bg-white/60 backdrop-blur-lg shadow-lg rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="bg-gray-200 p-4 rounded-full">{card.icon}</div>
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
                <Link href={card.href}>
                  <Button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white hover:opacity-90 px-6 py-2 rounded-xl">
                    Register Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TECHNICAL SUPPORT SECTION ===== */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Technical Support & Contact 
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-8 space-y-4 text-gray-700">
            <div className="flex justify-center flex-wrap gap-8 text-left">
              {[
                { name: "Sanda Krishna", phone: "+91 94008 79013" },
                { name: "Ajay Krishna", phone: "+91 88912 23121" },
                { name: "Bhadra", phone: "+91 9539711355" },
                { name: "Naveen", phone: "+91 85479 53668" },
                { name: "Joel", phone: "+91 88384 19895" },
              ].map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="hover:text-gray-900 font-medium"
                  >
                    {person.name}: {person.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5" />
              <a
                href="mailto:dpe.byc@christuniversity.in"
                className="text-gray-800 hover:underline"
              >
                dpe.byc@christuniversity.in
              </a>
            </div>
            <i>We’re here to help you with any registration issues!</i>
          </div>
        </div>
      </section>
    </div>
  );
}
