import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import UsersPage from "../components/dashboard/UsersPage";
import DashboardMain from "../components/dashboard/DashboardMain";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebarCollapse={toggleSidebarCollapse}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out animate-fade-in transition-margin
          ${!isSidebarCollapsed ? "md:ml-20 lg:ml-64" : "md:ml-0 lg:ml-20"}
        `}
      >
        {/* Header */}
        <DashboardHeader toggleMobileMenu={toggleMobileMenu} />

        {/* Main Area */}
        <main className="flex-1 h-full p-2 md:p-4 lg:p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardMain />} />
            <Route path="/projects" element={<DashboardContent route="projects" />} />
            <Route path="/education" element={<DashboardContent route="education" />} />
            <Route path="/skills" element={<DashboardContent route="skills" />} />
            <Route path="/experiences" element={<DashboardContent route="experiences" />} />
            <Route path="/stats" element={<DashboardContent route="stats" />} />
            <Route path="/contacts" element={<DashboardContent route="contacts" />} />
            <Route path="/personal-info" element={<DashboardContent route="personalInfo" />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
