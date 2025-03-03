import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, ArrowUp, MapPin, Phone } from "lucide-react";
import { PersonalInfo } from "../../lib/types";
import { personalInfoApi } from "../../lib/api";

export default function Footer() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({} as PersonalInfo);

  useEffect(() => {
    async function fetchPersonalInfo() {
      const data = await personalInfoApi.get();
      if (data) setPersonalInfo(data);
    }

    fetchPersonalInfo();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const links = {
    main: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Projects", path: "/projects" },
      { label: "Experience", path: "/experience" },
      { label: "Contact", path: "/contact" },
    ],
    social: [
      { icon: <Github size={22} />, url: personalInfo.github_url, label: "GitHub" },
      { icon: <Linkedin size={22} />, url: personalInfo.linkedin_url, label: "LinkedIn" },
      { icon: <Mail size={22} />, url: `mailto:${personalInfo.email}`, label: "Email" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-purple-900 text-gray-100 border-t border-gray-800/50">
      {/* Animated Gradient Waves */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-20 left-0 right-0 h-48 w-[200%] animate-wave bg-[linear-gradient(90deg,rgba(139,92,246,0.1)_25%,rgba(99,102,241,0.2)_50%,rgba(139,92,246,0.1)_75%)]"></div>
        <div className="absolute -top-40 left-0 right-0 h-48 w-[200%] animate-wave bg-[linear-gradient(90deg,rgba(99,102,241,0.1)_25%,rgba(139,92,246,0.2)_50%,rgba(99,102,241,0.1)_75%)] animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div {...fadeIn} className="col-span-2">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Crafting exceptional digital experiences with modern technologies and innovative solutions.
            </p>
            <div className="flex space-x-4">
              {links.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="p-3 bg-white/5 rounded-lg hover:bg-gradient-to-br from-purple-600 to-pink-500 transition-all shadow-lg hover:shadow-purple-500/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <h4 className="text-lg font-semibold text-purple-300 mb-4 pb-2 border-b border-purple-500/30">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links.main.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `hover:text-purple-300 transition-colors ${isActive ? "text-purple-400 font-medium" : "text-gray-300"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <h4 className="text-lg font-semibold text-purple-300 mb-4 pb-2 border-b border-purple-500/30">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <MapPin size={18} className="text-purple-400" />
                {personalInfo.location}
              </li>
              <li className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <Mail size={18} className="text-purple-400" />
                {personalInfo.email}
              </li>
              <li className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <Phone size={18} className="text-purple-400" />
                {personalInfo.phone}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-500/20">
          <motion.p {...fadeIn} className="flex items-center gap-2 text-sm text-gray-300">
            Crafted with <Heart size={16} className="text-pink-400 animate-pulse" /> by {personalInfo.name}
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-lg transition-all shadow-lg hover:shadow-purple-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}