import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DashboardContent from "../components/dashboard/DashboardContent";
import UsersPage from "../components/dashboard/UsersPage";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

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
        <main className="flex-1 h-full p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<MainPage />} />
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

function MainPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Widget: Welcome Card */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome back, John!</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Here's what's happening with your projects today.</p>
      </div>

      {/* Widget: Stats Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Projects</h4>
        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">12</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Active Projects</p>
      </div>

      {/* Widget: Line Chart */}
      <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Performance</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}