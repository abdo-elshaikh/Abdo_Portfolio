import { Loader2 } from 'lucide-react';

export default function DashboardLoader() {
  return (
    <div className="flex justify-center items-center h-32">
      <Loader2 className="animate-spin h-8 w-8 text-gray-400 dark:text-gray-500" />
    </div>
  );
}