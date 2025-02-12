import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen } from "lucide-react";

const education = [
    {
        icon: <GraduationCap className="w-8 h-8 text-white" />,
        degree: "B.Sc. Computer Science",
        institution: "Harvard University",
        year: "2017 - 2021",
        description: "Advanced studies in software engineering, AI, and full-stack development.",
        progress: 100,
    },
    {
        icon: <School className="w-8 h-8 text-white" />,
        degree: "High School Diploma",
        institution: "Stanford High School",
        year: "2013 - 2017",
        description: "Graduated with honors, specializing in mathematics and programming.",
        progress: 100,
    },
    {
        icon: <BookOpen className="w-8 h-8 text-white" />,
        degree: "Full-Stack Web Development",
        institution: "Udacity Nanodegree",
        year: "2022",
        description: "Gained practical experience with React, Node.js, MongoDB, and cloud services.",
        progress: 80,
    },
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function EducationSection() {
    return (
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
                >
                    <motion.h2
                        className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12"
                        variants={fadeIn}
                    >
                        Education & Certifications 📚
                    </motion.h2>

                    {/* TIMELINE */}
                    <div className="relative border-l-4 border-indigo-600 dark:border-indigo-500">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="relative pl-10 mb-12"
                                variants={fadeIn}
                            >
                                <div className="absolute left-[-16px] top-1 w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center">
                                    {edu.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300">{edu.institution}</p>
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{edu.year}</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">{edu.description}</p>

                                {/* PROGRESS BAR */}
                                <div className="mt-4 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5">
                                    <motion.div
                                        className="h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${edu.progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
