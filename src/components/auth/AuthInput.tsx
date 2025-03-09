import { LucideIcon } from "lucide-react";

interface AuthInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: LucideIcon;
  required?: boolean;
}

export default function AuthInput({
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}: AuthInputProps) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type={type}
        autoComplete="off"
        value={value}
        onChange={onChange}
        className="pl-10 w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}