import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import FeaturedWork from '../components/FeaturedWork';
import ProfileSection from '../components/ProfileSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <HeroSection />
      {/* Profile Section */}
      <ProfileSection />
      {/* About Section */}
      {/* <AboutSection /> */}
      {/* Education Section */}
      {/* <EducationSection /> */}
      {/* Stats Section */}
      <StatsSection />
      {/* Skills Section */}
      <SkillsSection />
      {/* Contact Section */}
      <ContactSection />
      {/* Featured Work Preview */}
      <FeaturedWork />
    </div>
  );
}