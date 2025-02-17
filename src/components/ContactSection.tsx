import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ContactSection() {
    const { theme } = useTheme();

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-gray-50 dark:bg-gray-900">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggc3Ryb2tlPSIjRkZGIiBzdHJva2Utb3BhY2l0eT0iMC4yIiBkPSJNMjkuNSA1OS41VjM2TDAgNS41aDMwLjVMMjkgMzZ2MjMuNXpNNTkuNSAyOS41VjZMNDEgMjkuNUg1OS41eiIvPjwvZz48L3N2Zz4=')]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-16 lg:mb-24">
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-800 to-cyan-500 dark:from-cyan-500 dark:to-cyan-400 bg-clip-text text-transparent mb-6"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            Get in Touch
                        </motion.h2>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Let's collaborate on your next project. Whether you have a question or just want to connect, I'm here to help.
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Info Card */}
                        <motion.div
                            className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                                Contact Information
                            </h3>

                            <div className="space-y-4 sm:space-y-6">
                                <ContactItem
                                    icon={Mail}
                                    text="contact@abdodev.com"
                                    link="mailto:contact@abdodev.com"
                                />
                                <ContactItem
                                    icon={Phone}
                                    text="+201067262026"
                                    link="tel:+201067262026"
                                />
                                <ContactItem
                                    icon={MapPin}
                                    text="Cairo, Egypt"
                                    link="https://goo.gl/maps/cairo-egypt"
                                />
                            </div>

                            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                                    Connect Online
                                </h4>
                                <div className="flex gap-4">
                                    <SocialLink
                                        icon={Linkedin}
                                        href="https://linkedin.com/in/abdo-mhmd"
                                    />
                                    <SocialLink
                                        icon={Github}
                                        href="https://github.com/abdo-mhmd"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ContactItem({ icon: Icon, text, link }) {
    return (
        <motion.a
            href={link}
            className="flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all group hover:bg-gray-50 dark:hover:bg-gray-700/50"
            whileHover={{ x: 5 }}
        >
            <div className="p-2 sm:p-3 bg-cyan-600 dark:bg-cyan-500 rounded-lg group-hover:bg-cyan-700 dark:group-hover:bg-cyan-400 transition-colors">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                {text}
            </span>
        </motion.a>
    );
}

function SocialLink({ icon: Icon, href }) {
    return (
        <motion.a
            href={href}
            className="p-2 sm:p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400"
            whileHover={{ y: -3 }}
        >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.a>
    );
}

function ContactForm() {
    const { theme } = useTheme();

    return (
        <form className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                Send a Message
            </h3>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <FormField label="Full Name" type="text" placeholder="John Doe" />
                <FormField label="Email" type="email" placeholder="john@example.com" />
            </div>
            <FormField label="Subject" type="text" placeholder="Project Inquiry" />
            <FormField label="Message" type="textarea" placeholder="Your message..." />

            <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-cyan-600 dark:bg-cyan-500 text-white py-3 sm:py-4 rounded-xl font-medium hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
            >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Message
            </motion.button>
        </form>
    );
}

function FormField({ label, type, placeholder }) {
    const { theme } = useTheme();

    const baseClasses = `w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 transition-all ${
        theme === 'dark'
            ? 'bg-gray-700 border border-gray-600 text-white'
            : 'bg-gray-50 border border-gray-200 text-gray-900'
    }`;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    rows={4}
                    className={`${baseClasses} resize-none`}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    type={type}
                    className={baseClasses}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}