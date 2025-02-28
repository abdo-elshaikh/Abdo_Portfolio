import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  Database,
  Cloud,
  Layout,
  PenTool,
  Server,
  Rocket,
} from "lucide-react";
import { Skill } from "../lib/types";
import { skillsApi } from "../lib/api";

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
      className="group relative p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-400">
            <IconComponent className="h-6 w-6 text-white stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {skill.title}
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {skill.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {skill.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-xs bg-gradient-to-r from-cyan-100/50 to-purple-100/50 dark:from-cyan-900/20 dark:to-purple-900/20 text-cyan-600 dark:text-cyan-300 rounded-full"
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
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const data = await skillsApi.getAll();
    if (data) setSkills(data);
  };

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
              My Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Combining technical mastery with creative problem-solving to
              deliver exceptional results.
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let's Build Something Amazing</span>
              <Rocket className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
