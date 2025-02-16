import { useEffect, useState } from 'react';
import { User, Mail, Phone, GraduationCap, Briefcase, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../contexts/ThemeContext';
import { personalInfoApi, skillsApi } from '../lib/api';
import { PersonalInfo, Skill } from '../lib/types';

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
        console.error('Error fetching personal info:', error);
      }
    }

    async function fetchSkills() {
      try {
        const data = await skillsApi.getAll();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="py-24 bg-white dark:bg-gray-800"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-top">
          {/* Avatar Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-100 h-100 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={personalInfo?.avatar_url || '/avatar.png'}
                alt="Profile"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {personalInfo?.name || 'John Doe'}
              </h2>
              <p className="text-xl md:text-2xl font-medium text-indigo-600 dark:text-indigo-400">
                {personalInfo?.title || 'Full Stack Developer'}
              </p>
              <div className="pt-4">
                <a
                  href={personalInfo?.resume_url || '#'}
                  download
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300"
                >
                  <Download size={20} className="mr-2" />
                  Download Resume
                </a>
              </div>
            </motion.div>

            {/* Details Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <User className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {personalInfo?.location || 'New York, USA'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Mail className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {personalInfo?.email || 'john@example.com'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Professional Bio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {personalInfo?.description ||
                  'Seasoned full-stack developer with 8+ years of experience in building scalable web applications. Specialized in modern JavaScript frameworks and cloud-native architectures. Passionate about creating efficient, maintainable code and mentoring development teams.'}
              </p>
            </motion.div>

            {/* Skills Section with Progress Bars */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Core Expertise
              </h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span>{skill.title}</span>
                      <span>{skill?.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${skill?.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience/Education Timeline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Experience & Education
              </h3>
              <div className="space-y-4">
                {personalInfo?.timeline?.map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-indigo-600 rounded-full" />
                      {index < personalInfo.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
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