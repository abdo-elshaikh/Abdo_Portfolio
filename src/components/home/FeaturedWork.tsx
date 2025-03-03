import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../../lib/api";
import { Code, Rocket, Paintbrush, Cloud, BookOpen } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Project } from "../../lib/types";

export default function FeaturedWork() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async () => {
        try {
            const response = await projectsApi.getAll();
            setFeaturedProjects(response);
        } catch (error) {
            console.error("Error fetching featured projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const allTags = Array.from(new Set(featuredProjects.flatMap((project) => project.tags)));

    const filteredProjects = selectedTag
        ? featuredProjects.filter((project) => project.tags.includes(selectedTag))
        : featuredProjects;

    if (isLoading) return null;

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* About Section */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-cyan-600 to-pink-500 bg-clip-text text-transparent">
                                Full Stack Developer & Designer
                            </h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                                Crafting digital experiences that merge innovation with elegance
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                { icon: Code, text: "Specializing in React, Next.js, and TypeScript ecosystems" },
                                { icon: Rocket, text: "Building scalable cloud-native applications with AWS & Docker" },
                                { icon: Paintbrush, text: "Creating pixel-perfect UIs with Tailwind and Framer Motion" },
                                { icon: Cloud, text: "Expert in serverless architectures and microservices" },
                                { icon: BookOpen, text: "Continuous learner exploring AI/ML integration" },
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-4 text-gray-700 dark:text-gray-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <item.icon className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                                    <span className="text-lg">{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <motion.a
                                href="/contact"
                                className="px-8 py-3.5 rounded-xl text-lg font-semibold bg-gradient-to-r from-cyan-600 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Collaboration
                            </motion.a>
                            <motion.a
                                href="/projects"
                                className="px-8 py-3.5 rounded-xl text-lg font-semibold bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 dark:bg-gray-700"
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Portfolio
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Featured Projects Section */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-pink-500 bg-clip-text text-transparent mb-2">
                                Spotlight Projects
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Selected works showcasing technical depth and design excellence
                            </p>
                        </div>

                        {/* Tag Filters */}
                        <div className="mb-8 flex flex-wrap gap-3">
                            {["All", ...allTags].map((tag, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSelectedTag(tag === "All" ? null : tag)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${selectedTag === tag || (tag === "All" && !selectedTag)
                                            ? "bg-gradient-to-r from-cyan-600 to-pink-500 text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>

                        {/* Swiper Carousel */}
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                                type: "fraction",
                                el: ".swiper-pagination",
                            }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                            }}
                            className="!pb-16"
                        >
                            {filteredProjects?.map((project) => (
                                <SwiperSlide key={project.id}>
                                    <motion.div
                                        className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {project.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-300 rounded-full text-sm font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
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