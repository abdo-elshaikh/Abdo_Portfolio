import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Globe } from "lucide-react";
import { contactsApi, personalInfoApi } from "../../lib/api";
import { Contact, PersonalInfo } from "../../lib/types";
import Alert from "../Alert";

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

  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await personalInfoApi.get();
      setContactInfo(data as PersonalInfo);
    };
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setAlert({ type: "info", message: "Please fill in all required fields" });
      return;
    }

    setIsLoading(true);
    try {
      await contactsApi.create(contactForm);
      setAlert({ type: "success", message: "Message sent successfully!" });
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setAlert({ type: "error", message: "Failed to send message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Let's Collaborate
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Have a project in mind? Let's discuss how we can work together.
              </p>
            </div>

            <div className="space-y-4">
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
                icon={MessageCircle}
                title="Messaging"
                value="@telegram_handle"
                link={`https://t.me/${contactInfo?.telegram}`}
              />
              <ContactItem
                icon={Globe}
                title="Location"
                value={contactInfo?.location}
                link={`https://maps.google.com?q=${contactInfo?.location}`}
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <div className="grid gap-4">
              <InputField
                name="name"
                placeholder="Full Name"
                value={contactForm.name}
                onChange={handleChange}
                required
              />
              <InputField
                name="email"
                type="email"
                placeholder="Email Address"
                value={contactForm.email}
                onChange={handleChange}
                required
              />
              <InputField
                name="phone"
                placeholder="Phone Number (Optional)"
                value={contactForm.phone}
                onChange={handleChange}
              />
              <InputField
                name="subject"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your message..."
                value={contactForm.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={5}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              <Send className="w-5 h-5" />
              {isLoading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const ContactItem = ({ icon: Icon, title, value, link }: { icon: any; title: string; value?: string; link?: string }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
  >
    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-gray-900 dark:text-white">{value || "-"}</p>
    </div>
  </motion.a>
);

const InputField = ({ name, type = "text", placeholder, value, onChange, required }: {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
  />
);