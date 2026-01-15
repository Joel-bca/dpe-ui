// app/contact_terms.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactTermsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const currentYear = new Date().getFullYear();
  const organizationName = "Department of Physical Education";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 1. Hero / Header */}
          <motion.header variants={itemVariants} className="mb-16 md:mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have questions about our events or need to reach out? Get in touch
              with us below. This page also provides information about our
              website and organization.
            </p>
          </motion.header>

          {/* 2. Contact Section (PRIMARY) */}
          <motion.section variants={itemVariants} className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Get in Touch
            </h2>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Email Card */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                </div>
                <p className="text-gray-300 break-all">
                  <a
                    href="mailto:dpe@institution.edu"
                    className="hover:text-blue-400 transition-colors"
                  >
                    dpe.byc@christuniversity.in
                  </a>
                </p>
              </motion.div>

            </div>

            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/sportsbyc",
                  },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/department-of-physical-education-christ-university/",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-gray-300 hover:text-blue-400 hover:border-blue-500 transition-all"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.section>

          {/* 3. Section Divider */}
          <motion.div
            variants={itemVariants}
            className="my-16 md:my-20 border-t border-slate-700"
          />

          {/* 4. Website Ownership / Propriety Section */}
          <motion.section variants={itemVariants} className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              About This Website
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                This website is developed and maintained by the organizing
                committee of the <strong>{organizationName}</strong>. It serves
                as the official platform for sharing event announcements,
                providing essential information, and facilitating registrations
                for our community-driven athletic programs and initiatives.
              </p>

              <p className="text-lg">
                The site is designed exclusively for official event information,
                community engagement, and student participation. It operates on a
                non-commercial basis and is intended to support and enhance the
                athletic and cultural experiences of our institution's community.
              </p>

              <p className="text-lg">
                All content, resources, and services provided through this
                website are subject to our institutional guidelines and policies.
                We are committed to maintaining a safe, inclusive, and engaging
                digital space for all members of our community.
              </p>

              <p className="text-lg">
                For questions, feedback, or concerns regarding this website or
                our services, please don't hesitate to contact us using the
                information provided above.
              </p>
            </div>
          </motion.section>

          {/* 5. Footer Note */}
          <motion.footer
            variants={itemVariants}
            className="text-center text-sm text-gray-500 pt-12 border-t border-slate-700/50"
          >
            <p>
              © {currentYear} {organizationName}. All rights reserved.
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </main>
  );
}
