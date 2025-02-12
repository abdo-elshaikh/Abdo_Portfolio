import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { educationApi, personalInfoApi } from '../lib/api';
import { useEffect, useState } from "react";
import { PersonalInfo, Education } from "../lib/types";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

                if (personalData) setPersonalInfo(personalData);
                if (educationData) setEducation(educationData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }

        fetchData();
    }, []);

    if (!personalInfo) return null;

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
                >
                    {/* LEFT SIDE - PERSONAL INFORMATION */}
                    <motion.div
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm"
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{personalInfo.description}</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-gray-900 dark:text-white font-medium">{personalInfo.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-gray-600 dark:text-gray-300">{personalInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-gray-600 dark:text-gray-300">{personalInfo.phone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                <span className="text-gray-600 dark:text-gray-300">{personalInfo.location}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - EDUCATION TIMELINE */}
                    <motion.div variants={fadeIn}>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
                        <div className="relative pl-8">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    className="relative pl-6 mb-8 last:mb-0"
                                    variants={fadeIn}
                                >
                                    <div className="absolute left-[-10] top-0 flex items-center justify-center w-10 h-10 bg-indigo-600 dark:bg-indigo-400 rounded-full">
                                        <span className="text-white">{index + 1}</span>
                                    </div>
                                    <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                                        <p className="text-gray-600 dark:text-gray-300">{edu.period}</p>
                                        <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
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