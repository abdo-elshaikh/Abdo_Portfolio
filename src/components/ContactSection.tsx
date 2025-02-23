import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { contactsApi, personalInfoApi } from "../lib/api";
import type { Contact, PersonalInfo } from "../lib/types";
import Alert from "./Alert";

type AlertType = {
    message: string;
    type: "success" | "error" | "warning" | "info";
};

export default function ContactSection() {
    const [contactForm, setContactForm] = useState<Contact>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<AlertType | null>(null);
    const [contactInfo, setContactInfo] = useState<PersonalInfo | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (
            !contactForm.name ||
            !contactForm.email ||
            !contactForm.phone ||
            !contactForm.message
        ) {
            setAlert({
                type: "info",
                message: "Please fill in all fields",
            });
            return;
        }
        setIsLoading(true);
        try {
            const data = await contactsApi.create(contactForm);
            if (data) {
                setAlert({
                    type: "success",
                    message:
                        "Your message has been sent successfully. We will contact you soon!",
                });
                setContactForm({
                    name: "",
                    email: "",
                    subject: "",
                    phone: "",
                    message: "",
                } as Contact);
            }
        } catch (error) {
            console.error(error);
            setAlert({
                type: "error",
                message: "Something went wrong. Please try again later!",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setContactForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchContactInfo = async () => {
            const data = await personalInfoApi.get();
            setContactInfo(data);
        };

        fetchContactInfo();
    }, []);

    return (
        <section
            id="contact"
            className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Contact Information */}
                <motion.div
                    className="space-y-8 text-center lg:text-left"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Let's Connect
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                            Have a project in mind or just want to chat? Drop me
                            a message and I'll get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <ContactItem
                            icon={Mail}
                            title="Email"
                            value={contactInfo?.email}
                            link="mailto:contact@example.com"
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
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    className="bg-white dark:bg-gray-800/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700 space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleChange}
                        />
                        <InputField
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleChange}
                        />
                        <InputField
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={contactForm.email}
                            onChange={handleChange}
                        />
                    </div>

                    <InputField
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleChange}
                    />

                    <textarea
                        placeholder="Your Message..."
                        rows={5}
                        name="message"
                        value={contactForm.message}
                        onChange={handleChange}
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
            </div>
        </section>
    );
}

function ContactItem({ icon: Icon, title, value, link }) {
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

function InputField({
    type,
    placeholder,
    name,
    value,
    onChange,
    className = "",
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
