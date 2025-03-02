import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Project } from "../lib/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface FeaturedProjectsProps {
    projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const navigate = useNavigate();

    // Extract all unique tags from projects
    const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)));

    // Filter projects based on selected tag
    const filteredProjects = selectedTag
        ? projects.filter((project) => project.tags.includes(selectedTag))
        : projects;

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Check out some of my recent work below.
            </p>

            {/* Tag Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${!selectedTag
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                        }`}
                    aria-label="Show all projects"
                >
                    All
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedTag === tag
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                            }`}
                        aria-label={`Filter by ${tag}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Swiper Carousel */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                }}
                className="pb-12"
            >
                {filteredProjects?.map((project) => (
                    <SwiperSlide key={project.id}>
                        <motion.div
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow border border-gray-200 dark:border-gray-700"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-48 sm:h-56 md:h-64 object-cover object-center"
                            />
                            <div className="p-4 md:p-6">
                                <h4 className="text-lg md:text-xl font-semibold line-clamp-2 text-gray-900 dark:text-white">
                                    {project.title}
                                </h4>
                                <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
                                    {project.description}
                                </p>
                            </div>
                            <div className="p-4 md:p-6 flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gradient-to-r from-cyan-100/50 to-purple-100/50 dark:from-cyan-900/20 dark:to-purple-900/20 text-cyan-600 dark:text-cyan-300 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity"
                                onClick={() => navigate(`/projects/${project.id}`)}
                            >
                                <p className="text-white font-semibold text-lg">
                                    View Details
                                </p>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
}