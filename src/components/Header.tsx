import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/contact", label: "Contact" },
  ];

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
        : "bg-transparent dark:bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
          <strong>Dev.</strong>
          <span className="text-gray-600 dark:text-gray-300 font-serif"> ABDO MHMD</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-md font-medium transition-all text-sm sm:text-base 
                  ${isActive
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-600 dark:bg-cyan-400"
                        layoutId="active-nav"
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden absolute w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <motion.div
                className="flex flex-col gap-2"
                initial="hidden"
                animate="visible"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={linkVariants}
                    transition={{ duration: 0.1, delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                          ? "bg-cyan-50 dark:bg-gray-800 text-cyan-600 dark:text-cyan-400"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Sign Out Button */}
                <motion.div
                  variants={linkVariants}
                  transition={{ duration: 0.1, delay: navItems.length * 0.05 }}
                >
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate("/");
                    }}
                    className="w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-all"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}