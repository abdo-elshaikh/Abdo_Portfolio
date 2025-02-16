import { motion, useAnimation, useInView } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../contexts/ThemeContext";

const HeroSection = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const avatarRef = useRef(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const controls = useAnimation();
    const isInView = useInView(textRef, { once: true, margin: "-100px" });

    useEffect(() => setMounted(true), []);

    // Three.js Particle System
    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ color: theme === "dark" ? 0xffffff : 0x000000, size: 0.02 });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.001;
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

    // Text Animation Trigger
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const avatarVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <section className="relative pt-16 min-h-screen flex items-center dark:bg-gray-900 bg-gray-100 overflow-hidden">
            {/* Three.js Particle Background */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                <motion.div
                    className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 py-18"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    ref={textRef}
                >
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8 order-2 lg:order-1 text-center lg:text-left">
                        {/* Availability Badge */}
                        <motion.div variants={itemVariants}>
                            <div className="mb-2 inline-flex items-center gap-3 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-sm font-medium">Available for new projects</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-blue-600 to-purple-400 dark:from-blue-400 dark:to-purple-300 bg-clip-text text-transparent">
                                Abdulrahman Mohammed
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8"
                            variants={itemVariants}
                        >
                            Full Stack Developer &<br />
                            <span className="text-blue-500">UI/UX Designer</span>
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                            variants={itemVariants}
                        >
                            Building digital experiences that merge innovation with functionality. Specializing in modern web architectures and user-centric design.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            <motion.a
                                href="#contact"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Mail size={20} />
                                Get in Touch
                            </motion.a>
                            <motion.a
                                href="#cv"
                                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download size={20} />
                                Download CV
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="mt-8 flex justify-center lg:justify-start gap-6"
                            variants={itemVariants}
                        >
                            {[
                                { icon: <Github />, link: "https://github.com/abdo-mhmd" },
                                { icon: <Linkedin />, link: "https://linkedin.com/in/abdo-mhmd" },
                                { icon: <Twitter />, link: "https://twitter.com/abdo_mhmd" },
                                { icon: <Mail />, link: "mailto:abdo_mhmd@pm.me" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-300 dark:bg-gray-800 rounded-lg hover:bg-gray-400 transition-all text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Avatar Section */}
                    <motion.div
                        className="lg:w-1/2 flex justify-center relative order-1 lg:order-2"
                        ref={avatarRef}
                        variants={avatarVariants}
                    >
                        <motion.div
                            className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-600 to-purple-400 dark:from-blue-400 dark:to-purple-300"
                            variants={itemVariants}
                        >
                            <motion.img
                                src="/avatar.jpg"
                                alt="Avatar"
                                className="w-80 h-80 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                            />
                        </motion.div>

                        <motion.div
                            className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-400 dark:from-blue-400 dark:to-purple-300"
                            variants={itemVariants}
                        />

                        <motion.div
                            className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-400 dark:from-blue-400 dark:to-purple-300"
                            variants={itemVariants}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;