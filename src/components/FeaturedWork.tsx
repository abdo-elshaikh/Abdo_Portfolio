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

    if (isLoading) return null;

    return (
        <motion.section
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <div className="container max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* About Section */}
                    <motion.div
                        className="max-w-lg mx-auto lg:mx-0"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Software Engineer
                            </span>
                        </h2>
                        <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            Passionate about building scalable, high-performance applications
                            using modern technologies.
                        </p>
                        <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
                            <li>🚀 Specializing in React, Node.js, MongoDB, and MySQL.</li>
                            <li>🎨 Creating seamless and responsive user experiences.</li>
                            <li>🔧 Expertise in API development and cloud deployment.</li>
                            <li>🌱 Continuously learning to stay ahead in tech.</li>
                        </ul>

                        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                            <motion.a
                                href="/contact"
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get in Touch
                            </motion.a>

                            <motion.a
                                href="/projects"
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View All Projects
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Featured Projects Section */}
                    <motion.div
                        className="max-w-2xl mx-auto w-full"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">
                            <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Featured Projects
                            </span>
                        </h3>

                        {/* Swiper Carousel */}
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={16}
                            slidesPerView={1}
                            slidesPerGroup={1}
                            loop={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 24
                                },
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 32
                                },
                            }}
                            className="px-2 sm:px-0 py-10"
                        >
                            {featuredProjects?.map((project) => (
                                <SwiperSlide key={project.id}>
                                    <div
                                        className="relative bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                    >
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-48 sm:h-56 md:h-64 object-cover object-center"
                                        />
                                        <div className="p-4 md:p-6">
                                            <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                                                {project.title}
                                            </h4>
                                            <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
                                                {project.description}
                                            </p>
                                            {/* tags */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg text-xs md:text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <hr className="my-4 border-gray-300 dark:border-gray-700" />
                                            {/* buttons */}
                                            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                                                <a
                                                    // href={project.demo_url || "#"}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm md:text-base shadow hover:shadow-md transition-all duration-300 text-center"
                                                >
                                                    Live Demo
                                                </a>
                                                <a
                                                    href={project.link || "#"}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium text-sm md:text-base shadow hover:shadow-md transition-all duration-300 text-center"
                                                >
                                                    View Code
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}