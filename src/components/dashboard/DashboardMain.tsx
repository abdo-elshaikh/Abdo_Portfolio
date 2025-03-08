export default function DashboardMain() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Projects</h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Skills</h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">8</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Experiences</h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">5</p>
                </div>
            </div>
        </div>
    );
}