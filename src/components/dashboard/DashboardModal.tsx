import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Trash2, RefreshCw } from 'lucide-react';
import DashboardForm from './DashboardForm';
import { useState } from 'react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  activeTab: string;
  editForm: any;
  onFormSubmit: (formData: any) => void;
  onFormChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
  isSubmitting?: boolean;
  handleUploadFile?: (file: File, path: string) => Promise<string>;
  handleDeleteFile?: (path: string) => Promise<void>;
  handleReplaceFile?: (file: File, path: string) => Promise<string>;
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
  handleUploadFile,
  handleDeleteFile,
  handleReplaceFile,
}: DashboardModalProps) {
  const [fileUploading, setFileUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = async (field: string, file: File | null) => {
    if (!file) return;

    try {
      setFileUploading(true);
      setFileError(null);

      // If editing and file exists, replace it
      if (isEditing && editForm[field]) {
        if (handleReplaceFile) {
          const newUrl = await handleReplaceFile(file, editForm[field]);
          onFormChange(field, newUrl);
        }
      } else {
        // Otherwise upload new file
        if (handleUploadFile) {
          const url = await handleUploadFile(file, `${activeTab}/${field}`);
          onFormChange(field, url);
        }
      }
    } catch (error) {
      setFileError('File upload failed. Please try again.');
      console.error('File upload error:', error);
    } finally {
      setFileUploading(false);
    }
  };

  const handleFileDelete = async (field: string) => {
    if (!editForm[field] || !handleDeleteFile) return;

    try {
      setFileUploading(true);
      setFileError(null);
      await handleDeleteFile(editForm[field]);
      onFormChange(field, '');
    } catch (error) {
      setFileError('File deletion failed. Please try again.');
      console.error('File deletion error:', error);
    } finally {
      setFileUploading(false);
    }
  };

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

              {/* File Upload Error */}
              {fileError && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {fileError}
                </div>
              )}

              {/* Form Content */}
              <DashboardForm
                activeTab={activeTab}
                editForm={editForm}
                onFormChange={onFormChange}
                errors={errors}
                isSubmitting={isSubmitting}
                fileUploading={fileUploading}
                handleFileChange={handleFileChange}
                handleFileDelete={handleFileDelete}
              />

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  disabled={fileUploading || isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={fileUploading || isSubmitting}
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