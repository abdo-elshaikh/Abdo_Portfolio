import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { PersonalInfo } from "../lib/types";
import { personalInfoApi } from "../lib/api";

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
    window.scrollTo({ top: 0, behavior: "smooth", });
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
      { icon: <Mail size={22} />, url: personalInfo.email, label: "Email" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 border-t border-gray-800 dark:from-gray-800 dark:to-gray-900 dark:text-gray-300">
      {/* Wave Animation */}
      <div className="relative overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute top-0 w-full opacity-25"
        >
          <path
            fill="currentColor"
            fillOpacity="0.3"
            d="M0,192L48,202.7C96,213,192,235,288,250.7C384,267,480,277,576,256C672,235,768,181,864,181.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192V320H0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div {...fadeIn} className="col-span-2">
            <h3 className="text-4xl font-extrabold text-cyan-400 mb-4">Abdo Mhmd</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Crafting digital experiences with passion and precision. Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              {links.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-cyan-500 transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.15, boxShadow: "0px 0px 15px rgba(255,255,255,0.4)" }}
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
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-cyan-400 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links.main.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `hover:text-cyan-400 transition-colors ${isActive ? "text-cyan-400" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-cyan-400 pb-2">
              Contact
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-cyan-400 transition-colors" aria-label="Location">
                {personalInfo.location}
              </li>
              <li className="hover:text-cyan-400 transition-colors" aria-label="Email">
                {personalInfo.email}
              </li>
              <li className="hover:text-cyan-400 transition-colors" aria-label="Phone number">
                {personalInfo.phone}
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
          <motion.p {...fadeIn} className="flex items-center gap-1 text-sm text-gray-300">
            Made with <Heart size={16} className="text-red-400" /> by Abdo Mhmd
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-full transition-all shadow-md hover:shadow-lg group"
            whileHover={{ scale: 1.15, boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} className="group-hover:text-gray-800 transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
