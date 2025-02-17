import { motion, AnimatePresence } from 'framer-motion';
import { Code2, User, GraduationCap, Mail, Briefcase, BarChart } from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  isMobileMenuOpen: boolean;
  onTabChange: (tab: string) => void;
  onCloseMobileMenu: () => void;
}

const tabs = [
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'personal_info', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contacts', label: 'Contacts', icon: Mail },
  { id: 'skills', label: 'Skills', icon: Briefcase },
  { id: 'stats', label: 'Stats', icon: BarChart },
  { id: 'experiences', label: 'Experiences', icon: Briefcase }
];

export default function DashboardSidebar({
  activeTab,
  isMobileMenuOpen,
  onTabChange,
  onCloseMobileMenu
}: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-white dark:bg-gray-800 z-40 transparent"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4 pt-16">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    onCloseMobileMenu();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === tab.id} ${'bg-indigo-600 text-white'}`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}