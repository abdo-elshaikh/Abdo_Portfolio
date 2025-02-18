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
        const particlesCount = window.innerWidth < 768 ? 400 : 800; // Reduce particles on mobile
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
            size: window.innerWidth < 768 ? 0.08 : 0.05, // Larger particles on mobile
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = window.innerWidth < 768 ? 7 : 5; // Adjust camera for mobile

        // Mouse Interaction
        const mouse = new THREE.Vector2();
        const touchHandler = (event) => {
            const touch = event.touches[0];
            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('touchmove', touchHandler);
        window.addEventListener('touchstart', touchHandler);

        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0005;

            particles.position.x += (mouse.x * 0.5 - particles.position.x) * 0.01;
            particles.position.y += (mouse.y * 0.5 - particles.position.y) * 0.01;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.position.z = window.innerWidth < 768 ? 7 : 5;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener('touchmove', touchHandler);
            window.removeEventListener('touchstart', touchHandler);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
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
        <section className="relative pt-10 min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.1]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20"></div>
            <div ref={containerRef} className="absolute inset-0 z-0 opacity-40" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <motion.div
                    className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 py-8 lg:py-24"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    ref={textRef}
                >
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
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
                            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 text-gray-800 dark:text-gray-100"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-blue-800 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">
                                Abdulrahman Mohammed.
                            </span>
                        </motion.h1>

                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-300 mb-6 lg:mb-8"
                            variants={itemVariants}
                        >
                            Software Engineer & Web Developer
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 lg:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
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
                                className="px-6 sm:px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Mail size={20} />
                                Contact Me
                            </motion.a>
                            <motion.a
                                href="#cv"
                                className="px-6 sm:px-8 py-3 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download size={20} />
                                View Resume
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex justify-center lg:justify-start gap-4 mt-6 lg:mt-8"
                            variants={itemVariants}
                        >
                            {[Github, Linkedin, Twitter].map((Icon, index) => (
                                <motion.div
                                    key={index}
                                    className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <a href="#" target="_blank" rel="noreferrer">
                                        <Icon size={24} />
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Avatar Section */}
                    <motion.div
                        className="lg:w-1/2 flex justify-center relative group"
                        variants={avatarVariants}
                    >
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                            <motion.div
                                className="relative w-full h-full rounded-full border-8 border-white dark:border-gray-900 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-shadow"
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