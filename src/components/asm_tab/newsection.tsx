"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Users,
  CalendarDays,
  MapPin,
  Activity,
  Newspaper,
  Clock,} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { generateClient } from "aws-amplify/api";
import { listNewssections } from "@/graphql/queries";

const client = generateClient();

interface NewsItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export function Newssection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const result = await client.graphql({
          query: listNewssections
        });
        const items = result.data.listNewssections.items;
        setNewsItems(items);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

    return (
<section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          Important Announcements
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.length > 0 ? newsItems.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <Activity className="text-blue-500 w-6 h-6" />
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-10">
              <Newspaper className="text-gray-400 w-16 h-16 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No news yet.</p>
            </div>
          )}
        </div>
      </section>
    );
}
