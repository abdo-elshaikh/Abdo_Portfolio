import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, GraduationCap, icons } from "lucide-react";
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
                    // whatsapp
                    label: "WhatsApp",
                    value: personalInfo.whatsapp,
                    icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
                      <g fill="#40c057" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" >
                        <g transform="scale(4,4)">
                          <path d="M32,8c-13.255,0 -24,10.297 -24,23c0,4.509 1.35922,8.71172 3.69922,12.26172l-1.69922,12.73828l15.40039,-2.88867c2.097,0.574 4.30961,0.88867 6.59961,0.88867c13.255,0 24,-10.297 24,-23c0,-12.703 -10.745,-23 -24,-23zM32,11.42969c5.802,-0.059 11.59145,2.50811 15.43945,6.91211c3.884,4.38 5.58761,10.60853 4.47461,16.39453c-1.065,5.818 -4.99102,10.93728 -10.16602,13.73828c-5.056,2.711 -11.26312,3.22741 -16.70312,1.31641l-9.78125,2.17383l-1.5293,0.33984l0.28906,-1.52148v-0.00195l1.34961,-8.2207c-0.862,-1.38 -1.59149,-2.82694 -2.14649,-4.33594c-0.612,-1.744 -1.01806,-3.55091 -1.16406,-5.37891c-0.072,-0.914 -0.08667,-1.82923 -0.01367,-2.74023c0.017,-0.916 0.17312,-1.81875 0.32813,-2.71875c0.392,-1.779 0.93931,-3.54158 1.82031,-5.14258c0.843,-1.612 1.8793,-3.13741 3.1543,-4.44141c0.596,-0.692 1.31724,-1.25809 1.99023,-1.87109c0.738,-0.533 1.44409,-1.11669 2.24609,-1.55469c3.104,-1.932 6.76611,-2.87527 10.41211,-2.94726zM31.99609,14c-3.193,0.024 -6.41302,0.79503 -9.16602,2.45703c-0.713,0.373 -1.33514,0.88284 -1.99414,1.33984c-0.595,0.535 -1.24753,1.01786 -1.76953,1.63086c-1.131,1.141 -2.04397,2.48153 -2.79297,3.89453c-1.49,2.845 -2.06323,6.12483 -1.74023,9.29883c0.362,3.169 1.76306,6.19475 3.91406,8.46875v0.00195l0.46484,0.57031l-0.18359,0.6543l-1.89648,6.73047l8.07617,-2.61914l0.00195,-0.00195l0.4375,-0.14062l0.46484,0.18359c4.618,1.819 10.00592,1.48812 14.41992,-0.79687c4.395,-2.311 7.77728,-6.59109 8.73828,-11.49609c1.001,-4.891 -0.35744,-10.20058 -3.64844,-14.01758c-3.264,-3.833 -8.24417,-6.1412 -13.32617,-6.1582zM24.39258,21.24805c0.566,0.002 2.16992,0 2.16992,0l2.16992,5.42383c-0.772,1.209 -1.56563,1.88397 -2.14062,2.54297c0.321,0.782 1.63636,2.73256 3.19336,4.10156c2.007,1.76 3.74628,2.58222 4.98828,2.82422c0.65,-0.484 2.28967,-2.44098 2.63867,-2.95898l5.42383,2.16992c0,1.085 -0.14003,1.65724 -0.58203,2.86523c-0.434,1.208 -2.52706,2.31203 -3.53906,2.45703c-0.902,0.136 -2.04178,0.18787 -3.30078,-0.20312c-0.757,-0.238 -1.73437,-0.55384 -2.98437,-1.08984c-5.256,-2.245 -8.69108,-7.46741 -8.95508,-7.81641c-0.255,-0.34 -2.13477,-2.80661 -2.13477,-5.34961c0,-2.543 1.35094,-3.80131 1.83594,-4.32031c0.476,-0.519 0.8688,-0.64848 1.2168,-0.64648z"></path></g></g>
                    </svg>
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