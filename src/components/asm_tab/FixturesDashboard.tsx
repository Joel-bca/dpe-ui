"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

export function FixturesDashboard() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8faff] via-[#eef2ff] to-[#f7f9ff] text-gray-900">
      {/* ===== FIXTURES ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
          Event Fixtures
        </h2>

        {/* Placeholder until data is added */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Fixtures will be updated soon!
            </h3>
            <p className="text-gray-500">
              Please check back later for the latest schedule and event details.
            </p>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
