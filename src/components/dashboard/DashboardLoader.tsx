import { Loader2 } from 'lucide-react';

export default function DashboardLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 size="80" />
      <p className="text-lg ml-4">Loading...</p>
    </div>
  );
}
