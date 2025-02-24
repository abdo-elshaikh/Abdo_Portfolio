import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import DashboardForm from './DashboardForm';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  activeTab: string;
  editForm: any;
  onFormSubmit: (formData: any) => void;
  onFormChange: (field: string, value: any) => void;
  errors?: Record<string, string>; // Validation errors
  isSubmitting?: boolean; // Loading state
}

export default function DashboardModal({
  isOpen,
  onClose,
  isEditing,
  activeTab,
  editForm,
  onFormSubmit,
  onFormChange,
  errors,
  isSubmitting,
}: DashboardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md md:max-w-2xl mx-2 overflow-y-auto max-h-[90vh]"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onFormSubmit(editForm);
              }}
              className="p-4 md:p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold dark:text-white">
                  {isEditing ? 'Edit' : 'Create'} {activeTab.replace(/_/g, ' ')}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form Content */}
              <DashboardForm
                activeTab={activeTab}
                editForm={editForm}
                onFormChange={onFormChange}
                errors={errors}
                isSubmitting={isSubmitting}
              />

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}