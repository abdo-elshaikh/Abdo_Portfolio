import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Cloud, Layout, PenTool, Server, Rocket } from "lucide-react";
import { Skill } from "../../lib/types";
import { skillsApi } from "../../lib/api";

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], type: "spring" },
  },
};

const iconMap: Record<string, React.ElementType> = {
  Code,
  Cpu,
  Database,
  Cloud,
  Layout,
  PenTool,
  Server,
  Rocket,
};

function SkillCard({ skill }: { skill: Skill }) {
  const IconComponent = iconMap[skill.icon] || Code;

  return (
    <motion.div
      className="group relative p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg">
            <IconComponent className="h-6 w-6 text-white stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {skill.title}
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {skill.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {skill.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-xs font-medium bg-gray-100/50 dark:bg-gray-800/50 text-purple-600 dark:text-purple-300 rounded-full backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await skillsApi.getAll();
      if (data) setSkills(data);
    };
    fetchSkills();
  }, []);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-purple-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300 bg-clip-text text-transparent mb-4">
              Technical Mastery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Harnessing cutting-edge technologies to craft exceptional digital experiences
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </motion.div>

          {/* Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-16"
          >
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Next Project</span>
              <Rocket className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}