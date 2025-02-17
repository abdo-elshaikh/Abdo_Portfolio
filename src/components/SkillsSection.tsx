import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CodeIcon, Server, PenTool, ArrowRight, ContainerIcon } from "lucide-react";
import { Skill } from "../lib/types";
import { skillsApi } from "../lib/api";

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.15 },
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
    CodeIcon,
    Server,
    PenTool,
    ContainerIcon,
};

function SkillCard({ skill }: { skill: Skill }) {
    const IconComponent = iconMap[skill.icon] || CodeIcon;

    return (
        <motion.article
            className="group relative p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -8 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <motion.div
                    className="mb-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-400 w-fit shadow-lg"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring" }}
                >
                    <IconComponent className="h-8 w-8 text-white stroke-[1.5]" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">{skill.description}</p>

                <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1.5 text-sm bg-gradient-to-r from-cyan-100/50 to-purple-100/50 dark:from-cyan-900/20 dark:to-purple-900/20 text-cyan-600 dark:text-cyan-300 rounded-full backdrop-blur-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);

    const fetchSkills = useCallback(async () => {
        try {
            const data = await skillsApi.getAll();
            if (data) setSkills(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div className="text-center mb-16 lg:mb-24" variants={cardVariants}>
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-800 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Crafting Digital Excellence
                        </motion.h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Merging technical precision with creative vision to build transformative digital experiences.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {skills.map((skill) => (
                            <SkillCard key={skill.id} skill={skill} />
                        ))}
                    </div>

                    <motion.div className="mt-20 text-center" variants={cardVariants}>
                        <motion.a
                            href="/contact"
                            className="group inline-flex items-center gap-4 bg-gradient-to-r from-cyan-600 to-blue-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Start Your Project</span>
                            <motion.span className="inline-block group-hover:translate-x-1 transition-transform">
                                <ArrowRight className="h-6 w-6" />
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
