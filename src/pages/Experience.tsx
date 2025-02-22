import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Experience } from '../lib/types';

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-2 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Briefcase className="text-primary-600" />
            Work Experience
          </motion.h2>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative border-l-2 border-primary-600 dark:border-primary-400 ml-3">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className="mb-12 ml-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="absolute -left-9 mt-2">
                    <div className="bg-primary-600 dark:bg-primary-400 rounded-full p-2 shadow-lg">
                      <Building2 className="w-6 h-6 text-white"/>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {experience.role}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {experience.company}
                        </p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{experience.period}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}