import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

interface DashboardItemProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function DashboardItem({ item, onEdit, onDelete }: DashboardItemProps) {
  return (
    <motion.div
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
            onClick={() => onEdit(item)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
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
  );
}