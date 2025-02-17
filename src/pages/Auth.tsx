import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import AuthForm from "../components/auth/AuthForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 dark:bg-gray-800 dark:text-white"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
        </div>
      </motion.div>
    </div>
  );
}