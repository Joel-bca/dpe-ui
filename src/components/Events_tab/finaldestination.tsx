"use client";
import { motion } from "framer-motion";
import React from "react";

export const Finaldestination: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0a1a3f] to-[#102a66] text-white text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-6"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl font-semibold tracking-wide"
        >
          Annual Sports Meet 2025
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-lg md:text-xl font-light text-gray-200"
        >
          Registration is now closed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="h-0.5 w-32 bg-white/40 mx-auto rounded-full"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 text-sm text-gray-400"
      >
        Thank you for your enthusiasm — see you at the event!
      </motion.p>
    </div>
  );
};
