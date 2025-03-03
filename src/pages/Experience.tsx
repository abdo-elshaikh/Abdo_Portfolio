import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, Code2, Rocket, Award, GitBranch, ExternalLink, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../contexts/ThemeContext";
import { experiencesApi } from "../lib/api";
import { Experience } from "../lib/types";

const RoleIcon = ({ type }: { type: string }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    development: <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    leadership: <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    design: <GitBranch className="w-6 h-6 text-violet-500 dark:text-violet-400" />,
    default: <Briefcase className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
  };

  return (
    <div className="p-3 bg-indigo-50/70 dark:bg-indigo-900/30 rounded-xl shadow-sm backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-800/50">
      {iconMap[type] || iconMap.default}
    </div>
  );
};

const expr = [
  {
    id: 1,
    company: "CodeIgniter Indonesia",
    role: "Full Stack Developer",
    type: "development",
    period: "2013 - 2014",
    description:
      "Developed and maintained a web-based application for managing user accounts and transactions.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    company: "PT. Solusi Teknologi Indonesia",
    role: "Full Stack Developer",
    type: "development",
    period: "2014 - 2015",
    description:
      "Developed and maintained a web-based application for managing user accounts and transactions.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    company: "PT. Solusi Teknologi Indonesia",
    role: "Full Stack Developer",
    type: "development",
    period: "2015 - 2016",
    description:
      "Developed and maintained a web-based application for managing user accounts and transactions.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 4,
    company: "PT. Solusi Teknologi Indonesia",
    role: "Full Stack Developer",
    type: "development",
    period: "2016 - 2017",
    description:
      "Developed and maintained a web-based application for managing user accounts and transactions.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 5,
    company: "PT. Solusi Teknologi Indonesia",
    role: "Full Stack Developer",
    type: "development",
    period: "2017 - 2018",
    description:
      "Developed and maintained a web-based application for managing user accounts and transactions.",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
]

const ExperienceTimeline = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }
    , []);

  const fetchExperiences = async () => {
    try {
      const data = await experiencesApi.getAll();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTechClick = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
        <section className="py-20 relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16 lg:mb-24">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-6">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-indigo-200/80 max-w-3xl mx-auto">
              Tracing my career path through innovative projects and technical evolution
            </p>
          </motion.div>

          <div className="relative">
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-indigo-900min-h-screen pt-16 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/90 dark:to-purple-900min-h-screen pt-16 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/90">
      <section className="py-20 relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16 lg:mb-24">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-6">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-indigo-200/80 max-w-3xl mx-auto">
            Tracing my career path through innovative projects and technical evolution
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-indigo-400/20 via-purple-400/30 to-transparent dark:from-indigo-500/30 dark:via-purple-400/40 transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
          />

          <div className="space-y-20 lg:space-y-28">
            {expr.map((exp, idx) => (
              <motion.div
                key={exp.id}
                className="relative flex flex-col lg:grid lg:grid-cols-9 gap-8 group"
              >
                {/* Timeline dot */}
                <div className="absolute lg:relative left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-6 h-6 bg-indigo-500 dark:bg-purple-400 rounded-full border-4 border-white dark:border-gray-800 z-10 shadow-xl shadow-indigo-400/30 dark:shadow-purple-400/20">
                  <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-400/30 dark:bg-purple-400/20" />
                </div>

                {/* Date panel */}
                <div className="lg:col-span-4 text-center lg:text-right pt-2">
                  <motion.div className="inline-flex items-center gap-3 bg-white/80 dark:bg-indigo-900/30 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-800/50">
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium text-gray-700 dark:text-indigo-200/90">
                      {exp.period}
                    </span>
                  </motion.div>
                </div>

                {/* Experience card */}
                <motion.article
                  className="lg:col-span-4 bg-white/80 dark:bg-indigo-900/20 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-800/50"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500" />

                  <div className="relative space-y-6">
                    <div className="flex items-start gap-5">
                      <RoleIcon type={exp.type} />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-indigo-50/95 mb-1.5">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <p className="text-lg text-indigo-600 dark:text-indigo-400/90 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-indigo-200/80 leading-relaxed mb-6 line-clamp-3">
                      {exp.description}
                    </p>

                    {exp.projects && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-indigo-200/90">
                          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          <span>Key Projects</span>
                        </div>
                        <div className="grid gap-3">
                          {exp?.projects.map((project, pIdx) => (
                            <div
                              key={pIdx}
                              className="px-4 py-3 bg-white/50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100/50 dark:border-indigo-800/50 backdrop-blur-sm"
                            >
                              <h4 className="font-medium text-gray-800 dark:text-indigo-100/90 mb-1.5">
                                {project.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-indigo-300/80 line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-indigo-200/90">
                        <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span>Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.map((tech, tIdx) => (
                          <motion.button
                            key={tIdx}
                            className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all ${selectedTech === tech
                              ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400/90"
                              : "bg-gray-100/80 dark:bg-indigo-900/30 text-gray-700 dark:text-indigo-300/90"
                              }`}
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={() => setSelectedTech(tech)}
                            onHoverEnd={() => setSelectedTech(null)}
                          >
                            {tech}
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
      </section>
    </div>
  );
};

export default ExperienceTimeline;