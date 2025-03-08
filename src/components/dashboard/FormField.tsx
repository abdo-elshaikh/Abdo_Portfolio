import { useState, useRef, useEffect } from "react";
import { UploadCloud, Trash2, RefreshCw, X } from "lucide-react";
import { storageApi } from "../../lib/api";
import { useAlert } from "../../contexts/AlertContext";

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
    handleFileChange?: (field: any, file: File | null) => Promise<void>;
    handleFileDelete?: (field: any) => Promise<void>;
    activeTab: string;
}

export default function FormField({
    field,
    value,
    onChange,
    isSubmitting,
    activeTab,
}: FormFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileUploading, setFileUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const { showAlert } = useAlert();
    const [tagInput, setTagInput] = useState<string>(""); // Input for new tags

    useEffect(() => {
        if (value && field.type === "file") {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value, field.type]);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log("File selected:", file);
        if (field.accept?.includes("image")) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        setFileUploading(true);
        try {
            const base = import.meta.env.VITE_FIREBASE_STORAGE_URL;
            const { fullPath } = await storageApi.upload(file, `${activeTab}/${file.name}`);
            onChange(`${base}/${fullPath}`);
        } catch (error) {
            console.error(`Error handling file:`, error);
        } finally {
            setFileUploading(false);
        }
    };

    const handleFileDelete = async () => {
        setFileUploading(true);
        try {
            await storageApi.delete(value);
            onChange(null);
        } catch (error) {
            console.error(`Error deleting file:`, error);
            showAlert("error", `Error deleting file: ${error?.message}`);
        } finally {
            setFileUploading(false);
        }
    };

    // Handle adding tags
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(tagInput.trim());
        }
    };

    const addTag = (tag: string) => {
        if (tag && !value.includes(tag)) {
            const newTags = [...value, tag];
            onChange(newTags);
        }
        setTagInput("");
    };

    // Handle removing tags
    const removeTag = (tag: string) => {
        const newTags = value.filter((t: string) => t !== tag);
        onChange(newTags);
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
                                className="mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
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
                            <div className="mt-2 p-2 w-16 h-16 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                                {preview}
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            accept={field.accept}
                            onChange={(e) => handleFileInputChange(e)}
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
        case "tags":
            return (
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                        {value?.map((tag: string) => (
                            <div
                                key={tag}
                                className="flex items-center gap-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="focus:outline-none"
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagInputKeyDown}
                            placeholder="Add a tag"
                            className={`flex-1 px-2 py-1 border-none focus:ring-0 bg-transparent dark:bg-transparent dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isSubmitting}
                        />
                    </div>
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