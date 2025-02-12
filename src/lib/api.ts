import { supabase } from './supabase';
import type { Project, PersonalInfo, Contact, Skill, Stat, Experience, Education } from './types';

// Projects
export const projectsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Project[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Project;
  },

  create: async (project: Omit<Project, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  update: async (id: string, project: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Project;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Personal Info
export const personalInfoApi = {
  get: async () => {
    try {
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data as PersonalInfo;
    } catch (error) {
      console.error('Error fetching personal info:', error);
      return null;
    }
  },

  update: async (info: Partial<PersonalInfo>) => {
    const { data, error } = await supabase
      .from('personal_info')
      .upsert(info)
      .select()
      .single();
    if (error) throw error;
    return data as PersonalInfo;
  }
};

// Education 
export const educationApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Education[];
  },

  create: async (education: Omit<Education, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('education')
      .insert([education])
      .select()
      .single();
    if (error) throw error;
    return data as Education;
  },

  update: async (id: string, education: Partial<Education>) => {
    const { data, error } = await supabase
      .from('education')
      .update(education)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Education;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Contacts
export const contactsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Contact[];
  },

  create: async (contact: Omit<Contact, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
      .single();
    if (error) throw error;
    return data as Contact;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Skills
export const skillsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Skill[];
  },

  create: async (skill: Omit<Skill, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single();
    if (error) throw error;
    return data as Skill;
  },

  update: async (id: string, skill: Partial<Skill>) => {
    const { data, error } = await supabase
      .from('skills')
      .update(skill)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Skill;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Stats
export const statsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Stat[];
  },

  create: async (stat: Omit<Stat, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('stats')
      .insert([stat])
      .select()
      .single();
    if (error) throw error;
    return data as Stat;
  },

  update: async (id: string, stat: Partial<Stat>) => {
    const { data, error } = await supabase
      .from('stats')
      .update(stat)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Stat;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('stats')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};

// Experiences
export const experiencesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Experience[];
  },

  create: async (experience: Omit<Experience, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('experiences')
      .insert([experience])
      .select()
      .single();
    if (error) throw error;
    return data as Experience;
  },

  update: async (id: string, experience: Partial<Experience>) => {
    const { data, error } = await supabase
      .from('experiences')
      .update(experience)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Experience;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
};