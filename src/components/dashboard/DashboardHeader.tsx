import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, LogOut, Bell, User } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function DashboardHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Left Section: Menu Toggle and Dashboard Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        </div>

        {/* Right Section: Theme Toggle, Notifications, and Profile */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors relative"
            >
              <Bell size={24} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>

            {/* Notifications Dropdown Menu */}
            {isNotificationsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    New project created
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Profile updated
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <span className="hidden lg:inline-block font-medium">
                {user?.email || "User"}
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <button className="w-full text-left">Profile</button>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <button onClick={handleLogout} className="w-full text-left">
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