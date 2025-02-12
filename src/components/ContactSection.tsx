import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext"; // Assuming you have a theme context

export default function ContactSection() {
    const { theme } = useTheme();

    return (
        <section className={`relative py-16 overflow-hidden ${
            theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
        }`}>
            {/* Background Pattern */}
            <div className={`absolute inset-0 opacity-10 ${
                theme === 'dark' 
                    ? 'pattern-dots pattern-gray-700' 
                    : 'pattern-dots pattern-gray-300'
            } pattern-size-4`} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="max-w-7xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-20">
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            Let's Connect
                        </motion.h2>
                        <motion.p
                            className={`text-xl ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            } max-w-2xl mx-auto`}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </motion.p>
                    </div>

                    <div className="grid lg:grid-cols-[1.2fr_2fr] gap-12">
                        {/* Contact Info Card */}
                        <motion.div
                            className={`rounded-3xl p-8 border shadow-2xl ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700'
                                    : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
                            }`}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className={`text-2xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            } mb-8`}>
                                Contact Details
                            </h3>
                            
                            <div className="space-y-6">
                                <ContactItem 
                                    icon={Mail} 
                                    text="abdo_mhmd1@hotmail.com" 
                                    link="mailto:abdo_mhmd1@hotmail.com" 
                                    theme={theme}
                                />
                                <ContactItem 
                                    icon={Phone} 
                                    text="+201067262026" 
                                    link="tel:+201067262026" 
                                    theme={theme}
                                />
                                <ContactItem 
                                    icon={MapPin} 
                                    text="Cairo, Egypt" 
                                    theme={theme}
                                />
                            </div>

                            {/* Social Links */}
                            <div className={`mt-10 pt-8 border-t ${
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                                <h4 className={`text-lg font-semibold ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                } mb-6`}>
                                    Follow Me
                                </h4>
                                <div className="flex gap-4">
                                    <SocialLink 
                                        icon={Linkedin} 
                                        href="https://linkedin.com/in/yourprofile" 
                                        theme={theme}
                                    />
                                    <SocialLink 
                                        icon={Github} 
                                        href="https://github.com/yourprofile" 
                                        theme={theme}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            className={`rounded-3xl p-8 border shadow-2xl ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700'
                                    : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
                            }`}
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ContactForm theme={theme} />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ContactItem({ icon: Icon, text, link, theme }) {
    return (
        <motion.a
            href={link || "#"}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                theme === 'dark'
                    ? 'bg-gray-700/30 hover:bg-gray-700/50'
                    : 'bg-gray-100 hover:bg-gray-200'
            }`}
            whileHover={{ x: 5 }}
        >
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className={`font-medium ${
                theme === 'dark'
                    ? 'text-gray-200 group-hover:text-white'
                    : 'text-gray-700 group-hover:text-gray-900'
            }`}>
                {text}
            </span>
        </motion.a>
    );
}

function SocialLink({ icon: Icon, href, theme }) {
    return (
        <motion.a
            href={href}
            className={`p-3 rounded-lg transition-colors ${
                theme === 'dark'
                    ? 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ y: -3 }}
        >
            <Icon className="w-6 h-6" />
        </motion.a>
    );
}

function ContactForm({ theme }) {
    return (
        <form className="space-y-6">
            <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
            } mb-8`}>
                Send a Message
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Your Name" type="text" placeholder="John Doe" theme={theme} />
                <FormField label="Your Email" type="email" placeholder="john@example.com" theme={theme} />
            </div>
            <FormField label="Subject" type="text" placeholder="Project Inquiry" theme={theme} />
            <FormField label="Message" type="textarea" placeholder="Your message..." theme={theme} />

            <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Send className="w-5 h-5" />
                Send Message
            </motion.button>
        </form>
    );
}

function FormField({ label, type, placeholder, theme }) {
    return (
        <div>
            <label className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } mb-2`}>
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 resize-none ${
                        theme === 'dark'
                            ? 'bg-gray-700/30 border border-gray-700 text-white'
                            : 'bg-gray-100 border border-gray-200 text-gray-900'
                    }`}
                    placeholder={placeholder}
                ></textarea>
            ) : (
                <input
                    type={type}
                    className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 ${
                        theme === 'dark'
                            ? 'bg-gray-700/30 border border-gray-700 text-white'
                            : 'bg-gray-100 border border-gray-200 text-gray-900'
                    }`}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}