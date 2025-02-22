import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../contexts/ThemeContext";
import { personalInfoApi, skillsApi } from "../lib/api";
import { PersonalInfo, Skill } from "../lib/types";

export default function About() {
  const { theme } = useTheme();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await personalInfoApi.get();
        setPersonalInfo(data as PersonalInfo);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    }

    async function fetchSkills() {
      try {
        const data = await skillsApi.getAll();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    }

    fetchData();
    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-24 bg-gray-50 dark:bg-gray-900"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Avatar Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center relative group"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl isolate">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-20 blur-3xl -z-10" />
              <img
                src={"/abdo.jpg"}
                alt="Profile"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="lg:col-span-7 space-y-12">
            {/* Header Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {personalInfo?.name || "John Doe"}
                </h2>
                <p className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
                  {personalInfo?.title || "Full Stack Developer"}
                </p>
              </div>

              <motion.a
                href={personalInfo?.resume_url || "#"}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Download size={24} className="mr-3" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Details Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  icon: User,
                  label: "Location",
                  value: personalInfo?.location,
                },
                { icon: Mail, label: "Email", value: personalInfo?.email },
                { icon: Phone, label: "Phone", value: personalInfo?.phone },
                {
                  icon: GraduationCap,
                  label: "Education",
                  value: personalInfo?.education,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                      <item.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.value || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Professional Journey
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-200/50 dark:border-gray-700">
                {personalInfo?.description ||
                  "Seasoned full-stack developer with 8+ years of experience in building scalable web applications. Specialized in modern JavaScript frameworks and cloud-native architectures. Passionate about creating efficient, maintainable code and mentoring development teams."}
              </p>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.title}
                      </span>
                      <span className="text-sm text-cyan-600 dark:text-cyan-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          inView ? { width: `${skill.proficiency}%` } : {}
                        }
                        transition={{ duration: 1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Career Timeline
              </h3>
              <div className="space-y-8 relative pl-6 border-l-2 border-gray-200/50 dark:border-gray-700">
                {personalInfo?.timeline?.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute w-4 h-4 bg-cyan-500 rounded-full -left-[21px] top-5 ring-4 ring-white dark:ring-gray-900" />
                    <div className="ml-8 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700 hover:border-cyan-500/30 transition-colors">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
