import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
    CodeIcon,
    Server,
    PenTool,
    ArrowRight,
    ContainerIcon,
} from "lucide-react";
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
            className="group relative p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
            variants={cardVariants}
            whileHover={{ y: -4 }}
        >
            <div className="flex items-start gap-4">
                <motion.div
                    className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-400 w-fit"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring" }}
                >
                    <IconComponent className="h-6 w-6 text-white stroke-[1.5]" />
                </motion.div>

                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {skill.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-100/50 to-purple-100/50 dark:from-cyan-900/20 dark:to-purple-900/20 text-cyan-600 dark:text-cyan-300 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
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
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left side - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden">
                                <img
                                    src="/main_2.jpg"
                                    alt="Professional"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-transparent" />
                        </motion.div>

                        {/* Right side - Skills */}
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="flex flex-col gap-8 lg:gap-12"
                        >
                            <motion.div
                                className="space-y-4"
                                variants={cardVariants}
                            >
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">
                                    Crafting Digital Excellence
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Merging technical precision with creative
                                    vision to build transformative digital
                                    experiences.
                                </p>
                            </motion.div>

                            <div className="space-y-4">
                                {skills.map((skill) => (
                                    <SkillCard key={skill.id} skill={skill} />
                                ))}
                            </div>

                            <motion.div variants={cardVariants}>
                                <motion.a
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Start Your Project</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
