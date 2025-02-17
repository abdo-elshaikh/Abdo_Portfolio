import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export default function Alert({ message, type, onClose }: AlertProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  const Icon = icons[type];
  const colorClass = colors[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-20 right-4 p-4 rounded-lg border ${colorClass} flex items-center gap-3 shadow-lg z-50`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}