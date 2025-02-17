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
    };

    return (
        <div className="space-y-4">
            {fields[activeTab]?.map((field) => (
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

function FieldInput({
    field,
    editForm,
    onFormChange,
}: {
    field: { name: string; type: string; label: string; required?: boolean };
    editForm: Record<string, any>;
    onFormChange: (field: string, value: any) => void;
}) {
    const commonClasses =
        "block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-indigo-500 dark:focus:border-indigo-500";

    if (field.type === "checkbox") {
        return (
            <input
                id={field.name}
                type="checkbox"
                checked={editForm[field.name] ?? false}
                onChange={(e) => onFormChange(field.name, e.target.checked)}
                className="block mt-1"
            />
        );
    }

    if (field.type === "textarea") {
        return (
            <textarea
                id={field.name}
                value={editForm[field.name] || ""}
                onChange={(e) => onFormChange(field.name, e.target.value)}
                required={field.required}
                className={commonClasses}
            />
        );
    }

    return (
        <input
            id={field.name}
            type={field.type}
            value={editForm[field.name] || ""}
            onChange={(e) => onFormChange(field.name, e.target.value)}
            required={field.required}
            className={commonClasses}
        />
    );
}
