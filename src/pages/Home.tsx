import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import FeaturedWork from "../components/FeaturedWork";
import ProfileSection from "../components/ProfileSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileSection />
      <SkillsSection />
      <StatsSection />
      <FeaturedWork />
      <ContactSection />
    </>
  );
}
