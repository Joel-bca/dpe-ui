"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trophy, X, Medal } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Winner {
  prize: string;
  name: string;
  event: string;
  school: string;
  schoolName: string;
  chestNo?: string;
  position: number;
  points: number;
  manualPoints: number;
}

interface SchoolData {
  schoolName: string;
  fullName: string;
  color: string;
  totalPoints: number;
  sports: Record<string, number>;
}

export function ScoreboardDashboardNew() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data from custom API endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsResponse, scoresResponse] = await Promise.all([
          fetch('/api/schools'),
          fetch('/api/scores')
        ]);

        const schoolsData = await schoolsResponse.json();
        const scoresData = await scoresResponse.json();

        // Check if data is an array
        const schoolsArray = Array.isArray(schoolsData) ? schoolsData : [];
        const scoresArray = Array.isArray(scoresData) ? scoresData : [];

        // Aggregate scores by school and event from scores data
        const schoolMap: Record<string, SchoolData> = {};
        scoresArray.forEach((score: any) => {
          const schoolKey = score.schoolName;
          if (!schoolMap[schoolKey]) {
            schoolMap[schoolKey] = {
              schoolName: schoolKey,
              fullName: schoolKey,
              color: "#3B82F6",
              totalPoints: 0,
              sports: {},
            };
          }
          schoolMap[schoolKey].sports[score.eventId] = (schoolMap[schoolKey].sports[score.eventId] || 0) + score.points;
          schoolMap[schoolKey].totalPoints += score.points;
        });

        const schoolsArraySorted = Object.values(schoolMap).sort((a, b) => b.totalPoints - a.totalPoints);
        setSchools(schoolsArraySorted);

        // Determine winners: group by eventId, sort by points desc, take top 3
        const eventGroups: Record<string, any[]> = {};
        scoresArray.forEach((score: any) => {
          if (!eventGroups[score.eventId]) {
            eventGroups[score.eventId] = [];
          }
          eventGroups[score.eventId].push(score);
        });

        const winnersList: Winner[] = [];
        Object.entries(eventGroups).forEach(([eventId, scores]) => {
          const sortedScores = scores.sort((a, b) => b.points - a.points);
          const top3 = sortedScores.slice(0, 3);
          top3.forEach((score, index) => {
            const position = index + 1;
            winnersList.push({
              prize: position === 1 ? "🥇" : position === 2 ? "🥈" : "🥉",
              name: score.playerOrTeamName,
              event: eventId,
              school: score.schoolName,
              schoolName: score.schoolName,
              chestNo: score.chestNo,
              position,
              points: score.points,
              manualPoints: score.Points,
            });
          });
        });

        // Sort winners by position (1st, 2nd, 3rd) and then by event
        winnersList.sort((a, b) => a.position - b.position || a.event.localeCompare(b.event));
        setWinners(winnersList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSchoolClick = (schoolName: string) => {
    setSelectedSchool(schoolName);
    setIsModalOpen(true);
  };

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "";
    }
  };

  const getPositionBackground = (position: number) => {
    switch (position) {
      case 1: return "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600";
      case 2: return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500";
      case 3: return "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800";
      default: return "bg-gradient-to-br from-blue-500 to-purple-600";
    }
  };

  const topSchools = schools.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Live ScoreBoards
          </h1>
          <p className="text-gray-600 text-lg">Track school performances and winners in real-time</p>
          <p><i>This system is managed and maintained by the Department of Physical Education. All scores are thoroughly reviewed and verified for accuracy prior to publication.</i></p>
        </div>

        {/* Overall School Scores Section */}
        <motion.section
          className="mb-16"
          animate={{ y: isModalOpen ? -100 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Overall School Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {topSchools.map((school, index) => (
              <motion.div
                key={school.schoolName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => handleSchoolClick(school.fullName)}
              >
                <Card className="bg-white text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-800 leading-tight">{school.fullName}</CardTitle>
                      {index < 3 && (
                        <div className="text-3xl">
                          {getMedalEmoji(index + 1)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2 text-blue-600">{school.totalPoints}</div>
                    <p className="text-gray-600">Total Points</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Winners Carousel Section */}
        <motion.section
          className="mb-16"
          animate={{ y: isModalOpen ? -50 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Event Winners</h2>
          <div className="max-w-6xl mx-auto">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {winners.map((winner, index) => (
                  <CarouselItem key={`${winner.event}-${winner.position}`} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="p-2"
                    >
                      <Card className={`${getPositionBackground(winner.position)} text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 h-80 flex flex-col justify-center`}>
                        <CardHeader className="text-center pb-3">
                          <div className="text-5xl mb-2">{winner.prize}</div>
                          <CardTitle className="text-xl font-bold leading-tight text-center">{winner.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center flex-1 flex flex-col justify-center">
                          <p className="text-lg mb-3 font-semibold">{winner.event}</p>
                          <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30 text-sm mx-auto px-3 py-1 whitespace-normal leading-tight">
                            {winner.school}
                          </Badge>
                          <p className="text-sm opacity-90">Position: {winner.position} | Points: {winner.points} (Manual: {winner.manualPoints})</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </motion.section>

        {/* Interactive Graph Modal */}
        <AnimatePresence>
          {isModalOpen && selectedSchool && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-between">
                      {selectedSchool} - Event Performance
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </DialogTitle>
                  </DialogHeader>
                  <motion.div
                    className="mt-6"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 400, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={Object.entries(schools.find(s => s.fullName === selectedSchool)?.sports || {}).map(([event, points]) => ({
                          event,
                          points
                        }))}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="event" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="points"
                          fill={schools.find(s => s.fullName === selectedSchool)?.color || "#8884d8"}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
