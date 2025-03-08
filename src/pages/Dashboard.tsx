import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardMain from "../components/dashboard/DashboardMain";
import DashboardContent from "../components/dashboard/DashboardContent";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  document.title = "Home | Dashboard";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={toggleMobileMenu}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full `overflow-x-hidden overflow-y-auto`">
        {/* Header */}
        <DashboardHeader onMenuToggle={toggleMobileMenu} />

        {/* Animated Main Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-y-auto transition-all duration-300 `${isMobileMenuOpen ? 'translate-x-64' : 'pl-16'}`"
        >
          <Routes>
            <Route path="/" element={<DashboardMain />} />
            <Route path="/projects" element={<DashboardContent route="projects" />} />
            <Route path="/education" element={<DashboardContent route="education" />} />
            <Route path="/skills" element={<DashboardContent route="skills" />} />
            <Route path="/experiences" element={<DashboardContent route="experiences" />} />
            <Route path="/stats" element={<DashboardContent route="stats" />} />
            <Route path="/contacts" element={<DashboardContent route="contacts" />} />
            <Route path="/personal-info" element={<DashboardContent route="personalInfo" />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  );
}