import React, { useEffect, useState } from "react";
import { Star, Download } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Installation = () => {
    // all installed apps rakhar jonne state create korbo
    const [installedApps, setInstalledApps] = useState([]);
    const [sortBy, setSortBy] = useState("size");

    // jokhn component ta load hobe 
    useEffect(() => {
        // localStorage theke installed app IDs nilam 
        const savedAppIds = JSON.parse(localStorage.getItem("installedApps")) || [];

        // kicu na thakle state faka rakhbo
        if (savedAppIds.length === 0) {
            setInstalledApps([]);
            return;
        }

        // appsFound.json theke sob app niye asbo
        fetch("/appsFound.json")
            .then((res) => res.json())
            .then((data) => {
                // only jegula  ID localStorage a pabo segula filter korbo
                const matchedApps = data.filter((app) => savedAppIds.includes(app.id));
                setInstalledApps(matchedApps);
            })
            .catch((err) => console.error("Error loading apps:", err));
    }, []);

    // 🔹 Uninstall handler
    const handleUninstall = (id, title) => {
        // localStorage theke id gula nebo
        const savedAppIds = JSON.parse(localStorage.getItem("installedApps")) || [];

        //uninstall korbo seta baad debo
        const updatedIds = savedAppIds.filter((appId) => appId !== id);

        // abar localStorage update korbo
        localStorage.setItem("installedApps", JSON.stringify(updatedIds));

        //UI theke baad debo
        setInstalledApps((prev) => prev.filter((app) => app.id !== id));
        toast.success(`${title} has been uninstalled.`);
    };

    // Sorting 
    const sortedApps = [...installedApps].sort((a, b) => {
        if (sortBy === "size") return b.size - a.size;
        if (sortBy === "rating") return b.ratingAvg - a.ratingAvg;
        if (sortBy === "downloads") return b.downloads - a.downloads;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Your Installed Apps
                    </h1>
                    <p className="text-gray-600 text-base">
                        Explore all apps you have installed.
                    </p>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className="text-lg font-semibold text-gray-900">
                        {sortedApps.length} Apps Found
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                        <option value="size">Sort By Size</option>
                        <option value="rating">Sort By Rating</option>
                        <option value="downloads">Sort By Downloads</option>
                    </select>
                </div>

                {sortedApps.length === 0 ? (
                    <div className="text-center text-gray-600 py-10">
                        No apps found
                    </div>
                ) : (
                    <div className="space-y-5">
                        {sortedApps.map((app) => (
                            <div
                                key={app.id}
                                className="bg-white rounded-xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                            >
                                <img
                                    src={app.image}
                                    alt={app.title}
                                    className="w-20 h-20 rounded-2xl object-cover"
                                />


                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {app.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-emerald-600">
                                            <Download size={16} />
                                            <span className="font-medium">{app.downloads}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                            <span className="text-gray-700 font-medium">
                                                {app.ratingAvg}
                                            </span>
                                        </div>
                                        <div className="text-gray-600">{app.size} MB</div>
                                    </div>
                                </div>


                                <button
                                    onClick={() => handleUninstall(app.id, app.title)}
                                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200 flex-shrink-0"
                                >
                                    Uninstall
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Toaster position="top-right" />
        </div>
    );
};

export default Installation;
