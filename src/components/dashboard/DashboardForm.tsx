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
} from "lucide-react";
import { useState } from "react";

interface DashboardFormProps {
    activeTab: string;
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
    errors?: Record<string, string>; // Validation errors
    isSubmitting?: boolean; // Loading state
}

export default function DashboardForm({
    activeTab,
    editForm,
    onFormChange,
    errors = {},
    isSubmitting = false,
}: DashboardFormProps) {
    const fields: Record<
        string,
        {
            name: string;
            type: string;
            label: string;
            required?: boolean;
            icon?: React.ReactNode;
        }[]
    > = {
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
                icone: <Notebook className="w-5 h-5 text-gray-500" />,
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
    };

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
                            <p className="text-sm text-red-500 mt-1">
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

interface FieldInputProps {
    field: { name: string; type: string; label: string; required?: boolean };
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
    hasIcon?: boolean;
    error?: string;
    isSubmitting?: boolean;
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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onFormChange(field.name, e.target.value);

    const commonClasses = `block w-full mt-1 px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300 ${
        hasIcon ? "pl-10" : ""
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
                    value={value}
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
                />
            );
    }
}

// Tags Input Component
function TagsInput({
    value,
    onChange,
    disabled,
}: {
    value: string[];
    onChange: (tags: string[]) => void;
    disabled?: boolean;
}) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            onChange([...value, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md">
            {value.map((tag) => (
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
            />
        </div>
    );
}
