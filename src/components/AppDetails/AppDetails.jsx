import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingsChart from '../RatingsChart/RatingsChart';
import toast, { Toaster } from 'react-hot-toast';

const AppDetails = () => {
    const { id } = useParams();
    const [app, setApp] = useState(null);
    const [installed, setInstalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {

        // url er id change hole useeffect colbe tokhn first a setLoading true kore rakhlam jeno loading message dekhay
        setLoading(true);

        fetch("/appsFound.json")
            .then(res => res.json())
            .then(data => {
                //id mil khuje app khuje anlam
                const foundApp = data.find(item => item.id === parseInt(id));

                if (foundApp) {

                    // target app paoya gele setake state a rakhalam 
                    setApp(foundApp);

                    setNotFound(false);
                } else {

                    // id mil na pele app not found dekahnor jonne 
                    setNotFound(true);
                }

                // data load ses hole setlaoading false kore debo
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading app details:", err);

                // error asle notFound true
                setNotFound(true);

                // 🔹 error holeo setloading na dekhanor jonne false kor debo 
                setLoading(false);
            });
    }, [id]);

    const handleInstall = () => {
        setInstalled(true);
        toast.success(`${app.title} installed successfully!`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Loading app details...</p>
            </div>
        );
    }

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
