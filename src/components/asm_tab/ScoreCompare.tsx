"use client";

import React, { useState, useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface SchoolData {
  school: string;
  color: string;
  sports: Record<string, number>;
}

// 🧠 Dummy Firebase-like data (replace this with Firestore fetch)
const firebaseData: SchoolData[] = [
  {
    school: "School of Commerce, Finance and Accountancy",
    color: "#3b82f6",
    sports: {
      "100m": 8,
      "200m": 6,
      "400m": 5,
      "Football": 10,
      "Basketball": 4,
      "Volleyball": 7,
    },
  },
  {
    school: "School of Business Management",
    color: "#10b981",
    sports: {
      "100m": 6,
      "200m": 8,
      "Football": 9,
      "Table Tennis": 4,
      "Badminton": 5,
    },
  },
  {
    school: "School of Sciences",
    color: "#f59e0b",
    sports: {
      "100m": 9,
      "400m": 10,
      "Long Jump": 7,
      "Javelin": 8,
      "Shot Put": 6,
    },
  },
  {
    school: "School of Psychological Sciences",
    color: "#ec4899",
    sports: {
      "Football": 5,
      "Basketball": 8,
      "Chess": 10,
      "Badminton": 6,
    },
  },
  {
    school: "School of Social Sciences",
    color: "#6366f1",
    sports: {
      "400m": 4,
      "Long Jump": 8,
      "Football": 7,
      "Volleyball": 9,
      "Table Tennis": 5,
    },
  },
];

export function ScoreCompare() {
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🧩 Create unique list of all sports
  const sportsList = Array.from(
    new Set(firebaseData.flatMap((s) => Object.keys(s.sports)))
  );

  // 📊 Prepare chart data dynamically
  const chartData = sportsList.map((sport) => {
    const entry: Record<string, number | string> = { sport };
    firebaseData.forEach((school) => {
      entry[school.school] = school.sports[sport] || 0;
    });
    return entry;
  });

  // 🧮 Calculate total points per school
  const totals = firebaseData.map((s) => ({
    school: s.school,
    total: Object.values(s.sports).reduce((a, b) => a + b, 0),
    color: s.color,
  }));

  const sortedTotals = useMemo(
    () => totals.sort((a, b) => b.total - a.total),
    [totals]
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Card className="shadow-xl border border-gray-200 rounded-2xl p-8 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-6">
              Compare School Performance
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* School Selector */}
            <div className="relative mb-10 flex flex-col items-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-6 py-2 text-lg bg-white shadow-sm hover:bg-gray-100 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedSchools.length > 0
                  ? `${selectedSchools.length} Selected`
                  : "Select Schools to Compare"}
                <ChevronDown className="w-5 h-5" />
              </Button>

              {dropdownOpen && (
                <div className="absolute z-20 mt-12 w-80 bg-white border border-gray-200 rounded-xl shadow-lg text-left">
                  {firebaseData.map((s) => (
                    <div
                      key={s.school}
                      onClick={() => {
                        setSelectedSchools((prev) =>
                          prev.includes(s.school)
                            ? prev.filter((x) => x !== s.school)
                            : [...prev, s.school]
                        );
                      }}
                      className={`cursor-pointer px-5 py-3 flex items-center justify-between hover:bg-gray-100 ${
                        selectedSchools.includes(s.school)
                          ? "bg-gray-50 text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {s.school}
                      {selectedSchools.includes(s.school) && "✔️"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Radar Chart */}
            {selectedSchools.length > 0 ? (
              <div className="relative w-full h-[450px] mb-16">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={chartData}>
                    <PolarGrid stroke="#ddd" />
                    <PolarAngleAxis dataKey="sport" tick={{ fill: "#555" }} />
                    <Tooltip />
                    <Legend />
                    {selectedSchools.map((school) => {
                      const entry = firebaseData.find(
                        (s) => s.school === school
                      );
                      return (
                        <Radar
                          key={school}
                          name={school}
                          dataKey={school}
                          stroke={entry?.color}
                          fill={entry?.color}
                          fillOpacity={0.2}
                        />
                      );
                    })}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-lg italic mb-16">
                Select at least one school to display performance.
              </p>
            )}

            {/* Ranking Table */}
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden text-left">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="py-3 px-6">Rank</th>
                    <th className="py-3 px-6">School</th>
                    <th className="py-3 px-6">Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTotals.map((s, i) => (
                    <tr
                      key={s.school}
                      className={`border-b hover:bg-gray-50 transition ${
                        i === 0 ? "bg-yellow-50 font-semibold" : ""
                      }`}
                    >
                      <td className="py-3 px-6">{i + 1}</td>
                      <td className="py-3 px-6 flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: s.color }}
                        ></div>
                        {s.school}
                      </td>
                      <td className="py-3 px-6">{s.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TODO: Connect to Firebase */}
            <div className="text-sm text-gray-400 mt-4 text-left">
              {/* 
              🔧 TODO (Backend Dev): 
              1. Replace `firebaseData` with real Firestore collection: `/scores`
              2. Each school document should have structure:
                 { school: string, color: string, sports: Record<string, number> }
              3. Subscribe via onSnapshot() for live updates.
              */}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
