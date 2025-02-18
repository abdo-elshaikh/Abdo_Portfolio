import { motion } from "framer-motion";
import { Coffee, Users, Award, CheckCircle, Calendar, User } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Stat } from "../lib/types";
import { statsApi } from "../lib/api";
import { useEffect, useState } from "react";

interface StatCardProps extends Stat {
    delay: number;
}

const StatCard = ({ icon, value, suffix, title, delay }: StatCardProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const IconComponent = {
        coffee: Coffee,
        users: Users,
        award: Award,
        "check-circle": CheckCircle,
        calendar: Calendar,
        user: User
    }[icon];

    return (
        <motion.div
            ref={ref}
            className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: delay * 0.1 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {IconComponent && (
                        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }}>
                            <IconComponent className="w-12 h-12 text-blue-700 dark:text-cyan-400" />
                        </motion.div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    <CountUp end={value} duration={2} separator="," />
                    {suffix && <span className="text-gray-600 dark:text-gray-400">{suffix}</span>}
                </p>
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
            className="py-16 md:py-24 relative bg-gradient-to-br from-blue-800 to-cyan-500 dark:from-gray-900 dark:to-gray-700 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 dark:from-cyan-300 dark:to-blue-500 bg-clip-text text-transparent">
                        My Stats
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-center text-lg mb-16 max-w-2xl mx-auto">
                        Here are some of my achievements and milestones that showcase my journey and expertise.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <StatCard key={stat.id} {...stat} delay={index} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
