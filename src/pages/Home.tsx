import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import FeaturedWork from "../components/FeaturedWork";
import ProfileSection from "../components/ProfileSection";
import AnimatedTextUnderlign from "../components/AnimatedTextUnderlign";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileSection />
      <SkillsSection />
      <StatsSection />
      <FeaturedWork />
      <AnimatedTextUnderlign />
      <ContactSection />
    </>
  );
}
