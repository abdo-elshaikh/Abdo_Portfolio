import { supabase } from "./supabase";
import type {
  Project,
  PersonalInfo,
  Contact,
  Skill,
  Stat,
  Experience,
  Education,
  Message,
} from "./types";

// Storage API
export const storageApi = {
  upload: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { upsert: true, cacheControl: '3600' });
    if (error) throw error;
    if (data) {
      console.log(data);
    }
    return data;
  },

  replace: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from("portfolio")
      .update(path, file, { upsert: true });
    if (error) throw error;
    return data;
  },

  delete: async (path: string) => {
    const { error } = await supabase.storage.from("portfolio").remove([path]);
    if (error) throw error;
  },
};

// Projects API
export const projectsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Project[];
  },

  create: async (project: Omit<Project, "id" | "created_at" | "user_id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("projects")
      .insert([{ ...project, user_id: user.id }])
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  update: async (id: string, project: Partial<Project>) => {
    const { data, error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Project;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
  },
};

// Education API
export const educationApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Education[];
  },

  create: async (
    education: Omit<Education, "id" | "created_at" | "user_id">,
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("education")
      .insert([{ ...education, user_id: user.id }])
      .select()
      .single();
    if (error) throw error;
    return data as Education;
  },

  update: async (id: string, education: Partial<Education>) => {
    const { data, error } = await supabase
      .from("education")
      .update(education)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Education;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) throw error;
  },
};

// Contacts API
export const contactsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Contact[];
  },

  create: async (contact: Omit<Contact, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("contacts")
      .insert(contact)
      .select()
      .single();
    if (error) throw error;
    console.error(error);
    return data as Contact;
  },

  update: async (id: string, contact: Partial<Contact>) => {
    const { data, error } = await supabase
      .from("contacts")
      .update(contact)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Contact;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) throw error;
  },
};

// Skills API
export const skillsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Skill[];
  },

  create: async (skill: Omit<Skill, "id" | "created_at" | "user_id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("skills")
      .insert([{ ...skill, user_id: user.id }])
      .select()
      .single();
    if (error) throw error;
    return data as Skill;
  },

  update: async (id: string, skill: Partial<Skill>) => {
    const { data, error } = await supabase
      .from("skills")
      .update(skill)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Skill;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) throw error;
  },
};

// Stats API
export const statsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Stat[];
  },

  create: async (stat: Omit<Stat, "id" | "created_at" | "user_id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("stats")
      .insert([{ ...stat, user_id: user.id }])
      .select()
      .single();
    if (error) throw error;
    return data as Stat;
  },

  update: async (id: string, stat: Partial<Stat>) => {
    const { data, error } = await supabase
      .from("stats")
      .update(stat)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Stat;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("stats").delete().eq("id", id);
    if (error) throw error;
  },
};

// Experiences API
export const experiencesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Experience[];
  },

  create: async (
    experience: Omit<Experience, "id" | "created_at" | "user_id">,
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("experiences")
      .insert([{ ...experience, user_id: user.id }])
      .select()
      .single();
    if (error) throw error;
    return data as Experience;
  },

  update: async (id: string, experience: Partial<Experience>) => {
    const { data, error } = await supabase
      .from("experiences")
      .update(experience)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Experience;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) throw error;
  },
};

// Live Chat API
export const liveChatApi = {
  sendMessage: async (message: string): Promise<Message> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            user_id: user.id,
            username: user.email?.split('@')[0] || 'Anonymous',
            message,
            status: 'sent',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  markMessageAsReceived: async (messageId: string): Promise<Message> => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ status: 'delivered' })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return data as Message;
    } catch (error) {
      console.error('Error marking message as received:', error);
      throw error;
    }
  },

  getAllMessages: async (): Promise<Message[]> => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  subscribeToMessages: (callback: (message: Message) => void) => {
    const subscription = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();

    return subscription;
  },

  unsubscribeFromMessages: (subscription: any) => {
    supabase.removeChannel(subscription);
  },

  deleteMessage: async (messageId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },
};

// User API
export const userApi = {
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data;
  },
  passwordRecovery: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  },
  signup: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error;
    return data;
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },
  otpLogin: async (phone: any) => {
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
    return data;
  }
};

// Personal Info API
export const personalInfoApi = {
  get: async () => {
    const { data, error } = await supabase
      .from("personal_info")
      .select("*")
      .single();
    if (error) throw error;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log("user", user, "data", data);
    return data as PersonalInfo;
  },

  update: async (personalInfo: Partial<PersonalInfo>) => {
    const { data, error } = await supabase
      .from("personal_info")
      .upsert(personalInfo)
      .select()
      .single();
    if (error) throw error;
    return data as PersonalInfo;
  },
};
