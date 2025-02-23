import { motion } from "framer-motion";
import { Code, Cloud, Cpu, Globe, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { PersonalInfo, Skill } from "../lib/types";
import { personalInfoApi, skillsApi } from "../lib/api";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function AboutSection() {
    const [aboutInfo, setAboutInfo] = useState<PersonalInfo>(
        {} as PersonalInfo,
    );
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        async function fetchAboutInfo() {
            const data = await personalInfoApi.get();
            if (data) setAboutInfo(data);
        }

        async function fetchSkills() {
            const data = await skillsApi.getAll();
            if (data) setSkills(data);
        }

        fetchAboutInfo();
        fetchSkills();
    }, []);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        animate: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {/* Profile Card */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 lg:sticky lg:top-24 h-fit border border-gray-100 dark:border-gray-700"
                        variants={fadeIn}
                    >
                        <div className="text-center mb-8 relative">
                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 overflow-hidden shadow-lg">
                                    <div className="w-full h-full bg-opacity-10 backdrop-blur-sm" />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg flex items-center gap-1 pr-3"
                                >
                                    <Download className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        CV
                                    </span>
                                </motion.button>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {aboutInfo.name}
                            </h1>
                            <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                                {aboutInfo.title}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                    Contact
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                                        <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">
                                                {aboutInfo.location}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Location
                                            </p>
                                        </div>
                                    </div>
                                    {/* Add other contact blocks similarly */}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                    Core Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills?.slice(0, 6).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 text-sm bg-gradient-to-r from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-300 rounded-full backdrop-blur-sm"
                                        >
                                            {skill.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div className="space-y-8" variants={fadeIn}>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                            Technical Expertise
                        </h2>

                        <div className="grid gap-6">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
                                    variants={fadeIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex gap-5">
                                        <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            {skill.icon === "cloud" ? (
                                                <Cloud />
                                            ) : skill.icon === "cpu" ? (
                                                <Cpu />
                                            ) : (
                                                <Code />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {skill.title}
                                                </h3>
                                                <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                                    {skill.years}+ years
                                                </span>
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                                                {skill.description}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${skill.proficiency}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm text-blue-600 dark:text-blue-400">
                                                    {skill.proficiency}%
                                                    Proficiency
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
