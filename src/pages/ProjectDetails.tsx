import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetchProject();
    }, []);

    async function fetchProject() {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching project", error);
            return;
        }

        setProject(data);
    }

    if (!project) return <div className="text-center text-gray-500">Project not found.</div>;

    return (
        <motion.section
            className="min-h-screen py-16 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full rounded-lg shadow-md mb-6 object-cover h-64 sm:h-80"
                    />
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                    </h1>
                    <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {project.description}
                    </p>
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Technologies Used:</h3>
                        <ul className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, index) => (
                                <motion.li
                                    key={index}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {tech}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 text-white bg-blue-600 rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Live Preview
                        </motion.a>
                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 text-white bg-gray-900 dark:bg-gray-700 rounded-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Code
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
