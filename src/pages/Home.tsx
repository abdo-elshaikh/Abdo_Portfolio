import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import FeaturedWork from "../components/FeaturedWork";
import ProfileSection from "../components/ProfileSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ProfileSection />
      <StatsSection />
      <SkillsSection />
      <FeaturedWork />
      <ContactSection />
    </motion.div>
  );
}
