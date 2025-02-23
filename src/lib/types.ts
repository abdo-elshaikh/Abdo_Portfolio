export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  link?: string;
  created_at: string;
  user_id: string;
}

export interface PersonalInfo {
  id: string;
  user_id: string;
  name: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  phone: string;
  created_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  created_at: string;
}

export interface Stat {
  id: string;
  user_id: string;
  title: string;
  value: number;
  suffix?: string;
  icon: string;
  created_at: string;
}

export interface Experience {
  id: string;
  user_id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  created_at: string;
}

export interface Education {
  id: string;
  user_id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

export interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  isVisible?: boolean;
}

export interface ContactFormProps {
  name: string;
  email: string;
  subjet: string;
  message: string;
}
