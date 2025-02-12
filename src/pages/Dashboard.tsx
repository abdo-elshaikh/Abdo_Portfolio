import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit2, Trash2, X, User, Briefcase, Mail,
  BarChart, Code2, LogOut, Menu, Loader2, GraduationCap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Project, PersonalInfo, Contact, Skill, Stat, Experience, Education } from '../lib/types';
import ThemeToggle from '../components/ThemeToggle';
import { projectsApi, personalInfoApi, educationApi, skillsApi, experiencesApi, statsApi, contactsApi } from '../lib/api';

type EntityType = 'projects' | 'personal_info' | 'contacts' | 'skills' | 'stats' | 'experiences' | 'education';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<EntityType>('projects');
  const [data, setData] = useState<(Project | PersonalInfo | Contact | Skill | Stat | Experience | Education)[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response: any;
      switch (activeTab) {
        case 'projects': response = await projectsApi.getAll(); break;
        case 'contacts': response = await contactsApi.getAll(); break;
        case 'skills': response = await skillsApi.getAll(); break;
        case 'stats': response = await statsApi.getAll(); break;
        case 'experiences': response = await experiencesApi.getAll(); break;
        case 'education': response = await educationApi.getAll(); break;
        case 'personal_info':
          const data = await personalInfoApi.get();
          response = data ? [data] : [];
          break;
        default: response = { data: [] };
      }
      console.log('Response: ', response);
      setData(response);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: any) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.create(formData); break;
        case 'personal_info': await personalInfoApi.create(formData); break;
        case 'contacts': await contactsApi.create(formData); break;
        case 'skills': await skillsApi.create(formData); break;
        case 'stats': await statsApi.create(formData); break;
        case 'experiences': await experiencesApi.create(formData); break;
        case 'education': await educationApi.create(formData); break;
      }
      fetchData();
    } catch (error) {
      console.error('Create error:', error);
      alert('Error creating item');
    }
  };

  const handleUpdate = async (id: string, formData: any) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.update(id, formData); break;
        case 'personal_info': await personalInfoApi.update(formData); break;
        case 'contacts': await contactsApi.update(id, formData); break;
        case 'skills': await skillsApi.update(id, formData); break;
        case 'stats': await statsApi.update(id, formData); break;
        case 'experiences': await experiencesApi.update(id, formData); break;
        case 'education': await educationApi.update(id, formData); break;
      }
      fetchData();
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating item');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      switch (activeTab) {
        case 'projects': await projectsApi.delete(id); break;
        case 'contacts': await contactsApi.delete(id); break;
        case 'skills': await skillsApi.delete(id); break;
        case 'stats': await statsApi.delete(id); break;
        case 'experiences': await experiencesApi.delete(id); break;
        case 'education': await educationApi.delete(id); break;
      }
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting item');
    } finally {
      setItemToDelete(null);
    }
  };

  const formatLabel = (str: string) => {
    return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const getFormFields = () => {
    const fields = {
      projects: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'description', type: 'textarea', label: 'Description', required: true },
        { name: 'image_url', type: 'url', label: 'Image URL', required: true },
        { name: 'tags', type: 'tags', label: 'Tags' },
        { name: 'link', type: 'url', label: 'Project Link' },
        { name: 'is_featured', type: 'checkbox', label: 'Featured Project' }
      ],
      personal_info: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'description', type: 'textarea', label: 'Description', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'phone', type: 'tel', label: 'Phone' },
        { name: 'location', type: 'text', label: 'Location' },
        { name: 'avatar_url', type: 'url', label: 'Avatar URL', required: true }
      ],
      education: [
        { name: 'degree', type: 'text', label: 'Degree', required: true },
        { name: 'institution', type: 'text', label: 'Institution', required: true },
        { name: 'period', type: 'text', label: 'Period', required: true },
        { name: 'description', type: 'textarea', label: 'Description' }
      ],
      contacts: [
        { name: 'name', type: 'text', label: 'Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'message', type: 'textarea', label: 'Message', required: true }
      ],
      skills: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'icon', type: 'text', label: 'Icon', required: true },
        { name: 'technologies', type: 'tags', label: 'Technologies' }
      ],
      stats: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'value', type: 'number', label: 'Value', required: true },
        { name: 'suffix', type: 'text', label: 'Suffix' },
        { name: 'icon', type: 'text', label: 'Icon', required: true }
      ],
      experiences: [
        { name: 'role', type: 'text', label: 'Role', required: true },
        { name: 'company', type: 'text', label: 'Company', required: true },
        { name: 'period', type: 'text', label: 'Period', required: true },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'technologies', type: 'tags', label: 'Technologies' }
      ]
    };
    return fields[activeTab] || [];
  };

  const renderField = (field: any) => {
    const value = editForm[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={e => setEditForm({ ...editForm, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={4}
            required={field.required}
          />
        );
      case 'tags':
        return (
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : value}
            onChange={e => setEditForm({
              ...editForm,
              [field.name]: e.target.value.split(',').map((tag: string) => tag.trim())
            })}
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Comma-separated values"
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={e => setEditForm({ ...editForm, [field.name]: e.target.checked })}
            className="h-5 w-5 text-indigo-600 dark:text-indigo-400 rounded border-gray-300 focus:ring-indigo-500"
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={e => setEditForm({ ...editForm, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required={field.required}
          />
        );
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'personal_info', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'skills', label: 'Skills', icon: Briefcase },
    { id: 'stats', label: 'Stats', icon: BarChart },
    { id: 'experiences', label: 'Experiences', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-white dark:bg-gray-800 z-40 transparent"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4 pt-16">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as EntityType);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === tab.id} ${'bg-indigo-600 text-white'}`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 pb-8 container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <nav className="hidden lg:block col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as EntityType)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Manage {formatLabel(activeTab)}
                </h2>
                {activeTab !== 'personal_info' && (
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setEditForm({});
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                    Add New
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="animate-spin h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data?.length === 0 ? (
                    <div className="text-center text-gray-600 dark:text-gray-400">
                      No items found
                    </div>
                  ) : (
                    data?.map((item: any) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {item.title || item.name}
                          </h3>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => {
                                setIsModalOpen(true);
                                setIsEditing(item.id);
                                setEditForm(item);
                              }}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => setItemToDelete(item.id)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description || item.message || item.period}
                        </p>
                        {item.tags && (
                          <div className="flex items-center gap-2 mt-2">
                            {item.tags.map((tag: string) => (
                              <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isEditing) {
                    handleUpdate(isEditing, editForm);
                  } else {
                    handleCreate(editForm);
                  }
                  setIsModalOpen(false);
                  setIsEditing(null);
                }}
                className="p-6 space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold dark:text-white">
                    {isEditing ? 'Edit' : 'Create'} {formatLabel(activeTab)}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEditing(null);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {getFormFields().map((field) => (
                    <div
                      key={field.name}
                      className={`space-y-2 ${field.type === 'textarea' || field.type === 'tags' ? 'md:col-span-2' : ''}`}
                    >
                      <label className="block text-sm font-medium dark:text-gray-300">
                        {field.label}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEditing(null);
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    {isEditing ? 'Save Changes' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold dark:text-white mb-4">
                  Confirm Delete
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setItemToDelete(null)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(itemToDelete);
                      setItemToDelete(null);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}