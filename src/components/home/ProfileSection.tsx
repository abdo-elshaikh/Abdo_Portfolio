import { motion } from "framer-motion";
import { User, Mail, Phone, GraduationCap, Linkedin, Github, MessageSquare, Globe } from "lucide-react";
import { educationApi, personalInfoApi } from "../../lib/api";
import { useEffect, useState } from "react";
import { PersonalInfo, Education } from "../../lib/types";
import image from "/main_5.jpg";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerItems = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const cardHover = {
  hover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
};

export default function ProfileSection() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalData, educationData] = await Promise.all([
          personalInfoApi.get(),
          educationApi.getAll(),
        ]);
        setPersonalInfo(personalData);
        setEducation(educationData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  if (!personalInfo) return null;

  const contactIcons = [
    { icon: <Mail />, href: `mailto:${personalInfo.email}`, label: "Email" },
    { icon: <Phone />, href: `tel:${personalInfo.phone}`, label: "Phone" },
    { icon: <MessageSquare />, href: `https://wa.me/${personalInfo.whatsapp?.replace(/\D/g, "")}`, label: "WhatsApp" },
    { icon: <Globe />, href: personalInfo.website_url, label: "Website" },
    { icon: <Linkedin />, href: personalInfo.linkedin_url, label: "LinkedIn" },
    { icon: <Github />, href: personalInfo.github_url, label: "GitHub" },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b to-purple-50/50 from-indigo-50/50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          animate="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerItems}
        >
          {/* Enhanced Profile Card */}
          <motion.div
            className="md:col-span-2 lg:col-span-1 rounded-3xl shadow-lg bg-white dark:bg-gray-800 relative overflow-hidden group"
            variants={fadeIn}
            whileHover="hover"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-gray-900/50 dark:to-gray-800/50" />
            <img
              src={image}
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-20 dark:opacity-10 transition-opacity duration-300 group-hover:opacity-30"
            />
            <motion.div
              className="relative p-8 backdrop-blur-sm"
              variants={{
                hover: { scale: 0.98 }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-6"
                  whileHover={{ rotate: 15, scale: 1.05 }}
                >
                  <User className="w-14 h-14 text-white" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {personalInfo.name}
                  </h1>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {personalInfo.title}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {personalInfo.description}
                </p>

                <div className="w-full border-t border-gray-200 dark:border-gray-700" />

                <div className="flex justify-center space-x-3">
                  {contactIcons.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 transition-colors relative"
                      whileHover={{ y: -3 }}
                      aria-label={item.label}
                    >
                      {item.icon}
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-gray-500 dark:text-gray-400">
                        {item.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Education Timeline */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 space-y-8"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Academic Journey
            </h2>

            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800/50 dark:to-purple-800/50" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12 mb-8 last:mb-0"
                  variants={fadeIn}
                  whileHover={{ x: 5 }}
                >
                  <div className="absolute left-0 top-2 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>

                  <motion.div
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative before:absolute before:-left-1 before:top-6 before:w-2 before:h-2 before:bg-purple-500 before:rounded-full"
                    variants={cardHover}
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.period}
                      </p>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}