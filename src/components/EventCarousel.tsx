"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CalendarDays, MapPin, Activity } from "lucide-react"; // ⬅️ Icon library from ShadCN

const events = [
  {
    title: "Annual Sports Meet 2025",
    description:
      "Departments go head-to-head in an intense showdown of strategy and skill — who will claim the championship this year?",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1600&q=80",
    buttonLink: "/events/ASM",
    status: "Upcoming",
    date: "14th November 2025",
    venue: "Chirst University",
  },
];

export function EventCarousel() {
  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-20 overflow-hidden">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming & Ongoing Events
        </motion.h2>
        <motion.p
          className="text-gray-400 mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Stay updated with the latest happenings from the Department of Physical Education.
        </motion.p>
      </div>

      {/* Event Carousel */}
      <div className="flex justify-center">
        <Carousel
          className="w-full max-w-6xl px-6"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {events.map((event, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3 transition-transform duration-700 ease-out"
              >
                <EventCard {...event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/10 hover:bg-white/20 border-none" />
          <CarouselNext className="right-2 bg-white/10 hover:bg-white/20 border-none" />
        </Carousel>
      </div>
    </section>
  );
}

function EventCard({
  title,
  description,
  image,
  buttonLink,
  status,
  date,
  venue,
}: {
  title: string;
  description: string;
  image: string;
  buttonLink: string;
  status: string;
  date: string;
  venue: string;
}) {
  const statusColor =
    status === "Ongoing"
      ? "text-green-400"
      : status === "Upcoming"
      ? "text-yellow-400"
      : "text-gray-400";

  return (
    <motion.div
      className="group relative h-[430px] w-full overflow-hidden rounded-2xl shadow-2xl cursor-pointer bg-black/40 border border-white/10 backdrop-blur-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        )}
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Static info */}
      <div className="absolute bottom-0 p-6 z-10 transition-all duration-500">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Hover details */}
        <div className="opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
            <Activity className={`h-4 w-4 ${statusColor}`} />
            <span className={statusColor}>{status}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
            <CalendarDays className="h-4 w-4 text-blue-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <MapPin className="h-4 w-4 text-red-400" />
            <span>{venue}</span>
          </div>
        </div>

        {/* Always visible button (fixed position) */}
        <Link href={buttonLink}>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Learn More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
