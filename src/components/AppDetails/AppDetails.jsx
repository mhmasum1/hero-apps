import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingsChart from '../RatingsChart/RatingsChart';
import toast, { Toaster } from 'react-hot-toast';

const AppDetails = () => {
    const { id } = useParams();

    // 🔹 States for app data, loading animation, install button, and not-found message
    const [app, setApp] = useState(null);
    const [installed, setInstalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        // jokhn URL-er id change hoy, tokhn new data load suru hoy 
        setLoading(true);

        // appsFound.json theke data load
        fetch("/appsFound.json")
            .then(res => res.json())
            .then(data => {
                // id mil khuje target app khuje ana 
                const foundApp = data.find(item => item.id === parseInt(id));

                if (foundApp) {
                    //app paile state a set rakha
                    setApp(foundApp);
                    setNotFound(false);
                } else {
                    // na paile  notFound true kora
                    setNotFound(true);
                }

                // ⏹ loading ses
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading app details:", err);
                setNotFound(true);
                setLoading(false);
            });
    }, [id]);

    //  Install button click handeler
    const handleInstall = () => {
        setInstalled(true);
        toast.success(`${app.title} installed successfully!`);
    };

    // Loading spinner dekha jonne style overley
    if (loading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white/70 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // jdi data na paoya jay 
    if (notFound) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-gray-600">
                    ❌ App not found!
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">

                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <img
                        src={app.image}
                        alt={app.title}
                        className="w-48 h-48 rounded-2xl object-cover"
                    />

                    <div>
                        <h1 className="text-3xl font-bold mb-2">{app.title}</h1>
                        <p className="text-lg text-blue-600 mb-4">
                            Developed by {app.companyName}
                        </p>

                        <div className="flex gap-8 mb-6">
                            <div>
                                <p className="text-sm text-gray-600">Downloads</p>
                                <p className="text-2xl font-bold">{app.downloads}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Rating</p>
                                <p className="text-2xl font-bold">{app.ratingAvg}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Reviews</p>
                                <p className="text-2xl font-bold">{app.reviews}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleInstall}
                            disabled={installed}
                            className={`px-6 py-2 rounded text-white transition ${installed
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {installed ? 'Installed' : `Install Now (${app.size} MB)`}
                        </button>
                    </div>
                </div>

                <RatingsChart ratings={app.ratings} />

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p>{app.description}</p>
                </div>
            </div>

            <Toaster position="top-right" />
        </div>
    );
};

export default AppDetails;
