import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, LogOut, Bell, User, ChevronDown, ChevronUp, Settings, Search } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function DashboardHeader({ toggleMobileMenu }: { toggleMobileMenu: () => void; }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between p-3">
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
          <div className="relative inline-block">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <User size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
            
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold">
                    {user?.full_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <ul>
                  <li>
                    <button onClick={() => navigate("/dashboard/settings")} className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings size={16} className="inline-block mr-2" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
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
  );
}