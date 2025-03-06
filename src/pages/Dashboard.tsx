import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardModal from "../components/dashboard/DashboardModal";
import DashboardDeleteModal from "../components/dashboard/DashboardDeleteModal";
import Alert from "../components/Alert";
import {
  projectsApi,
  personalInfoApi,
  educationApi,
  skillsApi,
  experiencesApi,
  statsApi,
  contactsApi,
  storageApi,
} from "../lib/api";
import {
  Project,
  Education,
  Contact,
  Experience,
  PersonalInfo,
  Skill,
  Stat,
  AlertProps,
} from "../lib/types";

type EntityType =
  | "projects"
  | "personal_info"
  | "education"
  | "contacts"
  | "skills"
  | "stats"
  | "experiences";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<EntityType>("projects");
  const [data, setData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Fetch data when activeTab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response: any;
      switch (activeTab) {
        case "projects":
          response = await projectsApi.getAll();
          break;
        case "personal_info":
          response = await personalInfoApi.get();
          setData(response ? [response] : []);
          return;
        case "education":
          response = await educationApi.getAll();
          break;
        case "contacts":
          response = await contactsApi.getAll();
          break;
        case "skills":
          response = await skillsApi.getAll();
          break;
        case "stats":
          response = await statsApi.getAll();
          break;
        case "experiences":
          response = await experiencesApi.getAll();
          break;
        default:
          response = [];
      }
      setData(response || []);
      setAlert(null);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: any) => {
    const errorMessage =
      error.message || "Failed to fetch data. Please try again.";
    setAlert({
      type: "error",
      message: errorMessage.includes("authentication")
        ? "Please sign in again to continue."
        : `Failed to fetch ${activeTab.replace(/_/g, " ")}: ${errorMessage}`,
    });
    setData([]);
    if (error.message?.includes("authentication")) {
      supabase.auth.signOut();
      navigate("/auth");
    }
    console.error(`Fetch error for ${activeTab}:`, error);
  };

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleCreateUpdate = async (formData: any) => {
    try {
      if (isEditing) {
        await handleUpdate(isEditing, formData);
      } else {
        await handleCreate(formData);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Operation failed. Please try again.",
      });
      console.error("Operation error:", error);
    }
  };

  const handleCreate = async (formData: any) => {
    try {
      switch (activeTab) {
        case "projects":
          await projectsApi.create(formData);
          break;
        case "personal_info":
          await personalInfoApi.update(formData);
          break;
        case "education":
          await educationApi.create(formData);
          break;
        case "contacts":
          await contactsApi.create(formData);
          break;
        case "skills":
          await skillsApi.create(formData);
          break;
        case "stats":
          await statsApi.create(formData);
          break;
        case "experiences":
          await experiencesApi.create(formData);
          break;
      }
      setAlert({ type: "success", message: "Item created successfully." });
      setIsModalOpen(false);
      setEditForm({});
      setIsEditing(null);
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (id: string, formData: any) => {
    try {
      switch (activeTab) {
        case "projects":
          await projectsApi.update(id, formData);
          break;
        case "personal_info":
          await personalInfoApi.update(formData);
          break;
        case "education":
          await educationApi.update(id, formData);
          break;
        case "contacts":
          await contactsApi.update(id, formData);
          break;
        case "skills":
          await skillsApi.update(id, formData);
          break;
        case "stats":
          await statsApi.update(id, formData);
          break;
        case "experiences":
          await experiencesApi.update(id, formData);
          break;
      }
      setAlert({ type: "success", message: "Item updated successfully." });
      setIsModalOpen(false);
      setEditForm({});
      setIsEditing(null);
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      switch (activeTab) {
        case "projects":
          await projectsApi.delete(id);
          break;
        case "education":
          await educationApi.delete(id);
          break;
        case "contacts":
          await contactsApi.delete(id);
          break;
        case "skills":
          await skillsApi.delete(id);
          break;
        case "stats":
          await statsApi.delete(id);
          break;
        case "experiences":
          await experiencesApi.delete(id);
          break;
      }
      setAlert({ type: "success", message: "Item deleted successfully." });
      setItemToDelete(null);
      fetchData();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to delete item. Please try again.",
      });
      console.error("Delete error:", error);
    }
  };

  const handleUpload = async (file: File, path: string) => {
    try {
      const data = await storageApi.upload(file, path);
      setAlert({ type: "success", message: "File uploaded successfully." });
      console.log("File uploaded:", data);
      return data.fullPath;
    } catch (error) {
      setAlert({ type: "error", message: "Failed to upload file. Please try again." });
      throw error;
    }
  };

  const handleReplace = async (file: File, path: string) => {
    try {
      const data = await storageApi.replace(file, path);
      setAlert({ type: "success", message: "File replaced successfully." });
      console.log("File replaced:", data);
      return data.fullPath;
    } catch (error) {
      setAlert({ type: "error", message: "Failed to replace file. Please try again." });
      throw error;
    }
  };

  const handleDeleteFile = async (path: string) => {
    try {
      await storageApi.delete(path);
      setAlert({ type: "success", message: "File deleted successfully." });
    } catch (error) {
      setAlert({ type: "error", message: "Failed to delete file. Please try again." });
      throw error;
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DashboardHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onLogout={async () => {
          await supabase.auth.signOut();
          navigate("/auth");
        }}
      />

      <div className="flex">
        <DashboardSidebar
          activeTab={activeTab}
          isMobileMenuOpen={isMobileMenuOpen}
          onTabChange={(tab) => setActiveTab(tab as EntityType)}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        <motion.main
          className="flex-1 pt-20 pb-8 px-4 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.replace(/_/g, " ")}...`}
          />

          <DashboardContent
            activeTab={activeTab}
            data={filteredData}
            loading={loading}
            onEdit={(item) => {
              setIsModalOpen(true);
              setIsEditing(item.id);
              setEditForm(item);
            }}
            onDelete={setItemToDelete}
            onAddNew={() => {
              setIsModalOpen(true);
              setEditForm({});
              setIsEditing(null);
            }}
          />
        </motion.main>
      </div>

      <DashboardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(null);
          setEditForm({});
        }}
        handleUploadFile={handleUpload}
        handleReplaceFile={handleReplace}
        handleDeleteFile={handleDeleteFile}
        isEditing={!!isEditing}
        activeTab={activeTab}
        editForm={editForm}
        onFormSubmit={handleCreateUpdate}
        onFormChange={(field, value) =>
          setEditForm({ ...editForm, [field]: value })
        }
      />

      <DashboardDeleteModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={async () => {
          if (itemToDelete) {
            await handleDelete(itemToDelete);
          }
        }}
      />
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-300"
      />
    </div>
  );
};