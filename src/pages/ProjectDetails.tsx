import { motion, useScroll, useTransform } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { projectsApi } from "../lib/api";
import type { Project } from "../lib/types";

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    useEffect(() => {
        fetchProject();
    }, []);

    async function fetchProject() {
        try {
            const data = await projectsApi.getById(id as string);
            setProject(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 lg:p-12">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                            <div className="h-64 sm:h-80 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project)
        return (
            <div className="text-center text-gray-500 py-20">Project not found.</div>
        );

    return (
        <motion.section
            className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                            {project.description}
                        </p>
                    </div>
                </motion.div>
                <motion.img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{ y }}
                />

                {/* Scroll Down Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <span>Scroll Down</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mt-2 animate-bounce"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Navigation Bar */}
            <motion.nav
                className="bg-white dark:bg-gray-800 shadow-md"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
                    {/* Breadcrumbs */}
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a1 1 0 00-1 1v5a1 1 0 002 0V7a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <a
                            href="/"
                            className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                        >
                            Home
                        </a>
                        <span className="mx-2">/</span>
                        <a
                            href="/projects"
                            className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition"
                        >
                            Projects
                        </a>
                        <span className="mx-2">/</span>
                        <span>{project.title}</span>
                    </div>

                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                        whileHover={{ x: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to Projects
                    </motion.button>
                </div>
            </motion.nav>

            {/* Main Content */}
            <div className="container mx-auto max-w-7xl py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
                {/* Project Details Grid */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Left Side: Project Image */}
                    <div className="relative">
                        <motion.div
                            className="w-full h-64 sm:h-80 md:h-96 lg:h-full bg-gray-200 dark:bg-gray-700"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Right Side: Project Details */}
                    <div className="p-6 sm:p-8 lg:p-12">
                        {/* Project Title (on large screens) */}
                        <h1 className="hidden lg:block text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            {project.title}
                        </h1>

                        {/* Project Description */}
                        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                            {project.description}
                        </p>

                        {/* Technologies Used */}
                        <div className="mb-8">
                            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                                Technologies Used:
                            </h3>
                            <ul className="flex flex-wrap gap-3">
                                {project.tags?.map((tech, index) => (
                                    <motion.li
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full text-sm sm:text-base text-gray-800 dark:text-gray-200 shadow-sm"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {tech}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-center shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Live Preview
                            </motion.a>
                            <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg font-medium text-center shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Code
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}