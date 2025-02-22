import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Building2,
  ChevronRight,
  Code2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Experience } from "../lib/types";

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="space-y-8 w-full max-w-4xl px-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-transparent mb-4">
              Professional Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A timeline of my career progression and professional achievements
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-primary-500/20 to-transparent dark:from-primary-900/30 transform -translate-x-1/2" />

            <div className="space-y-16">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className="relative flex flex-col md:grid md:grid-cols-5 gap-8 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute md:relative left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 z-10" />

                  <div className="md:col-span-2 text-center md:text-right pt-2">
                    <motion.div
                      className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/20 px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {experience.period}
                      </span>
                    </motion.div>
                  </div>

                  <motion.article
                    className="md:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    {/* Decorative gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent" />

                    <div className="relative">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary-500/10 rounded-xl">
                          <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {experience.role}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            {experience.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {experience.description}
                      </p>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                          <Code2 className="w-5 h-5" />
                          <span>Technologies Used</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              <ChevronRight className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {experience.link && (
                        <a
                          href={experience.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                        >
                          View Project
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
