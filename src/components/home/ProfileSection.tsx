import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { educationApi, personalInfoApi } from "../../lib/api";
import { useEffect, useState } from "react";
import { PersonalInfo, Education } from "../../lib/types";

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
    <section
      id="profile"
      className="py-16 md:py-20 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 dark:from-gray-800 dark:to-gray-900"
    >
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
            className="relative bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/30 dark:to-purple-900/20 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow backdrop-blur-sm border border-indigo-100 dark:border-purple-800"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-white/50 dark:bg-indigo-900/20 backdrop-blur-sm rounded-3xl" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-indigo-50">
                    {personalInfo.name}
                  </h2>
                  <p className="text-lg text-purple-600 dark:text-purple-300 mt-1">
                    {personalInfo.title}
                  </p>
                </div>
              </div>

              <p className="text-base text-indigo-800/90 dark:text-indigo-200/80 mb-8 leading-relaxed">
                {personalInfo.description}
              </p>

              <hr className="border-indigo-100/50 dark:border-purple-800/50 mb-6" />

              <div className="space-y-4">
                {[
                  {
                    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-purple-400" />,
                    label: "Email",
                    value: personalInfo.email,
                  },
                  {
                    icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-purple-400" />,
                    label: "Phone",
                    value: personalInfo.phone,
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-purple-400"
                      >
                        <path fill="currentColor" d="M45.4 177.95C49.8 166.25 56.2 136.15 56.2 136.15s-14.7-7.3-14.7-29.6c0-22.3 14.4-34.1 32.1-34.1 17.7 0 26.3 10.7 26.3 32.8 0 24.6-14.4 50.1-34.4 50.1-4.8 0-8.4-2.4-10.5-5.3m83.1 3.1c-6.6 3.7-15.5 6.4-22.9 6.4-23.1 0-35.8-15.5-35.8-44.5 0-34.3 24.6-70.4 64.3-70.4 31.1 0 50.7 20.8 50.7 48.6 0 30.1-17.9 52.5-43.6 52.5-4.8 0-9.5-.8-13.3-2.4-1.7-.6-10.9-4.6-10.9-4.6s-7.7 30.5-9.3 36.7c-2.7 8.1-8.1 16.1-12.7 21.6 12.1 3.7 25.4 5.8 39.6 5.8 57.8 0 87.4-25.6 87.4-72.3 0-56.6-50.9-95.7-101.9-95.7C71.6 2.95 21 48.35 21 108.95c0 34.3 17.2 57.4 43.9 57.4 5.2 0 10.4-.6 13.6-2.4 1.2-.5 11.2-4.8 11.2-4.8s-2.1 8.5-2.1 13.1c0 13.1 7.6 23.3 19.2 23.3 9.9 0 20.2-6.2 26.4-15.5 3.7-5.5 7.1-12.7 9.3-20.4l9.6-35.5c3.4-12.8 6.7-25.5 6.7-35.9 0-16.7-10.7-25.4-23.1-25.4-18.9 0-27.8 19.5-27.8 35.9 0 13.1 5.5 21.1 5.5 21.1s-19.3 83.9-22.6 97.8c-6.3 26.5-3 60.5-1.8 63.1.3.6 1.2.8 1.8.8 1.8s.5-1.2 1.4-3.4c1.1-2.7 2.6-6.6 4.1-11.1 3.5-10.3 7.7-23.3 10.5-33.6l16.1-60.2c1.1-4.3 2.3-8.5 3.4-12.7z" />
                      </svg>
                    ),
                    label: "WhatsApp",
                    value: personalInfo.whatsapp,
                  },
                  {
                    icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-purple-400" />,
                    label: "Location",
                    value: personalInfo.location,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 sm:p-5 bg-white/80 dark:bg-purple-900/20 rounded-xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm border border-indigo-100/50 dark:border-purple-800/30"
                    variants={fadeIn}
                  >
                    <div className="flex-shrink-0 p-2 bg-indigo-100/50 dark:bg-purple-800/30 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-indigo-600/90 dark:text-purple-300">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base text-indigo-900 dark:text-indigo-50 font-medium">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-indigo-50">
              Education Timeline
            </h2>

            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-indigo-200 to-purple-200 dark:from-indigo-600 dark:to-purple-500 rounded-full" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12 mb-8 last:mb-0 group"
                  variants={fadeIn}
                >
                  <div className="absolute left-0 top-2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-4 p-6 bg-white/80 dark:bg-purple-900/20 rounded-2xl shadow-sm hover:shadow-md transition-all backdrop-blur-sm border border-indigo-100/50 dark:border-purple-800/30">
                    <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-50 mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-indigo-600/80 dark:text-purple-300/90 mb-3">
                      {edu.period}
                    </p>
                    <p className="text-base text-indigo-800/90 dark:text-indigo-200/80 leading-relaxed">
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
