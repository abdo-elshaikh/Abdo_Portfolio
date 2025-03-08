import { useState } from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  GraduationCap,
  Code,
  Briefcase,
  BarChart,
  Contact,
  User,
  Home,
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import DashboardContent from "../components/dashboard/DashboardContent";

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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", path: "/dashboard/projects", icon: Folder },
    { id: "education", label: "Education", path: "/dashboard/education", icon: GraduationCap },
    { id: "skills", label: "Skills", path: "/dashboard/skills", icon: Code },
    { id: "experiences", label: "Experiences", path: "/dashboard/experiences", icon: Briefcase },
    { id: "stats", label: "Stats", path: "/dashboard/stats", icon: BarChart },
    { id: "contacts", label: "Contacts", path: "/dashboard/contacts", icon: Contact },
    { id: "personal-info", label: "Personal Info", path: "/dashboard/personal-info", icon: User },
    { id: "home", label: "Home", path: "/", icon: Home },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white dark:bg-gray-800 shadow-lg h-screen fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-64"} 
          lg:translate-x-0 lg:w-20 lg:hover:w-64 lg:transition-all`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center content-between bg-gray-100 dark:bg-gray-700 p-2 w-full shadow-sm">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <X size={24} />
            </button>
          </div>
          <button
            onClick={toggleSidebarCollapse}
            className="hidden lg:block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {isSidebarCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors 
                    ${location.pathname === item.path
                      ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                      : ""
                    }`}
                  onClick={toggleMobileMenu}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="lg:hidden lg:group-hover:block">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out animate-fade-in transition-margin
          ${isSidebarCollapsed ? "ml-20 lg:ml-64" : "ml-0 lg:ml-20"}
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <Menu size={24} />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-full border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <Bell size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                    </div>
                    <ul>
                      <li>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Settings size={16} className="inline-block mr-2" />
                          Settings
                        </button>
                      </li>
                      <li>
                        <button className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <LogOut size={16} className="inline-block mr-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

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
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}