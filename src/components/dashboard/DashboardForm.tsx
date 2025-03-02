import { useMemo, useState } from "react";
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
} from "lucide-react";

// Define the props interface for the DashboardForm component
interface DashboardFormProps {
    activeTab: string;
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
    errors?: Record<string, string>; // Validation errors
    isSubmitting?: boolean; // Loading state
}

// Define the structure of a field configuration
interface FieldConfig {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    icon?: React.ReactNode;
}

// Define the structure of the fields configuration object
interface FieldsConfig {
    [key: string]: FieldConfig[];
}

// Main DashboardForm component
export default function DashboardForm({
    activeTab,
    editForm,
    onFormChange,
    errors = {},
    isSubmitting = false,
}: DashboardFormProps) {
    // Memoize the fields configuration to prevent unnecessary re-renders
    const fields: FieldsConfig = useMemo(
        () => ({
            projects: [
                { name: "title", type: "text", label: "Title", required: true },
                {
                    name: "description",
                    type: "textarea",
                    label: "Description",
                    required: true,
                },
                {
                    name: "image_url",
                    type: "url",
                    label: "Image URL",
                    required: true,
                },
                { name: "tags", type: "tags", label: "Tags" },
                { name: "link", type: "url", label: "Project Link" },
                {
                    name: "is_featured",
                    type: "checkbox",
                    label: "Featured Project",
                },
            ],
            personal_info: [
                { name: "name", type: "text", label: "Name", required: true },
                { name: "title", type: "text", label: "Title", required: true },
                {
                    name: "description",
                    type: "textarea",
                    label: "Description",
                    required: true,
                },
                {
                    name: "email",
                    type: "email",
                    label: "Email",
                    required: true,
                    icon: <Mail className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "phone",
                    type: "tel",
                    label: "Phone",
                    icon: <Phone className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "whatsapp",
                    type: "tel",
                    label: "Whatsapp",
                    icon: <MessageCircleCode className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "location",
                    type: "text",
                    label: "Location",
                    icon: <MapPin className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "avatar_url",
                    type: "url",
                    label: "Avatar URL",
                    required: true,
                },
                {
                    name: "resume_url",
                    type: "url",
                    label: "Resume URL",
                    icon: <Notebook className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "facebook_url",
                    type: "url",
                    label: "Facebook Link",
                    icon: <Facebook className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "github_url",
                    type: "url",
                    label: "Github URL",
                    icon: <Github className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "linkedin_url",
                    type: "url",
                    label: "Linkedin URL",
                    icon: <Linkedin className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "twitter_url",
                    type: "url",
                    label: "Twitter URL",
                    icon: <Twitter className="w-5 h-5 text-gray-500" />,
                },
                {
                    name: "website_url",
                    type: "url",
                    label: "Website URL",
                    icon: <Globe className="w-5 h-5 text-gray-500" />,
                },
            ],
            education: [
                { name: "degree", type: "text", label: "Degree", required: true },
                {
                    name: "institution",
                    type: "text",
                    label: "Institution",
                    required: true,
                },
                { name: "period", type: "text", label: "Period", required: true },
                { name: "description", type: "textarea", label: "Description" },
            ],
            contacts: [
                { name: "name", type: "text", label: "Name", required: true },
                { name: "email", type: "email", label: "Email", required: true },
                {
                    name: "message",
                    type: "textarea",
                    label: "Message",
                    required: true,
                },
            ],
            skills: [
                { name: "title", type: "text", label: "Title", required: true },
                {
                    name: "description",
                    type: "textarea",
                    label: "Description",
                    required: true,
                },
                { name: "icon", type: "text", label: "Icon", required: true },
                { name: "technologies", type: "tags", label: "Technologies" },
            ],
            stats: [
                { name: "title", type: "text", label: "Title", required: true },
                { name: "value", type: "number", label: "Value", required: true },
                { name: "suffix", type: "text", label: "Suffix" },
                { name: "icon", type: "text", label: "Icon", required: true },
            ],
            experiences: [
                { name: "role", type: "text", label: "Role", required: true },
                { name: "company", type: "text", label: "Company", required: true },
                { name: "period", type: "text", label: "Period", required: true },
                { name: "description", type: "textarea", label: "Description" },
            ],
        }),
        []
    );

    // Handle invalid activeTab
    if (!fields[activeTab]) {
        return <div>Invalid tab selected.</div>;
    }

    return (
        <div className="space-y-4">
            {fields[activeTab].map((field) => (
                <div key={field.name} className="space-y-2">
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {field.label}
                        {field.required && (
                            <span className="text-red-500">*</span>
                        )}
                    </label>
                    <div className="relative">
                        {field.icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {field.icon}
                            </div>
                        )}
                        <FieldInput
                            field={field}
                            editForm={editForm}
                            onFormChange={onFormChange}
                            hasIcon={!!field.icon}
                            error={errors[field.name]}
                            isSubmitting={isSubmitting}
                        />
                        {errors[field.name] && (
                            <p id={`${field.name}-error`} className="text-sm text-red-500 mt-1">
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Props interface for the FieldInput component
interface FieldInputProps {
    field: FieldConfig;
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
    hasIcon?: boolean;
    error?: string;
    isSubmitting?: boolean;
}

function TagsInput({
    value,
    onChange,
    disabled,
}: {
    value?: string[]; // Make value optional
    onChange: (tags: string[]) => void;
    disabled?: boolean;
}) {
    const [inputValue, setInputValue] = useState("");

    // Default to an empty array if value is undefined or null
    const tags = value || [];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab" && inputValue) {
            e.preventDefault();
            onChange([...tags, inputValue]);
            setInputValue("");
        } else if (e.key === "Backspace" && !inputValue) {
            onChange(tags.slice(0, tags.length - 1));
        }
    }

    const removeTag = (tag: string) => {
        onChange(tags.filter((t) => t !== tag));
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md">
            {tags.map((tag) => (
                <div
                    key={tag}
                    className="flex items-center bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        disabled={disabled}
                        aria-label={`Remove tag ${tag}`}
                    >
                        &times;
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none"
                placeholder="Add a tag..."
                disabled={disabled}
                aria-label="Add a tag"
            />
        </div>
    );
}

function FieldInput({
    field,
    editForm,
    onFormChange,
    hasIcon,
    error,
    isSubmitting,
}: FieldInputProps) {
    const value = editForm[field.name] || "";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onFormChange(field.name, e.target.value);

    const commonClasses = `block w-full mt-1 px-3 py-2 border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${hasIcon ? "pl-10" : ""
        } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`;

    switch (field.type) {
        case "textarea":
            return (
                <textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={handleChange}
                    className={commonClasses}
                    rows={4}
                    disabled={isSubmitting}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                />
            );
        case "checkbox":
            return (
                <div className="flex items-center">
                    <input
                        id={field.name}
                        name={field.name}
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                            onFormChange(field.name, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={isSubmitting}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${field.name}-error` : undefined}
                    />
                    <label
                        htmlFor={field.name}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                        {field.label}
                    </label>
                </div>
            );
        case "tags":
            return (
                <TagsInput
                    value={Array.isArray(value) ? value : []} // Ensure value is an array
                    onChange={(tags) => onFormChange(field.name, tags)}
                    disabled={isSubmitting}
                />
            );
        default:
            return (
                <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={value}
                    onChange={handleChange}
                    className={commonClasses}
                    disabled={isSubmitting}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                />
            );
    }
}