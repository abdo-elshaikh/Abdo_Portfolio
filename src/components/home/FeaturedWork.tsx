import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../../lib/api";
import { Project } from "../../lib/types";
import { Code, Rocket, Paintbrush, Cloud, BookOpen, Sparkles } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedWork() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    const fetchFeaturedProjects = async () => {
        try {
            const data = await projectsApi.getAll();
            setFeaturedProjects(data.filter((project) => project.is_featured));
        } catch (error) {
            console.error("Error fetching featured projects:", error);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) return null;

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-purple-100 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* About Section */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Full Stack Developer & Designer
                        </h2>
                        <hr className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" />
                        <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                            Creating digital experiences that blend technical excellence with aesthetic vision.
                        </p>

                        <ul className="space-y-4">
                            {[
                                { icon: Code, text: "Specializing in Next.js, TypeScript, and React ecosystems" },
                                { icon: Rocket, text: "Building scalable cloud-native applications with AWS & Kubernetes" },
                                { icon: Paintbrush, text: "Crafting interfaces with Framer Motion and Tailwind CSS" },
                                { icon: Cloud, text: "Architecting serverless solutions and microservices" },
                                { icon: BookOpen, text: "Exploring AI/ML integration patterns" },
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-4 text-gray-700 dark:text-gray-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <item.icon className="w-6 h-6 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-1" />
                                    <span className="text-lg">{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <motion.a
                                href="/contact"
                                className="px-8 py-3.5 rounded-xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles className="inline mr-2 w-5 h-5" />
                                Start Collaboration
                            </motion.a>
                            <motion.a
                                href="/projects"
                                className="px-8 py-3.5 rounded-xl text-lg font-semibold border border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 transition-all hover:-translate-y-1"
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles className="inline mr-2 w-5 h-5" />
                                View Portfolio
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
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
                            Featured Projects
                        </h3>
                        <hr className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" />

                        {/* Swiper Carousel */}
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={32}
                            slidesPerView={1}
                            loop={featuredProjects.length > 2}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                            }}
                            className="mySwiper h-[30rem]"
                        >
                            {featuredProjects?.map((project) => (
                                <SwiperSlide key={project.id}>
                                    <motion.div
                                        className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all flex flex-col"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                    >
                                        <img src={project.image_url} alt={project.title} className="w-full h-64 object-cover" />
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold">{project.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                                        </div>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => navigate(`/projects/${project.id}`)}
                                        >
                                            <div className="flex items-center justify-center h-full">
                                                <motion.button
                                                    className="px-6 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    View Project
                                                </motion.button>
                                            </div>
                                        </motion.div>

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
