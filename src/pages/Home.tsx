import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import SkillsSection from "../components/home/SkillsSection";
import ContactSection from "../components/home/ContactSection";
import FeaturedWork from "../components/home/FeaturedWork";
import ProfileSection from "../components/home/ProfileSection";
import WhatsAppPopup from "../components/WhatsAppPopup";
import LiveChat from "../components/LiveChat";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileSection />
      <SkillsSection />
      <StatsSection />
      <FeaturedWork />
      <ContactSection />
      {/* <LiveChat /> */}
      <WhatsAppPopup />
    </>
  );
}
