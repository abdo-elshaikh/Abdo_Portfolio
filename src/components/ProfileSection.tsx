import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { educationApi, personalInfoApi } from "../lib/api";
import { useEffect, useState } from "react";
import { PersonalInfo, Education } from "../lib/types";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerItems = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function ProfileSection() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  if (!personalInfo) return null;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerItems}
        >
          {/* Personal Information Card */}
          <motion.div
            className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-blue-500/10 dark:bg-cyan-500/10 rounded-full">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-cyan-500" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {personalInfo.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {personalInfo.title}
                  </p>
                </div>
              </div>

              <p className="text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {personalInfo.description}
              </p>

              <hr className="border-gray-200 dark:border-gray-700 mb-6" />

              <div className="space-y-4">
                {[
                  {
                    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" />,
                    label: "Email",
                    value: personalInfo.email,
                  },
                  {
                    icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" />,
                    label: "Phone",
                    value: personalInfo.phone,
                  },
                  {
                    icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" />,
                    label: "Location",
                    value: personalInfo.location,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    variants={fadeIn}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div className="space-y-8" variants={fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Education Timeline
            </h2>

            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-200 to-cyan-200 dark:from-gray-700 dark:to-gray-600 rounded-full" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12 mb-8 last:mb-0 group"
                  variants={fadeIn}
                >
                  <div className="absolute left-0 top-2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-cyan-600 dark:bg-cyan-700 rounded-full shadow-lg">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {edu.period}
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}