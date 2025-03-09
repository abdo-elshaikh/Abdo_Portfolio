import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../lib/api";
import { useAlert } from "../contexts/AlertContext";


export default function Auth() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await userApi.login(formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
      showAlert('success', 'Logged in successfully');
    } catch (error: any) {
      showAlert('error', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center transition-colors duration-300 ease-in-out bg-gray-100 dark:bg-gray-900'
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome to the Dashboard
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative hidden">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-3">
                <User className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Name"
                name="username"
                className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white"
              />
            </div>
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-3">
                <Mail className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white"
              />
            </div>
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 left-3">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Back to home
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}