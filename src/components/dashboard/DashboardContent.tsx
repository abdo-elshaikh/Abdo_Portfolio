import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import DashboardItem from './DashboardItem';
import DashboardLoader from './DashboardLoader';

interface DashboardContentProps {
  activeTab: string;
  data: any[];
  loading: boolean;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export default function DashboardContent({
  activeTab,
  data,
  loading,
  onEdit,
  onDelete,
  onAddNew
}: DashboardContentProps) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Manage {activeTab.replace(/_/g, ' ')}
          </h2>
          {activeTab !== 'personal_info' && (
            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add New
            </button>
          )}
        </div>

        {loading ? (
          <DashboardLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400">
                No items found
              </div>
            ) : (
              data.map((item) => (
                <DashboardItem
                  key={item.id}
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}