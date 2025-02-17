import { motion, useAnimation, useInView } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

const HeroSection = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const controls = useAnimation();
    const isInView = useInView(textRef, { once: true, threshold: 0.5 });

    useEffect(() => setMounted(true), []);

    // Enhanced Three.js Particle System
    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Interactive Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 800;
        const positions = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            sizes[i] = Math.random() * 0.1 + 0.02;
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const particlesMaterial = new THREE.PointsMaterial({
            color: theme === "dark" ? 0x4fd1c5 : 0x2d6cdf,
            size: 0.05,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 5;

        // Mouse Interaction
        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0005;

            // Add subtle mouse interaction
            particles.position.x += (mouse.x * 0.5 - particles.position.x) * 0.01;
            particles.position.y += (mouse.y * 0.5 - particles.position.y) * 0.01;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            containerRef.current.removeChild(renderer.domElement);
        };
    }, [theme]);

    useEffect(() => {
        if (isInView && mounted) controls.start("visible");
    }, [isInView, mounted]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const avatarVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section className="relative pt-10 min-h-screen flex items-center dark:bg-[#0a192f] bg-gray-50 overflow-hidden">
            <div ref={containerRef} className="absolute inset-0 z-0 opacity-40" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <motion.div
                    className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 py-24"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    ref={textRef}
                >

                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8 order-2 lg:order-1 text-center lg:text-left">
                        {/* Availability Badge */}
                        <motion.div variants={itemVariants}>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-sm font-medium">Available for new projects</span>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <span className="font-mono text-sm text-cyan-500 dark:text-cyan-400">
                                Hi, my name is :
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-6xl xl:text-7xl font-bold mb-6 text-gray-800 dark:text-gray-100"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-blue-800 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">
                                Abdulrahman Mohammed.
                            </span>
                        </motion.h1>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-300 mb-8"
                            variants={itemVariants}
                        >
                            Software Engineer & Web Developer
                        </motion.h2>

                        <motion.p
                            className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl leading-relaxed backdrop:filter backdrop-blur-xl"
                            variants={itemVariants}
                        >
                            I'm a passionate software engineer and web developer with experience in building web applications and software solutions.
                            I specialize in building responsive, performant, and user-friendly web applications using modern technologies.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            <motion.a
                                href="#contact"
                                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Mail size={20} />
                                Contact Me
                            </motion.a>
                            <motion.a
                                href="#cv"
                                className="px-8 py-3 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-medium flex items-center gap-2 transition-all"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download size={20} />
                                View Resume
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex justify-center lg:justify-start gap-4 mt-8"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full"
                                whileHover={{ scale: 1.1 }}
                            >
                                <a href="#" target="_blank" rel="noreferrer">
                                    <Github size={24} />
                                </a>
                            </motion.div>
                            <motion.div
                                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full"
                                whileHover={{ scale: 1.1 }}
                            >
                                <a href="#" target="_blank" rel="noreferrer">
                                    <Linkedin size={24} />
                                </a>
                            </motion.div>
                            <motion.div
                                className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full"
                                whileHover={{ scale: 1.1 }}
                            >
                                <a href="#" target="_blank" rel="noreferrer">
                                    <Twitter size={24} />
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Avatar Section */}
                    <motion.div
                        className="lg:w-1/2 flex justify-center relative order-1 lg:order-2 group"
                        variants={avatarVariants}
                    >
                        <div className="relative w-96 h-96">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                            <motion.div
                                className="relative w-96 h-96 rounded-full border-8 border-white dark:border-gray-900 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-shadow"
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src="/avatar.jpg"
                                    alt="Abdulrahman Mohammed"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;