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
  onFileChange: (field: string, file: File | null) => Promise<void>;
  onFileDelete: (field: string) => Promise<void>;
  fileUploading: boolean;
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
        <button
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 w-full h-full cursor-default focus:outline-none"
          aria-label="Close modal"
        ></button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative z-50">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {formData ? "Edit" : "Create"} {route.replace(/_/g, " ")}
        </h2>
        <form onSubmit={handleSubmit}>
          <DashboardForm
            activeTab={route}
            editForm={formData}
            onFormChange={onChange}
          />
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {formData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}