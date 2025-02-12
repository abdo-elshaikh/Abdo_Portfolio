import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

// Animation Variants
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const socialLinks = [
    { label: "GitHub", url: "https://github.com", icon: <Github size={24} /> },
    { label: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin size={24} /> },
    { label: "Twitter", url: "https://twitter.com", icon: <Twitter size={24} /> },
    { label: "Email", url: "mailto:your@email.com", icon: <Mail size={24} /> },
];

const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ scale: [1, 1.3, 1], rotate: [0, i % 2 === 0 ? 360 : -360] }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                style={{
                    background: `radial-gradient(circle at ${i * 35}% ${i * 25}%, rgba(255,255,255,0.4) 0%, transparent 80%)`,
                    mixBlendMode: "overlay",
                }}
            />
        ))}
    </div>
);

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#1e3a8a] text-white min-h-screen flex items-center">
            <motion.header
                className="relative w-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-6 py-10 relative z-10">
                    <motion.div className="max-w-3xl mx-auto" variants={staggerContainer} initial="initial" animate="animate">
                        {/* Availability Badge */}
                        <motion.div className="mb-8" variants={fadeIn}>
                            <motion.span
                                className="px-6 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-md border border-white/30 inline-flex items-center gap-2 hover:bg-white/30 transition-all cursor-pointer"
                            >
                                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                Open to Work
                            </motion.span>
                        </motion.div>

                        {/* Avatar with Animation */}
                        <motion.div className="flex justify-center mb-6" variants={fadeIn}>
                            <motion.div
                                className="w-40 h-45 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl transition-transform duration-300 bg-white"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src="/avatar.jpg"
                                    alt="Profile Picture"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Hero Title & Subtitle */}
                        <motion.h1 className="text-4xl font-bold mb-4 font-['Chewy', serif]" variants={fadeIn}>
                            Hi, I'm <span className="text-blue-500 "> Abdulrahman Mohammed</span>
                        </motion.h1>

                        <motion.h2 className="text-2xl font-semibold mb-4" variants={fadeIn}>
                            Software Enginee
                        </motion.h2>
                        <motion.h2 className="text-xl text-yellow-300 font-semibold mb-6" variants={fadeIn}>
                            - Full Stack Devloper & UI/UX Designer -
                        </motion.h2>

                        {/* Stylish Divider */}
                        <motion.div className="w-24 h-1 bg-white mx-auto mb-6 rounded-full opacity-70" variants={fadeIn}></motion.div>

                        {/* Hero Description */}
                        <motion.p className="text-lg text-gray-200 mb-8 leading-relaxed" variants={fadeIn}>
                            Passionate about building elegant web applications with modern technologies. <br />
                            I specialize in full-stack development, crafting seamless user experiences.
                        </motion.p>

                        {/* Call-to-Action Buttons */}
                        <motion.div className="flex justify-center space-x-4 mb-8" variants={fadeIn}>
                            <motion.a
                                href="#contact"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-400"
                                whileHover={{ scale: 1.05 }}
                            >
                                Get in Touch
                            </motion.a>
                            <motion.a
                                href="#portfolio"
                                className="px-6 py-3 bg-white/30 text-white rounded-lg font-medium border border-white/50 hover:bg-white/40 transition-all duration-300 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                            >
                                Download CV
                            </motion.a>
                        </motion.div>

                        {/* Social Media Links */}
                        <motion.div className="flex justify-center space-x-6" variants={fadeIn}>
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    className="p-4 bg-white/20 rounded-xl border border-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-white/40"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
                <AnimatedBackground />
            </motion.header>
        </section>
    );
};

export default HeroSection;
