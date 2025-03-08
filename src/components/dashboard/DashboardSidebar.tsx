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
  X,
  Menu,
  Home,
} from "lucide-react";

export default function DashboardSidebar({
  isMobileMenuOpen,
  onMenuToggle,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
  setIsMobileMenuOpen: (value: boolean) => void;
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
    { id: "home", label: "Home", path: "/", icon: Home },
  ];

  // Update document title and close mobile menu on route change
  useEffect(() => {
    const routeTitle = location.pathname.split("/")[2] || "Dashboard";
    document.title = `${routeTitle.charAt(0).toUpperCase() + routeTitle.slice(1)} | Dashboard`;
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location, setIsMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        onClick={onMenuToggle}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out 
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        }`}
        aria-hidden={!isMobileMenuOpen}
      ></div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white dark:bg-gray-800 shadow-lg h-screen fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-64"} 
          lg:translate-x-0`} // Always visible on larger screens
        aria-label="Sidebar"
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  onClick={onMenuToggle} // Close mobile menu on link click
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}