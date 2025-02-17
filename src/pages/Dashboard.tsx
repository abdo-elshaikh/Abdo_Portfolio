import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardContent from '../components/dashboard/DashboardContent';
import DashboardModal from '../components/dashboard/DashboardModal';
import DashboardDeleteModal from '../components/dashboard/DashboardDeleteModal';
import { projectsApi, personalInfoApi, educationApi, skillsApi, experiencesApi, statsApi, contactsApi } from '../lib/api';
import { Project, Education, Contact, Experience, PersonalInfo, Skill, Stat } from '../lib/types';
import Alert from '../components/Alert';

type EntityType = 'projects' | 'personal_info' | 'education' | 'contacts' | 'skills' | 'stats' | 'experiences';

type AlertType = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<EntityType>('projects');
  const [data, setData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const navigate = useNavigate();

  // Fetch data when activeTab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Fetch data based on activeTab
  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'projects': {
          const projects = await projectsApi.getAll();
          setData(projects);
          break;
        }
        case 'personal_info': {
          const info = await personalInfoApi.get();
          console.log('info:', info);
          setData(info ? [info] : []);
          break;
        }
        case 'education': {
          const education = await educationApi.getAll();
          setData(education);
          break;
        }
        case 'contacts': {
          const contacts = await contactsApi.getAll();
          setData(contacts);
          break;
        }
        case 'skills': {
          const skills = await skillsApi.getAll();
          setData(skills);
          break;
        }
        case 'stats': {
          const stats = await statsApi.getAll();
          setData(stats);
          break;
        }
        case 'experiences': {
          const experiences = await experiencesApi.getAll();
          setData(experiences);
          break;
        }
        default: break;
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch data. Please try again.' });
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss alert after 5 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Handle create/update operations
  const handleCreateUpdate = async (formData: any) => {
    try {
      if (isEditing) {
        await handleUpdate(isEditing, formData);
      } else {
        await handleCreate(formData);
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Operation failed. Please try again.' });
      console.error('Operation error:', error);
    }
  };

  // Handle create operations
  const handleCreate = async (formData: any) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.create(formData); break;
        case 'personal_info': await personalInfoApi.update(formData); break;
        case 'education': await educationApi.create(formData); break;
        case 'contacts': await contactsApi.create(formData); break;
        case 'skills': await skillsApi.create(formData); break;
        case 'stats': await statsApi.create(formData); break;
        case 'experiences': await experiencesApi.create(formData); break;
        default: break;
      }
      setAlert({ type: 'success', message: 'Item created successfully.' });
      setIsModalOpen(false);
      setEditForm({});
      setIsEditing(null);
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  // Handle update operations
  const handleUpdate = async (id: string, formData: any) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.update(id, formData); break;
        case 'personal_info': await personalInfoApi.update(formData); break;
        case 'education': await educationApi.update(id, formData); break;
        case 'contacts': await contactsApi.update(id, formData); break;
        case 'skills': await skillsApi.update(id, formData); break;
        case 'stats': await statsApi.update(id, formData); break;
        case 'experiences': await experiencesApi.update(id, formData); break;
        default: break;
      }
      setAlert({ type: 'success', message: 'Item updated successfully.' });
      setIsModalOpen(false);
      setEditForm({});
      setIsEditing(null);
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  // Handle delete operations
  const handleDelete = async (id: string) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.delete(id); break;
        case 'education': await educationApi.delete(id); break;
        case 'contacts': await contactsApi.delete(id); break;
        case 'skills': await skillsApi.delete(id); break;
        case 'stats': await statsApi.delete(id); break;
        case 'experiences': await experiencesApi.delete(id); break;
        default: break;
      }
      setAlert({ type: 'success', message: 'Item deleted successfully.' });
      setItemToDelete(null);
      fetchData();
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete item. Please try again.' });
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Alert Component */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <DashboardHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onLogout={async () => {
          await supabase.auth.signOut();
          navigate('/auth');
        }}
      />

      <main className="pt-20 pb-8 container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-6">
          <DashboardSidebar
            activeTab={activeTab}
            isMobileMenuOpen={isMobileMenuOpen}
            onTabChange={(tab) => setActiveTab(tab as EntityType)}
            onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
          />

          <DashboardContent
            activeTab={activeTab}
            data={data}
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
        </div>
      </main>

      <DashboardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(null);
          setEditForm({});
        }}
        isEditing={!!isEditing}
        activeTab={activeTab}
        editForm={editForm}
        onFormSubmit={handleCreateUpdate}
        onFormChange={(field, value) => setEditForm({ ...editForm, [field]: value })}
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