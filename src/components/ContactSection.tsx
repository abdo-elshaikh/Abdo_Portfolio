import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT SIDE - Contact Info */}
                <motion.div
                    className="space-y-6 text-center md:text-left px-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                            Get in Touch
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Feel free to reach out for collaborations, inquiries, or just to say hi!
                    </p>

                    <div className="space-y-4 flex flex-col items-center md:items-start">
                        <ContactItem icon={Mail} title="Email" value="hello@example.com" />
                        <ContactItem icon={Phone} title="Phone" value="+123 456 7890" />
                        <ContactItem icon={MapPin} title="Location" value="Cairo, Egypt" />
                    </div>
                </motion.div>

                {/* RIGHT SIDE - Contact Form */}
                <motion.form
                    className="bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-40 backdrop-blur-md shadow-xl p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-500 space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField type="text" placeholder="Your Name" />
                        <InputField type="email" placeholder="Your Email" />
                    </div>
                    <InputField type="text" placeholder="Subject" className="mt-4" />
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        className="w-full p-4 mt-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-cyan-500 shadow-lg"
                    ></textarea>

                    {/* Animated Send Button */}
                    <motion.button
                        type="submit"
                        className="mt-4 w-full md:w-auto px-8 py-3 text-lg bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 flex items-center justify-center gap-2 transition-all duration-200 transform hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Send className="w-6 h-6" /> Send Message
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}

/* ========== CONTACT ITEM COMPONENT ========== */
function ContactItem({ icon: Icon, title, value }) {
    return (
        <motion.div
            className="flex items-center gap-4 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-50 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full sm:w-80"
            whileHover={{ scale: 1.05 }}
        >
            <Icon className="w-8 h-8 text-cyan-500" />
            <div>
                <h3 className="text-md font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value}</p>
            </div>
        </motion.div>
    );
}

/* ========== INPUT FIELD COMPONENT ========== */
function InputField({ type, placeholder, className = "" }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-cyan-500 shadow-lg ${className}`}
        />
    );
}
