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
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
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
                        >
                            <IconComponent className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                        </motion.div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <div className="flex items-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        <CountUp end={value} duration={2} suffix={suffix} />
                    </p>
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
            className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        My Stats
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
                        Here are some of my achievements and milestones that showcase my journey and expertise.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={stat.id}
                                {...stat}
                                delay={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}