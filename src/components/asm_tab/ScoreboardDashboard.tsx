"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  LineChart,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { generateClient } from "aws-amplify/api";
import { listSchools, listScores } from "@/graphql/queries";

const client = generateClient();

interface SchoolData {
  schoolShort: string;
  fullName: string;
  color: string;
  totalPoints: number;
  sports: Record<string, number>;
}

export function ScoreboardDashboard() {
  const [showCompare, setShowCompare] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [firebaseData, setFirebaseData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Amplify
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResult = await client.graphql({
          query: listSchools
        });
        const scoresResult = await client.graphql({
          query: listScores
        });

        const schools = schoolsResult.data.listSchools.items;
        const scores = scoresResult.data.listScores.items;

        // Aggregate scores by school and event
        const schoolMap: Record<string, SchoolData> = {};
        schools.forEach((school: any) => {
          schoolMap[school.schoolShort] = {
            schoolShort: school.schoolShort,
            fullName: school.fullName,
            color: school.color,
            totalPoints: 0,
            sports: {},
          };
        });

        scores.forEach((score: any) => {
          if (schoolMap[score.schoolShort]) {
            schoolMap[score.schoolShort].sports[score.eventId] = (schoolMap[score.schoolShort].sports[score.eventId] || 0) + score.points;
            schoolMap[score.schoolShort].totalPoints += score.points;
          }
        });

        const data = Object.values(schoolMap);
        setFirebaseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sportsList = Array.from(
    new Set(firebaseData.flatMap((s) => Object.keys(s.sports)))
  );

  const chartData = sportsList.map((sport) => {
    const entry: any = { sport };
    firebaseData.forEach((s) => {
      entry[s.fullName] = s.sports[sport] || 0;
    });
    return entry;
  });

  const handleSelect = (school: string) => {
    setSelectedSchools((prev) =>
      prev.includes(school)
        ? prev.filter((s) => s !== school)
        : [...prev, school]
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* ===== DESKTOP MODE ===== */}
        {!isMobile ? (
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-xl border bg-white/80 backdrop-blur-lg shadow-lg overflow-hidden"
          >
            {/* SCOREBOARD */}
            <ResizablePanel defaultSize={showCompare ? 60 : 100}>
              <div className="p-8 transition-all duration-500 ease-in-out">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 flex items-center gap-3">
                    <Trophy className="text-yellow-500" />
                    Live Scoreboard
                  </h2>
                  <Button
                    onClick={() => setShowCompare(!showCompare)}
                    variant="outline"
                    className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100 transition"
                  >
                    {showCompare ? (
                      <>
                        <ChevronRight className="w-5 h-5" /> Hide Compare
                      </>
                    ) : (
                      <>
                        <LineChart className="w-5 h-5" /> Compare
                      </>
                    )}
                  </Button>
                </div>

                {/* SCORE CARDS */}
                <div className="space-y-5">
                  {firebaseData.map((school, index) => {
                    const isExpanded = expandedSchool === school.fullName;
                    return (
                      <Card
                        key={index}
                        className="bg-gray-50 hover:bg-gray-100 border border-gray-200 shadow-sm rounded-xl transition-all"
                      >
                        <CardHeader
                          className="flex justify-between items-center cursor-pointer"
                        onClick={() =>
                            setExpandedSchool(
                              isExpanded ? null : school.fullName
                            )
                          }
                        >
                          <CardTitle className="flex items-center gap-3 text-gray-800 text-base font-semibold">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: school.color }}
                            ></div>
                            {school.fullName}
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-900">
                              {school.totalPoints} pts
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </CardHeader>

                        {/* EXPANDABLE BAR CHART */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <CardContent className="p-6 border-t border-gray-200">
                                <ResponsiveContainer width="100%" height={200}>
                                  <BarChart
                                    data={Object.entries(school.sports).map(
                                      ([sport, wins]) => ({ sport, wins })
                                    )}
                                    margin={{
                                      top: 10,
                                      right: 20,
                                      left: 0,
                                      bottom: 10,
                                    }}
                                  >
                                    <CartesianGrid
                                      strokeDasharray="3 3"
                                      stroke="#ddd"
                                    />
                                    <XAxis
                                      dataKey="sport"
                                      tickLine={false}
                                      axisLine={false}
                                      tick={{ fill: "#555", fontSize: 12 }}
                                    />
                                    <Tooltip
                                      cursor={{
                                        fill: "rgba(0,0,0,0.05)",
                                      }}
                                      contentStyle={{
                                        backgroundColor: "white",
                                        borderRadius: "10px",
                                        border: "1px solid #eee",
                                      }}
                                    />
                                    <Bar
                                      dataKey="wins"
                                      fill={school.color}
                                      radius={[6, 6, 0, 0]}
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </ResizablePanel>

            <AnimatePresence>
              {showCompare && (
                <>
                  <ResizableHandle withHandle />
                  {/* COMPARE PANEL */}
                  <ResizablePanel defaultSize={40}>
                    <motion.div
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 80 }}
                      transition={{ duration: 0.4 }}
                      className="h-full p-8 bg-gray-50 border-l border-gray-200"
                    >
                      <CompareSection
                        firebaseData={firebaseData}
                        selectedSchools={selectedSchools}
                        handleSelect={handleSelect}
                        chartData={chartData}
                      />
                    </motion.div>
                  </ResizablePanel>
                </>
              )}
            </AnimatePresence>
          </ResizablePanelGroup>
        ) : (
          // ===== MOBILE MODE =====
          <div className="rounded-xl border bg-white/90 backdrop-blur shadow-md overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Trophy className="text-yellow-500" />
                Live Scoreboard
              </h2>
              <Button
                onClick={() => setShowCompare(true)}
                variant="outline"
                className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100 transition"
              >
                <LineChart className="w-5 h-5" /> Compare
              </Button>
            </div>

            {/* SCHOOL LIST (MOBILE) */}
            <div className="p-4 space-y-4">
              {firebaseData.map((school, i) => (
                <Card key={i} className="border border-gray-200 bg-gray-50">
                  <CardHeader
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setExpandedSchool(
                        expandedSchool === school.fullName ? null : school.fullName
                      )
                    }
                  >
                    <CardTitle className="text-gray-800 text-sm font-semibold flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: school.color }}
                      ></div>
                      {school.fullName}
                    </CardTitle>
                    <span className="font-semibold text-gray-900 text-sm">
                      {school.totalPoints} pts
                    </span>
                  </CardHeader>

                  <AnimatePresence>
                    {expandedSchool === school.fullName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CardContent className="p-4 border-t border-gray-200">
                          <ResponsiveContainer width="100%" height={180}>
                            <BarChart
                              data={Object.entries(school.sports).map(
                                ([sport, wins]) => ({ sport, wins })
                              )}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="sport"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 10, fill: "#555" }}
                              />
                              <Tooltip />
                              <Bar
                                dataKey="wins"
                                fill={school.color}
                                radius={[5, 5, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>

            {/* MOBILE COMPARE OVERLAY */}
            <AnimatePresence>
              {showCompare && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 z-50 bg-white overflow-y-auto p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-gray-600" />
                      Compare Schools
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCompare(false)}
                      className="text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <CompareSection
                    firebaseData={firebaseData}
                    selectedSchools={selectedSchools}
                    handleSelect={handleSelect}
                    chartData={chartData}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function CompareSection({
  firebaseData,
  selectedSchools,
  handleSelect,
  chartData,
}: any) {
  return (
    <div>
      <div className="space-y-3 mb-8">
        {firebaseData.map((s: any) => (
          <label
            key={s.fullName}
            className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-gray-700 text-sm font-medium">
              {s.fullName}
            </span>
            <input
              type="checkbox"
              checked={selectedSchools.includes(s.fullName)}
              onChange={() => handleSelect(s.fullName)}
              className="accent-blue-600 w-4 h-4"
            />
          </label>
        ))}
      </div>

      {selectedSchools.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="#ddd" />
            <PolarAngleAxis dataKey="sport" tick={{ fill: "#555" }} />
            <Tooltip />
            <Legend />
            {selectedSchools.map((school: string) => {
              const s = firebaseData.find((item: any) => item.fullName === school);
              return (
                <Radar
                  key={school}
                  name={school}
                  dataKey={school}
                  stroke={s?.color}
                  fill={s?.color}
                  fillOpacity={0.25}
                />
              );
            })}
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center italic mt-20">
          Select at least one school to visualize.
        </p>
      )}
    </div>
  );
}
