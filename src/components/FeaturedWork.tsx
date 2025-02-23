import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../lib/api";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Project } from "../lib/types";

export default function FeaturedWork() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async (): Promise<void> => {
        try {
            const data = await projectsApi.getAll();
            if (data) setFeaturedProjects(data);
        } catch (error) {
            console.error("Error fetching featured projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const allTags = Array.from(
        new Set(featuredProjects.flatMap((project) => project.tags)),
    );

    const filteredProjects = selectedTag
        ? featuredProjects.filter((project) =>
              project.tags.includes(selectedTag),
          )
        : featuredProjects;

    if (isLoading) return null;

    return (
        <section className="py-20 md:py-32 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* About Section */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            <span className="bg-gradient-to-r from-blue-800 to-cyan-600 bg-clip-text text-transparent">
                                Software Engineer
                            </span>
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            Passionate about building scalable, high-performance
                            applications.
                        </p>

                        <hr className="my-6 border-gray-300 dark:border-gray-700" />

                        <ul className="space-y-3 text-base text-gray-600 dark:text-gray-300">
                            <li>
                                🚀 Specializing in React, Node.js, MongoDB, and
                                MySQL.
                            </li>
                            <li>
                                🎨 Creating seamless and responsive user
                                experiences.
                            </li>
                            <li>
                                🔧 Expertise in API development and cloud
                                deployment.
                            </li>
                            <li>
                                🌱 Continuously learning to stay ahead in tech.
                            </li>
                        </ul>

                        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
                            Let's collaborate and bring your ideas to life!
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <motion.a
                                href="/contact"
                                className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get in Touch
                            </motion.a>

                            <motion.a
                                href="/projects"
                                className="px-6 py-3 w-full sm:w-auto bg-gray-600 dark:bg-gray-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View All Projects
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Featured Projects Section */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 40 }}
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
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                                    !selectedTag
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                                }`}
                            >
                                All
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                                        selectedTag === tag
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                                    }`}
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
                                            onClick={() =>
                                                navigate(
                                                    `/projects/${project.id}`,
                                                )
                                            }
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
                </div>
            </div>
        </section>
    );
}
