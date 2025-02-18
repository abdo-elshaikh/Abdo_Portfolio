
import { motion } from 'framer-motion';
import { Plus, AlertTriangle } from 'lucide-react';
import DashboardItem from './DashboardItem';
import DashboardLoader from './DashboardLoader';

interface DashboardContentProps {
  activeTab: string;
  data: any[];
  loading: boolean;
  error?: string;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export default function DashboardContent({
  activeTab,
  data,
  loading,
  error,
  onEdit,
  onDelete,
  onAddNew
}: DashboardContentProps) {
  const renderContent = () => {
    if (loading) return <DashboardLoader />;
    if (error) return (
      <div className="flex items-center justify-center gap-2 text-red-500">
        <AlertTriangle size={20} />
        <p>{error}</p>
      </div>
    );
    if (data.length === 0) return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-gray-600 dark:text-gray-400">No items found</p>
        {activeTab !== 'personal_info' && (
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add First Item
          </button>
        )}
      </div>
    );

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {data.map((item) => (
          <DashboardItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Manage {activeTab.replace(/_/g, ' ')}
          </h2>
          {activeTab !== 'personal_info' && !loading && !error && data.length > 0 && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add New
            </button>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
