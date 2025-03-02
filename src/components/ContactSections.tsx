import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Contact, PersonalInfo, AlertProps } from "../lib/types";
import Alert from "./Alert";

interface ContactSectionProps {
    contactInfo: PersonalInfo | null;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    contactForm: Contact;
    isLoading: boolean;
    alert: AlertProps | null;
}

export default function ContactSection({
    contactInfo,
    onSubmit,
    onChange,
    contactForm,
    isLoading,
    alert,
}: ContactSectionProps) {
    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Me
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Have a project in mind or just want to chat? Drop me a message!
            </p>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <ContactItem
                    icon={Mail}
                    title="Email"
                    value={contactInfo?.email}
                    link={`mailto:${contactInfo?.email}`}
                />
                <ContactItem
                    icon={Phone}
                    title="Phone"
                    value={contactInfo?.phone}
                    link={`tel:${contactInfo?.phone}`}
                />
                <ContactItem
                    icon={MapPin}
                    title="Location"
                    value={contactInfo?.location}
                    link={`https://www.google.com/maps/search/${contactInfo?.location}`}
                />
            </div>

            {/* Contact Form */}
            <motion.form
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700 space-y-6"
                onSubmit={onSubmit}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={contactForm.name}
                        onChange={onChange}
                    />
                    <InputField
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={contactForm.phone}
                        onChange={onChange}
                    />
                    <InputField
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={contactForm.email}
                        onChange={onChange}
                    />
                </div>

                <InputField
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={onChange}
                />

                <textarea
                    placeholder="Your Message..."
                    rows={5}
                    name="message"
                    value={contactForm.message}
                    onChange={onChange}
                    className="w-full p-4 bg-gray-50/50 dark:bg-gray-700/30 text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />

                {isLoading ? (
                    <motion.button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-gray-400 text-white rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                        whileTap={{ scale: 0.98 }}
                        disabled
                    >
                        <Send className="w-5 h-5" />
                        Sending...
                    </motion.button>
                ) : (
                    <motion.button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                        whileTap={{ scale: 0.98 }}
                    >
                        <Send className="w-5 h-5" />
                        Send Message
                    </motion.button>
                )}
            </motion.form>
        </motion.div>
    );
}

// ContactItem Component
function ContactItem({ icon: Icon, title, value, link }: { icon: React.FC, title: string, value: string, link: string }) {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-white/50 dark:bg-gray-700/30 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 dark:border-gray-600 transition-all hover:border-cyan-500/50 hover:shadow-lg"
            whileHover={{ x: 5 }}
        >
            <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="text-left">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {title}
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {value}
                </p>
            </div>
        </motion.a>
    );
}

// InputField Component
function InputField({
    type,
    placeholder,
    name,
    value,
    onChange,
    className = "",
}: {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
}) {
    return (
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-4 bg-gray-50/50 dark:bg-gray-700/30 text-gray-900 dark:text-white rounded-xl border border-gray-200/50 dark:border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${className}`}
        />
    );
}