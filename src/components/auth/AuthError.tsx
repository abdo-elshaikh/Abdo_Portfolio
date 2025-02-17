import { motion } from "framer-motion";

interface AuthErrorProps {
  error: string | null;
}

export default function AuthError({ error }: AuthErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-4 p-3 bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200 rounded-lg text-sm"
    >
      {error}
    </motion.div>
  );
}