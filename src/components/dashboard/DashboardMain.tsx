import { useState, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie,
} from "recharts";

// Sample data
const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

export default function DashboardMain() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">

            {/* Welcome Card */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Welcome back, John!</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Here's what's happening with your projects today.</p>
            </div>

            {/* Stats Cards */}
            {["Projects", "Completed", "Pending"].map((title, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h4>
                    <p className={`text-4xl font-bold ${index === 0 ? "text-indigo-600" : index === 1 ? "text-green-600" : "text-yellow-600"} mt-2`}>{[12, 8, 2][index]}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{index === 0 ? "Active" : index === 1 ? "Completed" : "Pending"} Projects</p>
                </div>
            ))}

            {/* Recent Activities */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h4>
                <ul className="space-y-4">
                    <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800 dark:text-white">Project X has been completed</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">2 hours ago</p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800 dark:text-white">Project Y has been completed</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">4 hours ago</p>
                        </div>
                    </li>
                    <li className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800 dark:text-white">Project Z has been completed</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">6 hours ago</p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Line Chart */}
            <div className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Performance</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" className="text-gray-500" />
                        <YAxis className="text-gray-500" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#22C55E" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Project Status</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={data} dataKey="pv" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#6366F1" label />
                        <Pie data={data} dataKey="uv" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#22C55E" label />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="col-span-1 sm:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Project Progress</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" className="text-gray-500" />
                        <YAxis className="text-gray-500" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#6366F1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
