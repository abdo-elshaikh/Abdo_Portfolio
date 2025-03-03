import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Coffee } from "lucide-react";
import { useState } from "react";
import Alert from "../components/Alert";
import { contactsApi } from "../lib/api";
import type { Contact, AlertProps } from "../lib/types";


export default function Contact() {
  // Contact Form State
  const [contactForm, setContactForm] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    message: "",
  } as Contact);

  // Alert State
  const [alert, setAlert] = useState<AlertProps>({ type: "hidden", message: "" });

  // Handle Form Submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await contactsApi.create(contactForm);
      setAlert({ type: "success", message: "Message sent successfully!" });
      setContactForm({ name: "", email: "", phone: "", message: "" } as Contact);
    } catch (error) {
      setAlert({ type: "error", message: "Failed to send message. Please try again." });
    }
  }

  // Handle Form Field Changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle Form Reset
  function handleReset() {
    setContactForm({ name: "", email: "", phone: "", message: "" } as Contact);
  }

  // Handle Alert Dismissal
  function handleAlertDismiss() {
    setAlert({ type: "hidden", message: "" });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/90"
    >
      {/* Alerts remain unchanged */}
      {alert.type !== "hidden" && (
        <Alert type={alert.type} message={alert.message} onClose={handleAlertDismiss} />
      )}

      {/* Contact Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div className="text-center mb-16 lg:mb-24">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-6">
              Let's Collaborate
            </h2>
            <p className="text-xl text-gray-600 dark:text-indigo-200/80 max-w-3xl mx-auto">
              I'm currently available for exciting projects and opportunities
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Information Card */}
            <motion.div
              className="bg-white/80 dark:bg-indigo-900/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-indigo-100/50 dark:border-indigo-800/50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-50 mb-6">
                Contact Details
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
              className="bg-white/80 dark:bg-indigo-900/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-indigo-100/50 dark:border-indigo-800/50 col-span-1 md:col-span-2 lg:col-span-2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onSubmit={handleSubmit}
            >
              <h3 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-50 mb-6">
                Send a Message
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
                    className="block text-sm font-medium text-gray-700 dark:text-indigo-200 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-indigo-900/30 border border-indigo-100/50 dark:border-indigo-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 dark:placeholder-indigo-400/80 text-gray-900 dark:text-indigo-50 transition-all"
                    placeholder="Share your project details or inquiry..."
                    required
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-6"
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

// Updated ContactItem Component
function ContactItem({ icon: Icon, title, value, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-4 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
      whileHover={{ x: 5 }}
    >
      <div className="p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h3 className="text-base font-medium text-indigo-700 dark:text-indigo-300">
          {title}
        </h3>
        <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
          {value}
        </p>
      </div>
    </motion.a>
  );
}

// Updated InputField Component
function InputField({ label, id, type, name, value, onChange, required = false }) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2"
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
        className="w-full px-4 py-3 bg-white/50 dark:bg-indigo-900/30 border border-indigo-100/50 dark:border-indigo-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-indigo-400/80 dark:placeholder-indigo-400/80 text-indigo-900 dark:text-indigo-50 transition-all"
      />
    </div>
  );
}