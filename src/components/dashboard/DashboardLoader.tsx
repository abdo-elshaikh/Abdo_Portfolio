
import { Loader2 } from 'lucide-react';

export default function DashboardLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading data...</p>
    </div>
  );
}
