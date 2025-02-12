import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  isVisible?: boolean;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    className: 'alert-success',
  },
  error: {
    icon: XCircle,
    className: 'alert-error',
  },
  warning: {
    icon: AlertCircle,
    className: 'alert-warning',
  },
  info: {
    icon: Info,
    className: 'alert-info',
  },
};

export default function Alert({ type, message, onClose, isVisible = true }: AlertProps) {
  const { icon: Icon, className } = alertConfig[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`alert ${className} shadow-lg`}>
            <Icon className="w-6 h-6" />
            <span>{message}</span>
            {onClose && (
              <button
                onClick={onClose}
                className="btn btn-circle btn-ghost btn-sm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}