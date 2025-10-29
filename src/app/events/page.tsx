"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroSection } from "@/components/Events_tab/hero";
import { motion } from "framer-motion";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch events");
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#e7f0ff] to-[#fdfdff] min-h-screen text-gray-900">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Explore Our Events
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 text-lg animate-pulse">
            Loading events...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10" id="section">
            {events.map((event, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/events/${event.SheetName || "ASM"}`}>
                  <div className="rounded-2xl overflow-hidden shadow-md bg-white/70 backdrop-blur-md border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <img
                      src={event.Image || "/default-event.jpg"}
                      alt={event.EventName}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                        {event.EventName || "Unnamed Event"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {event.Date || "Date TBA"} · {event.Location || "Campus"}
                      </p>
                      <p className="mt-3 text-gray-700 leading-snug line-clamp-3">
                        {event["Short Description"] || "More info coming soon..."}
                      </p>
                      <div className="mt-5">
                        <span className="inline-flex items-center text-blue-600 font-medium hover:underline">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
