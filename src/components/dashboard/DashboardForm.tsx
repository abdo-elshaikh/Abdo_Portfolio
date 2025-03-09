import { useMemo } from "react";
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
import FormField from "./FormField";

interface DashboardFormProps {
    activeTab: string;
    editForm: any;
    onFormChange: (field: string, value: any) => void;
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
}: DashboardFormProps) {
    const fields: FieldsConfig = useMemo(() => ({
        projects: [
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "image_url", type: "file", label: `Image: ${editForm?.image_url}`, accept: "image/*" },
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
            { name: "avatar_url", type: "file", label: `Avatar: ${editForm?.avatar_url}`, accept: "image/*" },
            { name: "resume_url", type: "file", label: `Resume: ${editForm?.resume_url}`, accept: ".pdf,.doc,.docx", icon: <Notebook className="w-5 h-5" /> },
            { name: "facebook_url", type: "url", label: "Facebook", icon: <Facebook className="w-5 h-5" /> },
            { name: "github_url", type: "url", label: "GitHub", icon: <Github className="w-5 h-5" /> },
            { name: "linkedin_url", type: "url", label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
            { name: "twitter_url", type: "url", label: "Twitter", icon: <Twitter className="w-5 h-5" /> },
            { name: "website_url", type: "url", label: "Website", icon: <Globe className="w-5 h-5" /> },
        ],
        skills: [
            { name: "title", type: "text", label: "Title", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "icon", type: "text", label: "Icon", required: true },
            { name: "technologies", type: "tags", label: "Technologies" },
        ],
        experiences: [
            { name: "period", type: "text", label: "Period", required: true },
            { name: "role", type: "text", label: "Role", required: true },
            { name: "company", type: "text", label: "Company", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
            { name: "technologies", type: "tags", label: "Technologies" },
        ],
        education: [
            { name: "period", type: "text", label: "Period", required: true },
            { name: "degree", type: "text", label: "Degree", required: true },
            { name: "institution", type: "text", label: "Institution", required: true },
            { name: "description", type: "textarea", label: "Description", required: true },
        ],
        contacts: [
            { name: "name", type: "text", label: "Name", required: true },
            { name: "email", type: "email", label: "Email", required: true, icon: <Mail className="w-5 h-5" /> },
            { name: "phone", type: "tel", label: "Phone", icon: <Phone className="w-5 h-5" /> },
            { name: "subject", type: "text", label: "Subject", required: true },
            { name: "message", type: "textarea", label: "Message", required: true },
        ],
        stats: [
            { name: "title", type: "text", label: "Title", required: true },
            { name: "value", type: "text", label: "Value", required: true },
            { name: "suffix", type: "text", label: "Suffix" },
            { name: "icon", type: "text", label: "Icon" },
        ],
    }), [editForm]);

    if (!fields[activeTab]) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-2xl font-bold">No fields available</p>
                <p>Please select a different tab</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {fields[activeTab]?.map((field) => (
                <FormField
                    key={field?.name}
                    field={field}
                    value={editForm[field?.name]}
                    onChange={(value) => onFormChange(field.name, value)}
                    activeTab={activeTab}
                />
            ))}
        </div>
    );
}