import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  User,
  GraduationCap,
  Mail,
  Briefcase,
  BarChart,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  isMobileMenuOpen: boolean;
  onTabChange: (tab: string) => void;
  onCloseMobileMenu: () => void;
}

const tabs = [
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "personal_info", label: "Personal Info", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contacts", label: "Contacts", icon: Mail },
  { id: "skills", label: "Skills", icon: Briefcase },
  { id: "stats", label: "Stats", icon: BarChart },
  { id: "experiences", label: "Experiences", icon: Briefcase },
];

export default function DashboardSidebar({
  activeTab,
  isMobileMenuOpen,
  onTabChange,
  onCloseMobileMenu,
}: DashboardSidebarProps) {
  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-60 h-full bg-white dark:bg-gray-900 shadow-lg p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-8">
          Dashboard
        </h2>
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-300 text-left ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
              }`}
              aria-label={tab.label}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <tab.icon size={20} />
              </div>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex"
          >
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ duration: 0.3 }}
              className="w-64 bg-white/90 dark:bg-gray-600 h-full shadow-lg p-4 rounded-r-xl"
            >
              {/* ✅ Close Button */}
              <button
                onClick={onCloseMobileMenu}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              </button>

              {/* ✅ Menu Items */}
              <div className="mt-10 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      onCloseMobileMenu();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
                    }`}
                    aria-label={tab.label}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <tab.icon size={20} />
                    </div>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
