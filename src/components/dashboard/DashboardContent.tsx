import { useEffect, useState } from "react";
import { PersonalInfo, Education, Skill, Contact, Experience, Project, Stat } from "../../lib/types";
import { statsApi, projectsApi, personalInfoApi, contactsApi, skillsApi, experiencesApi, educationApi, storageApi } from "../../lib/api";
import { useAlert } from "../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import DashboardLoader from "./DashboardLoader";
import DashboardDeleteModal from "./DashboardDeleteModal";
import DashboardModal from "./DashboardModal";
import DashboardItem from "./DashboardItem";

const RouteMap: any = {
  personalInfo: personalInfoApi,
  education: educationApi,
  skills: skillsApi,
  experiences: experiencesApi,
  contacts: contactsApi,
  projects: projectsApi,
  stats: statsApi,
};
export default function DashboardContent({ route }: { route: string }) {
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [currentRoute, setCurrentRoute] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, [route, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = RouteMap[route] === personalInfoApi ?
        await RouteMap[route].get() : await RouteMap[route].getAll();
      setCurrentRoute(RouteMap[route] === personalInfoApi ? [data] : data);
    } catch (error) {
      console.error(`Error fetching ${route}:`, error);
      showAlert('error', `Error fetching ${route}: ${error?.message}`);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data: any) => {
    setLoading(true);
    try {
      await RouteMap[route]?.create(data);
      fetchData(); // Refresh data after creation
      showAlert('success', `${route} created successfully`);
    } catch (error) {
      console.error(`Error creating ${route}:`, error);
      showAlert('error', `Error creating ${route}: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, data: any) => {
    setLoading(true);
    try {
      await RouteMap[route]?.update(id, data);
      fetchData(); // Refresh data after update
      showAlert('success', `${route} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${route}:`, error);
      showAlert('error', `Error updating ${route}: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      await RouteMap[route]?.delete(id);
      fetchData(); // Refresh data after deletion
      showAlert('success', `${route} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${route}:`, error);
      showAlert('error', `Error deleting ${route}: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (data: any) => {
    if (editForm) {
      updateItem(editForm.id, data); // Update existing item
    } else {
      createItem(data); // Create new item
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const handleEdit = (item: any) => {
    setEditForm(item);
    setShowModal(true);
  };

  const handleFieldChange = async (field: string, value: any) => {
    setEditForm({ ...editForm, [field]: value });
  }

  if (loading) return <DashboardLoader />;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6 mt-16">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            Create {route}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentRoute?.map((item: PersonalInfo | Education | Skill | Contact | Experience | Project | Stat) => (
          <DashboardItem
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <DashboardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={editForm}
        onChange={handleFieldChange}
        route={route}
      />

      <DashboardDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteItem(itemToDelete as string);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}