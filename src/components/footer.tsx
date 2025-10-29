"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Users2,
  MonitorSmartphone,
  Camera,
  Stethoscope,
  Megaphone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full bg-black text-gray-300 pt-16 pb-10 border-t border-white/10 overflow-hidden">
      {/* Top gradient glow line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500 blur-[1px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-10 tracking-wide">
          Department of Physical Education | BYC
        </h2>

        {/* Accordion Section */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          defaultValue="item-1"
        >
          {/* Contact Info */}
          <AccordionItem value="item-1" className="border-white/10">
            <AccordionTrigger className="text-lg font-semibold text-gray-100 hover:text-white">
              Contact Us
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3 text-gray-400 pt-3">
              <div className="flex items-center gap-3 hover:text-white transition">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>dpe.byc@christuniversity.in</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91-98765 43210</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Christ University, BYC Campus, Bangalore, India</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Quick Links */}
          <AccordionItem value="item-2" className="border-white/10">
            <AccordionTrigger className="text-lg font-semibold text-gray-100 hover:text-white">
              Quick Links
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-400 pt-3">
              <a href="/" className="hover:text-emerald-400 transition flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Home
              </a>
              <a href="/events" className="hover:text-emerald-400 transition flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Events
              </a>
              <a href="/committee" className="hover:text-emerald-400 transition flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> Committee
              </a>
              <a href="/#about" className="hover:text-emerald-400 transition flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> About Us
              </a>
            </AccordionContent>
          </AccordionItem>

          {/* Committees Info */}
          <AccordionItem value="item-3" className="border-white/10">
            <AccordionTrigger className="text-lg font-semibold text-gray-100 hover:text-white">
              Committees
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 pt-3">
              <div className="flex items-center gap-2 hover:text-emerald-400 transition">
                <MonitorSmartphone className="w-4 h-4" /> IT & Records
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition">
                <Camera className="w-4 h-4" /> Media
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition">
                <Users2 className="w-4 h-4" /> Logistics
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition">
                <Stethoscope className="w-4 h-4" /> Medical
              </div>
              <div className="flex items-center gap-2 hover:text-emerald-400 transition">
                <Megaphone className="w-4 h-4" /> Public Relations
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bottom Divider */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Department of Physical Education, Christ University BYC Campus.
          </p>
          <p className="text-gray-600 mt-1">
            Designed & Developed by <span className="text-emerald-400">DPE IT & Records Committee</span>
          </p>
        </div>
      </div>

      {/* Soft glow effect at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-emerald-400/10 to-transparent blur-3xl"></div>
    </footer>
  );
}
