import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { educationApi, personalInfoApi } from '../lib/api';
import { useEffect, useState } from "react";
import { PersonalInfo, Education } from "../lib/types";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerItems = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default function ProfileSection() {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    const [education, setEducation] = useState<Education[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [personalData, educationData] = await Promise.all([
                    personalInfoApi.get(),
                    educationApi.getAll()
                ]);
                setPersonalInfo(personalData);
                setEducation(educationData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchData();
    }, []);

    if (!personalInfo) return null;

    return (
        <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
                 //Continuing the ProfileSection.tsx file content exactly where it left off:

                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerItems}
                >
                    {/* Personal Information Card */}
                    <motion.div
                        className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 p-6 sm:p-8 rounded-2xl shadow-lg"
                        variants={fadeIn}
                    >
                        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl" />
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                                <img
                                    src={personalInfo.avatar_url || '/avatar.png'}
                                    alt={personalInfo.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                                />
                                <div className="text-center sm:text-left">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        {personalInfo.name}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        {personalInfo.title}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                                {personalInfo.description}
                            </p>

                            <hr className="border-gray-200 dark:border-gray-700" />

                            <div className="mt-6 space-y-4">
                                <motion.div
                                    className="flex items-center gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                                    variants={fadeIn}
                                >
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="text-sm sm:text-base text-gray-900 dark:text-white">{personalInfo.email}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                                    variants={fadeIn}
                                >
                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                        <p className="text-sm sm:text-base text-gray-900 dark:text-white">{personalInfo.phone}</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                                    variants={fadeIn}
                                >
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Location</p>
                                        <p className="text-sm sm:text-base text-gray-900 dark:text-white">{personalInfo.location}</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education Timeline */}
                    <motion.div
                        className="space-y-6 sm:space-y-8"
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                            Education Timeline
                        </h2>

                        <div className="relative">
                            <div className="absolute left-6 top-0 h-full w-1 bg-gray-200 dark:bg-gray-700 rounded-full" />

                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    className="relative pl-12 mb-6 sm:mb-8 last:mb-0 group"
                                    variants={fadeIn}
                                >
                                    <div className="absolute left-0 top-2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-cyan-600 dark:bg-cyan-700 rounded-full shadow-lg">
                                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div className="ml-4 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md">
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-2">
                                            {edu.institution}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            {edu.period}
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {edu.description}
                                        </p>
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