import { useState, useRef, useEffect } from "react";
import { UploadCloud, Trash2, RefreshCw } from "lucide-react";

interface FormFieldProps {
    field: {
        name: string;
        type: string;
        label: string;
        required?: boolean;
        icon?: React.ReactNode;
        accept?: string;
    };
    value: any;
    onChange: (value: any) => void;
    isSubmitting?: boolean;
    handleFileChange?: (file: File | null) => Promise<void>;
    handleFileDelete?: () => Promise<void>;
}

export default function FormField({
    field,
    value,
    onChange,
    isSubmitting,
    handleFileChange,
    handleFileDelete,
}: FormFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (value && field.type === "file") {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value, field.type]);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (handleFileChange) {
            await handleFileChange(file);
        }
    };

    const handleTagInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(",");
        onChange(tags);
    };

    switch (field.type) {
        case "file":
            if (field.accept?.includes("image")) {
                return (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className={`flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={isSubmitting}
                            >
                                <UploadCloud size={18} />
                                <span>Upload</span>
                            </button>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleFileDelete}
                                    className={`flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={isSubmitting}
                                >
                                    <Trash2 size={18} />
                                    <span>Delete</span>
                                </button>
                            )}
                        </div>
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full mt-2 rounded-md shadow-sm"
                            />
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            accept={field.accept}
                            onChange={handleFileInputChange}
                            className="hidden"
                            disabled={isSubmitting}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className={`flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={isSubmitting}
                            >
                                <UploadCloud size={18} />
                                <span>Upload</span>
                            </button>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleFileDelete}
                                    className={`flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={isSubmitting}
                                >
                                    <RefreshCw size={18} />
                                    <span>Reset</span>
                                </button>
                            )}
                        </div>
                        {preview && (
                            <div className="mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                                {preview}
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            accept={field.accept}
                            onChange={handleFileInputChange}
                            className="hidden"
                            disabled={isSubmitting}
                        />
                    </div>
                );
            }
        case "textarea":
            return (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        rows={4}
                        disabled={isSubmitting}
                    />
                </div>
            );
        case "checkbox":
            return (
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        className={`w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-blue-500 dark:border-gray-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                        {field.label}
                    </label>
                </div>
            );
        case "select":
            return (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    >
                        {field?.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            );
        case "tags":
            return (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleTagInputChange(e)}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Press enter to add a tag
                    </p>
                </div>
            );
        case "url":
            return (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                        type="url"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    />
                </div>
            );
        default:
            return (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                        {field.icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                {field.icon}
                            </div>
                        )}
                        <input
                            type={field.type}
                            value={value || ""}
                            onChange={(e) => onChange(e.target.value)}
                            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${field.icon ? "pl-10" : ""} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            );
    }
}
