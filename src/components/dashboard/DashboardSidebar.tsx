import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  X,
  User2,
} from "lucide-react";

export default function DashboardSidebar({
  isMobileMenuOpen,
  toggleMobileMenu,
  isSidebarCollapsed,
  setIsMobileMenuOpen,
  toggleSidebarCollapse,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setIsMobileMenuOpen: (value: boolean) => void;
  toggleSidebarCollapse: () => void;
  isSidebarCollapsed: boolean;
}) {
  const location = useLocation();

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", path: "/dashboard/projects", icon: Folder },
    { id: "education", label: "Education", path: "/dashboard/education", icon: GraduationCap },
    { id: "skills", label: "Skills", path: "/dashboard/skills", icon: Code },
    { id: "experiences", label: "Experiences", path: "/dashboard/experiences", icon: Briefcase },
    { id: "stats", label: "Stats", path: "/dashboard/stats", icon: BarChart },
    { id: "contacts", label: "Contacts", path: "/dashboard/contacts", icon: Contact },
    { id: "personal-info", label: "Personal Info", path: "/dashboard/personal-info", icon: User },
    { id: "users", label: "Users", path: "/dashboard/users", icon: User2 },
    { id: "home", label: "Home", path: "/", icon: Home },
  ];

  useEffect(() => {
    const routeTitle = location.pathname.split("/")[2] || "Dashboard";
    document.title = `${routeTitle.charAt(0).toUpperCase() + routeTitle.slice(1)} | Dashboard`;
    setIsMobileMenuOpen(false);
  }, [location, setIsMobileMenuOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? "md:w-20" : "md:w-64"}
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isSidebarCollapsed && <h1 className="text-lg font-semibold text-gray-700 dark:text-white">Dashboard</h1>}
          <button
            onClick={toggleSidebarCollapse}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
            aria-label="Toggle sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col flex-grow">
          {navItems.map(({ id, label, path, icon: Icon }) => (
            <Link
              key={id}
              to={path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
              ${location.pathname === path ? "bg-gray-200 dark:bg-gray-800 font-semibold" : ""}`}
              aria-label={label}
            >
              <Icon className="w-6 h-6" />
              <span className={`md:${isSidebarCollapsed ? "hidden" : "block"}`}>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Close Button */}
        {isMobileMenuOpen && (
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </aside>
    </>
  );
}
