import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingsChart from '../RatingsChart/RatingsChart';
import toast, { Toaster } from 'react-hot-toast';
import downloadImg from '../../../public/assets/icon-downloads.png';
import averImg from '../../../public/assets/icon-ratings.png';
import reviewImg from '../../../public/assets/icon-review.png';

const AppDetails = () => {
    const { id } = useParams();

    const [app, setApp] = useState(null);
    const [installed, setInstalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch("/appsFound.json")
            .then(res => res.json())
            .then(data => {
                const foundApp = data.find(item => item.id === parseInt(id));
                if (foundApp) {
                    setApp(foundApp);
                    setNotFound(false);
                } else {
                    setNotFound(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading app details:", err);
                setNotFound(true);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const installedApps = JSON.parse(localStorage.getItem("installedApps")) || [];
        setInstalled(installedApps.includes(parseInt(id)));
    }, [id]);


    const handleInstall = () => {
        const installedApps = JSON.parse(localStorage.getItem("installedApps")) || [];
        if (installedApps.includes(app.id)) {
            toast.error(`${app.title} is already installed!`);
            return;
        }

        installedApps.push(app.id);
        localStorage.setItem("installedApps", JSON.stringify(installedApps));
        setInstalled(true);
        toast.success(`${app.title} installed successfully!`);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-white/70 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-gray-600">❌ App not found!</p>
            </div>
        );
    }

    return (
        <div className="mx-auto p-6 max-w-7xl">
            <div className="bg-white rounded-lg shadow-lg p-8">

                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex-shrink-0 flex justify-center items-center">
                        <img
                            src={app.image}
                            alt={app.title}
                            className="w-64 h-full object-cover rounded-2xl md:h-auto md:max-h-[320px]"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{app.title}</h1>
                            <p className="text-lg text-blue-600 mb-4">
                                Developed by {app.companyName}
                            </p>

                            <div className="flex gap-8 mb-6">
                                <div className="text-center">
                                    <img src={downloadImg} alt="" className="mx-auto w-8 h-8" />
                                    <p className="text-sm text-gray-600">Downloads</p>
                                    <p className="text-2xl font-bold">{app.downloads}</p>
                                </div>
                                <div className="text-center">
                                    <img src={averImg} alt="" className="mx-auto w-8 h-8" />
                                    <p className="text-sm text-gray-600">Avg Rating</p>
                                    <p className="text-2xl font-bold">{app.ratingAvg}</p>
                                </div>
                                <div className="text-center">
                                    <img src={reviewImg} alt="" className="mx-auto w-8 h-8" />
                                    <p className="text-sm text-gray-600">Reviews</p>
                                    <p className="text-2xl font-bold">{app.reviews}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleInstall}
                            disabled={installed}
                            className={`px-6 py-2 rounded text-white font-semibold transition ${installed
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {installed ? 'Installed' : `Install Now (${app.size} MB)`}
                        </button>
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />
                <RatingsChart ratings={app.ratings} />
                <hr className="my-6 border-gray-300" />

                <div>
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{app.description}</p>
                </div>
            </div>

            <Toaster position="top-right" />
        </div>
    );
};

export default AppDetails;
