import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AuthButtonProps {
  loading: boolean;
  isLogin: boolean;
}

export default function AuthButton({ loading, isLogin }: AuthButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-all"
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {isLogin ? "Sign In" : "Create Account"}
          <ArrowRight size={20} />
        </>
      )}
    </motion.button>
  );
}