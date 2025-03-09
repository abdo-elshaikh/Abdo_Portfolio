import React from "react";
import { X } from "lucide-react";
import DashboardForm from "./DashboardForm";

type FormData = {
  [key: string]: any;
};

type DashboardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  formData: FormData | null;
  onChange: (field: string, value: any) => void;
  route: string;
};

export default function DashboardModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  route,
}: DashboardModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData || {});
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 
        p-6 transform transition-all duration-300 ease-in-out scale-95 sm:scale-100 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {formData ? "Edit" : "Create"} {route.replace(/_/g, " ")}
        </h2>

        {/* Modal Content */}
        <div className="max-h-[70vh] overflow-y-auto px-2">
          <form onSubmit={handleSubmit}>
            <DashboardForm
              activeTab={route}
              editForm={formData}
              onFormChange={onChange}
            />

            {/* Action Buttons */}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                {formData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
