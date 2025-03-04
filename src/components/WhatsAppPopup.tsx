import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { personalInfoApi } from "../lib/api";
import { PersonalInfo } from "../lib/types";

const WhatsAppPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const data = await personalInfoApi.get();
                setPersonalInfo(data);
            } catch (error) {
                console.error("Failed to fetch personal info:", error);
            }
        };
        fetchPersonalInfo();
    }, []);

    const togglePopup = () => setIsOpen((prev) => !prev);

    // Ensure WhatsApp number is valid
    const phoneNumber = personalInfo?.whatsapp?.replace(/\D/g, "");
    const whatsappUrl = phoneNumber
        ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello! I'm interested in your services.")}`
        : "#";

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Floating Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePopup}
                        className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none"
                        aria-label="Chat with us on WhatsApp"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Popup Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        className="absolute bottom-20 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-green-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-white" />
                                <h3 className="text-white font-semibold">Chat with Us</h3>
                            </div>
                            <button
                                onClick={togglePopup}
                                className="p-1 rounded-full hover:bg-green-700/30 transition-colors focus:outline-none"
                                aria-label="Close chat popup"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Hi there! 👋 How can we help you today?
                            </p>

                            {/* WhatsApp Number */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                WhatsApp Number:{" "}
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:underline"
                                >
                                    {personalInfo?.whatsapp}
                                </a>
                            </p>

                            {/* WhatsApp QR Code */}
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${whatsappUrl}`}
                                alt="WhatsApp QR Code"
                                className="w-25 h-25 mx-auto mb-4"
                            />

                            {/* WhatsApp Message */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                Or you can send us a message directly:
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Message:</strong> Hello! I'm interested in your services.
                            </p>

                            {/* Action Button */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${phoneNumber
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                                aria-disabled={!phoneNumber}
                            >
                                <MessageCircle className="w-4 h-4" />
                                Start Chat
                            </a>
                        </div>

                        {/* Footer */}
                        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                We typically reply within minutes
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhatsAppPopup;
