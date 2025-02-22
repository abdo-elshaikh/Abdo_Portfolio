import { motion } from "framer-motion";
import { Coffee, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-28 flex items-center justify-center"
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl rounded-[2rem] shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 sm:p-12 lg:p-16 border border-gray-200/50 dark:border-gray-700"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center flex flex-col items-center gap-4"
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

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Reach Out Directly
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

              <div className="mt-10 p-6 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600">
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
                  Office Hours
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Mon-Fri: 9AM - 5PM PST
                  <br />
                  Weekends: By appointment
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="space-y-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="grid gap-6">
                <InputField
                  label="Your Name"
                  id="name"
                  type="text"
                  icon="user"
                />
                <InputField
                  label="Email Address"
                  id="email"
                  type="email"
                  icon="at-sign"
                />
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-all"
                    placeholder="Share your project details or inquiry..."
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
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

function InputField({ label, id, type, icon }) {
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
        className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-all"
      />
    </div>
  );
}
