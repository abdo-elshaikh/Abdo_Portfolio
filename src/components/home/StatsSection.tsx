import { motion } from "framer-motion";
import { Coffee, Users, Award, CheckCircle, Calendar, User, CalendarCheck, Code2 } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Stat } from "../../lib/types";
import { statsApi } from "../../lib/api";
import { useEffect, useState } from "react";

interface StatCardProps extends Stat {
  delay: number;
}

const StatCard = ({ icon, value, suffix, title, delay }: StatCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Allow re-triggering
    threshold: 0.2,
  });

  const IconComponent = {
    coffee: Coffee,
    users: Users,
    award: Award,
    calendar: Calendar,
    user: User,
    "check-circle": CheckCircle,
    "calendar-check": CalendarCheck,
    code: Code2,
  }[icon];

  return (
    <motion.div
      ref={ref}
      className="p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/10 dark:border-gray-700/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: delay * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {IconComponent && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg"
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
          )}
          <h3 className="text-xl font-semibold text-white dark:text-gray-100">
            {title}
          </h3>
        </div>
        <div className="text-4xl font-bold text-white dark:text-gray-100">
          {inView && (
            <CountUp
              end={value}
              duration={3}
              suffix={suffix}
              separator=","
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const data = await statsApi.getAll();
      if (data) setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <motion.section
      className="py-20 md:py-32 relative bg-gradient-to-br from-purple-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-500/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-400 dark:to-pink-300 bg-clip-text text-transparent mb-4">
              By the Numbers
            </h2>
            <p className="text-lg text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
              Quantifying my journey through milestones, achievements, and impact.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {stats.map((stat, index) => (
              <StatCard key={stat.id} {...stat} delay={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}