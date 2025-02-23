import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Building2,
  ChevronRight,
  Code2,
  Rocket,
  Award,
  GitBranch,
} from "lucide-react";
import { experiencesApi } from "../lib/api";
import type { Experience } from "../lib/types";

const RoleIcon = ({ type }: { type: string }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    development: <Code2 className="w-6 h-6" />,
    leadership: <Rocket className="w-6 h-6" />,
    design: <GitBranch className="w-6 h-6" />,
    default: <Briefcase className="w-6 h-6" />,
  };

  return (
    <div className="p-3 bg-primary-500/10 rounded-xl">
      {iconMap[type] || iconMap.default}
    </div>
  );
};

const ExperienceTimeline = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    try {
      const data = await experiencesApi.getAll();
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  }

  const LoadingSkeleton = () => (
    <div className="space-y-8 w-full max-w-4xl px-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-32 bg-gradient-to-r from-gray-100/50 to-gray-200/30 dark:from-gray-800/50 dark:to-gray-700/30 rounded-2xl animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-cyan-50/30 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90">
      <section className="py-20 relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-6">
            Professional Odyssey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Charting my career milestones, technological explorations, and
            impactful contributions
          </p>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-primary-500/20 to-transparent dark:from-primary-400/30 transform -translate-x-1/2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />

            <div className="space-y-20 lg:space-y-28">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  className="relative flex flex-col lg:grid lg:grid-cols-9 gap-8 group"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  {/* Timeline dot with glow */}
                  <div className="absolute lg:relative left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 z-10 shadow-xl shadow-primary-400/20">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-primary-400/30" />
                  </div>

                  {/* Date panel */}
                  <div className="lg:col-span-4 text-center lg:text-right pt-2">
                    <motion.div
                      className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {exp.period}
                      </span>
                    </motion.div>
                  </div>

                  {/* Experience card */}
                  <motion.article
                    className="lg:col-span-4 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -8 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-cyan-500" />

                    <div className="relative space-y-6">
                      <div className="flex items-start gap-5">
                        <RoleIcon type={exp.type} />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                        {exp.description}
                      </p>

                      {exp.projects && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                            <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <span>Key Projects</span>
                          </div>
                          <div className="grid gap-3">
                            {exp.projects.map((project, pIdx) => (
                              <div
                                key={pIdx}
                                className="px-4 py-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700"
                              >
                                <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1.5">
                                  {project.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {project.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                          <Code2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          <span>Tech Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies?.map((tech, tIdx) => (
                            <motion.button
                              key={tIdx}
                              className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-colors ${
                                selectedTech === tech
                                  ? "bg-primary-500/20 text-primary-600 dark:text-primary-400"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              onHoverStart={() => setSelectedTech(tech)}
                              onHoverEnd={() => setSelectedTech(null)}
                            >
                              <span className="relative">
                                {tech}
                                {selectedTech === tech && (
                                  <motion.span
                                    className="absolute inset-0 bg-primary-500/10 rounded-full"
                                    layoutId="techHighlight"
                                    transition={{ type: "spring", bounce: 0.2 }}
                                  />
                                )}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExperienceTimeline;
