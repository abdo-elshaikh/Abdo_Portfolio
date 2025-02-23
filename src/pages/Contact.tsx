import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Coffee } from "lucide-react";
import { useState } from "react";
import Alert from "../components/Alert";
import { contactsApi } from "../lib/api";
import type { Contact } from "../lib/types";

export default function Contact() {
  const [contactForm, setContactForm] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [alerts, setAlerts] = useState<{ id: string; type: "success" | "error"; message: string }[]>(
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await contactsApi.create(contactForm);
      if (data) {
        setAlerts([
          ...alerts,
          {
            id: Date.now().toString(),
            type: "success",
            message: "Message sent successfully!",
          },
        ]);
        setContactForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      setAlerts([
        ...alerts,
        {
          id: Date.now().toString(),
          type: "error",
          message: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Alerts */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() =>
              setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
            }
          />
        ))}
      </div>

      {/* Contact Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center flex flex-col items-center gap-4 mt-16"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
              <Coffee className="text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </span>
          </motion.h2>

          {/* Asymmetrical Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Information Card */}
            <motion.div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <ContactItem
                  icon={Mail}
                  title="Email"
                  value="hello@example.com"
                  link="mailto:hello@example.com"
                />
                <ContactItem
                  icon={Phone}
                  title="Phone"
                  value="+1 (234) 567-890"
                  link="tel:+1234567890"
                />
                <ContactItem
                  icon={MapPin}
                  title="Location"
                  value="San Francisco, CA"
                  link="https://maps.google.com"
                />
              </div>
            </motion.div>

            {/* Contact Form Card */}
            <motion.form
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700 col-span-1 md:col-span-2 lg:col-span-2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onSubmit={handleSubmit}
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Send Me a Message
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Your Name"
                  id="name"
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email Address"
                  id="email"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleChange}
                  required
                />
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-all"
                    placeholder="Share your project details or inquiry..."
                    required
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-6"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

// Reusable ContactItem Component
function ContactItem({ icon: Icon, title, value, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 rounded-xl transition-colors"
      whileHover={{ x: 5 }}
    >
      <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
        <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </div>
      <div>
        <h3 className="text-base font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h3>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </motion.a>
  );
}

// Reusable InputField Component
function InputField({
  label,
  id,
  type,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-all"
      />
    </div>
  );
}