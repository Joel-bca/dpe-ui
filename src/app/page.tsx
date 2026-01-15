import { Nav } from "@/components/navgation";
import { HeroSection } from "@/components/hero";
import { EventCarousel  } from "@/components/EventCarousel";
import { HomeCommitteePreview } from "@/components/hero_about_preview";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <EventCarousel  />
      <HomeCommitteePreview />
    </>
  );
}