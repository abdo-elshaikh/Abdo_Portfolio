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
import { Project, Education, Contact, Experience, PersonalInfo, Skill, Stat, User } from '../lib/types';

type EntityType = 'projects' | 'personal_info' | 'education' | 'contacts' | 'skills' | 'stats' | 'experiences';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = [];
        switch (activeTab) {
          case 'projects': response = await projectsApi.getAll(); break;
          case 'personal_info':
            const data = await personalInfoApi.get();
            response = data ? [data] : [];
            break;
          case 'education': response = await educationApi.getAll(); break;
          case 'contacts': response = await contactsApi.getAll(); break;
          case 'skills': response = await skillsApi.getAll(); break;
          case 'stats': response = await statsApi.getAll(); break;
          case 'experiences': response = await experiencesApi.getAll(); break;
          default: response = [];
        }
        setData(response || []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleCreateUpdate = async (formData: any) => {
    try {
      if (isEditing) {
        await handleUpdate(isEditing, formData);
      } else {
        await handleCreate(formData);
      }
    } catch (error) {
      console.error('Operation error:', error);
    }
  };

  const handleCreate = async (formData: any) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.create(formData); break;
        case 'personal_info': await personalInfoApi.create(formData); break;
        case 'education': await educationApi.create(formData); break;
        case 'contacts': await contactsApi.create(formData); break;
        case 'skills': await skillsApi.create(formData); break;
        case 'stats': await statsApi.create(formData); break;
        case 'experiences': await experiencesApi.create(formData); break;
        default: break;
      }
      setIsModalOpen(false);
      setEditForm({});
      setIsEditing(null);
    } catch (error) {
      console.error('Create error:', error);
    }
  };

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
      setIsModalOpen(false);
      setEditForm({});
      setIsEditing(null);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

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
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            setItemToDelete(null);
          }
        }
        }
      />
    </div>
  );
}