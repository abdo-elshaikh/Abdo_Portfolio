
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

interface DashboardItemProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function DashboardItem({ item, onEdit, onDelete }: DashboardItemProps) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600">
      <div className="flex items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-w-0"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
            {item.title || item.name}
          </h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
            {item.description || item.message || item.period}
          </p>
          {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.type === 'tags' ? <span className="text-sm font-semibold text-gray-500">Tags:</span> : null}
              {item.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-sm rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
            aria-label="Edit item"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
            aria-label="Delete item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
