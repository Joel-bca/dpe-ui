import { Nav } from "@/components/navgation";
import { HeroSection } from "@/components/hero";
import { EventCarousel  } from "@/components/EventCarousel";
import { ScoreboardDashboard } from "@/components/asm_tab/ScoreboardDashboard";
import { FixturesDashboard } from "@/components/asm_tab/FixturesDashboard";
import { Newssection } from "@/components/asm_tab/newsection";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <EventCarousel  />
      <Newssection />
      <ScoreboardDashboard />
      <FixturesDashboard />
    </>
  );
}