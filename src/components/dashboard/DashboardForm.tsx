import { useMemo, useState, useRef, useEffect } from "react";
import {
    Facebook,
    Github,
    Linkedin,
    Twitter,
    Globe,
    Mail,
    Phone,
    MapPin,
    Notebook,
    MessageCircleCode,
    UploadCloud,
    Trash2,
    RefreshCw,
} from "lucide-react";

interface DashboardFormProps {
    activeTab: string;
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
    errors?: Record<string, string>;
    isSubmitting?: boolean;
    fileUploading?: boolean;
    handleFileChange?: (field: string, file: File | null) => Promise<void>;
    handleFileDelete?: (field: string) => Promise<void>;
}

interface FieldConfig {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
    accept?: string;
}

interface FieldsConfig {
    [key: string]: FieldConfig[];
}

export default function DashboardForm({
    activeTab,
    editForm,
    onFormChange,
    errors = {},
    isSubmitting = false,
    fileUploading = false,
    handleFileChange,
    handleFileDelete,
}: DashboardFormProps) {
    const fields: FieldsConfig = useMemo(() => ({
        projects: [
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "image_url", type: "file", label: "Image", accept: "image/*" },
            { name: "tags", type: "tags", label: "Tags" },
            { name: "link", type: "url", label: "Project Link" },
            { name: "is_featured", type: "checkbox", label: "Featured Project" },
        ],
        personal_info: [
            { name: "name", type: "text", label: "Name", required: true },
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "email", type: "email", label: "Email", required: true, icon: <Mail className="w-5 h-5" /> },
            { name: "phone", type: "tel", label: "Phone", icon: <Phone className="w-5 h-5" /> },
            { name: "whatsapp", type: "tel", label: "WhatsApp", icon: <MessageCircleCode className="w-5 h-5" /> },
            { name: "location", type: "text", label: "Location", icon: <MapPin className="w-5 h-5" /> },
            { name: "avatar_url", type: "file", label: "Avatar", accept: "image/*" },
            { name: "resume_url", type: "file", label: "Resume", accept: ".pdf,.doc,.docx", icon: <Notebook className="w-5 h-5" /> },
            { name: "facebook_url", type: "url", label: "Facebook", icon: <Facebook className="w-5 h-5" /> },
            { name: "github_url", type: "url", label: "GitHub", icon: <Github className="w-5 h-5" /> },
            { name: "linkedin_url", type: "url", label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
            { name: "twitter_url", type: "url", label: "Twitter", icon: <Twitter className="w-5 h-5" /> },
            { name: "website_url", type: "url", label: "Website", icon: <Globe className="w-5 h-5" /> },
        ],
        // ... other field configurations
    }), []);

    if (!fields[activeTab]) {
        return <div className="text-red-500">Invalid tab selected.</div>;
    }

    return (
        <div className="space-y-6">
            {fields[activeTab].map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={editForm[field.name]}
                    onChange={(value) => onFormChange(field.name, value)}
                    error={errors[field.name]}
                    isSubmitting={isSubmitting || fileUploading}
                    handleFileChange={handleFileChange ?
                        (file) => handleFileChange(field.name, file) : undefined
                    }
                    handleFileDelete={handleFileDelete ?
                        () => handleFileDelete(field.name) : undefined
                    }
                />
            ))}
        </div>
    );
}

interface FormFieldProps {
    field: FieldConfig;
    value: any;
    onChange: (value: any) => void;
    error?: string;
    isSubmitting?: boolean;
    handleFileChange?: (file: File | null) => Promise<void>;
    handleFileDelete?: () => Promise<void>;
}

function FormField({
    field,
    value,
    onChange,
    error,
    isSubmitting,
    handleFileChange,
    handleFileDelete,
}: FormFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (handleFileChange) {
            await handleFileChange(file);
        }
    };

    switch (field.type) {
        case "file":
            return (
                <FileInput
                    label={field.label}
                    value={value}
                    onChange={handleFileChange!}
                    onDelete={handleFileDelete!}
                    error={error}
                    disabled={isSubmitting}
                    accept={field.accept}
                    icon={field.icon}
                />
            );
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
                        className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        rows={4}
                        disabled={isSubmitting}
                    />
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isSubmitting}
                    />
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>
            );
        case "checkbox":
            return (
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        className={`w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-blue-500 dark:border-gray-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isSubmitting}
                    />
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                        {field.label}
                    </label>
                </div>
            );
        case "url":
        case "email":
        case "tel":
        case "text":
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
                            className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${field.icon ? "pl-10" : ""
                                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isSubmitting}
                        />
                        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
                            className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                                } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 ${field.icon ? "pl-10" : ""
                                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={isSubmitting}
                        />
                        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    </div>
                </div>
            );
    }
}

function FileInput({
    label,
    value,
    onChange,
    onDelete,
    error,
    disabled,
    accept,
    icon,
}: {
    label: string;
    value: string;
    onChange: (file: File | null) => Promise<void>;
    onDelete: () => Promise<void>;
    error?: string;
    disabled?: boolean;
    accept?: string;
    icon?: React.ReactNode;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value]);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        await onChange(file);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <div className="relative group">
                {preview ? (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full"
                                disabled={disabled}
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full"
                                disabled={disabled}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`border-2 border-dashed ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={() => !disabled && inputRef.current?.click()}
                    >
                        {icon || <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {disabled ? "Uploading..." : "Click to upload"}
                        </span>
                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileInputChange}
                            disabled={disabled}
                            accept={accept}
                        />
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}