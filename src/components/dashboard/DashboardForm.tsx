interface DashboardFormProps {
    activeTab: string;
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
}

export default function DashboardForm({ activeTab, editForm, onFormChange }: DashboardFormProps) {
    const fields: Record<string, { name: string; type: string; label: string; required?: boolean }[]> = {
        projects: [
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "image_url", type: "url", label: "Image URL", required: true },
            { name: "tags", type: "tags", label: "Tags" },
            { name: "link", type: "url", label: "Project Link" },
            { name: "is_featured", type: "checkbox", label: "Featured Project" },
        ],
        personal_info: [
            { name: "name", type: "text", label: "Name", required: true },
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "email", type: "email", label: "Email", required: true },
            { name: "phone", type: "tel", label: "Phone" },
            { name: "location", type: "text", label: "Location" },
            { name: "avatar_url", type: "url", label: "Avatar URL", required: true },
        ],
        education: [
            { name: "degree", type: "text", label: "Degree", required: true },
            { name: "institution", type: "text", label: "Institution", required: true },
            { name: "period", type: "text", label: "Period", required: true },
            { name: "description", type: "textarea", label: "Description" },
        ],
        contacts: [
            { name: "name", type: "text", label: "Name", required: true },
            { name: "email", type: "email", label: "Email", required: true },
            { name: "message", type: "textarea", label: "Message", required: true },
        ],
        skills: [
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
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
                <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <FieldInput field={field} editForm={editForm} onFormChange={onFormChange} />
                </div>
            ))}
        </div>
    );
}

interface FieldInputProps {
    field: { name: string; type: string; label: string; required?: boolean };
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
}

function FieldInput({ field, editForm, onFormChange }: FieldInputProps) {
    const value = editForm[field.name] || "";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onFormChange(field.name, e.target.value);

    switch (field.type) {
        case "textarea":
            return (
                <textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={handleChange}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    dark:bg-gray-800 dark:text-gray-300"
                />
            );
        case "tags":
            return (
                <input
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={handleChange}
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    dark:bg-gray-800 dark:text-gray-300"
                />
            );
        case "checkbox":
            return (
                <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onFormChange(field.name, e.target.checked)}
                    className="block mt-1"
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
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    dark:bg-gray-800 dark:text-gray-300"
                />
            );
    }
}