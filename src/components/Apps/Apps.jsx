import React, { useEffect, useState } from 'react';
import CartDesign from '../CartDesign/CartDesign';

const Apps = () => {
    const [foundApps, setFoundApps] = useState([]);
    const [searchApp, setSearchApp] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch start hbar age spinner true
        setLoading(true);
        fetch('/appsFound.json')
            .then(res => res.json())
            .then((data) => {
                setFoundApps(data);
                // fetch ses hole spinner hide
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Filtered apps 
    const filteredApps = foundApps.filter(app =>
        app.title.toLowerCase().includes(searchApp.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-base-200 py-10 px-4">
            <div className="mb-6 text-center">
                <h1 className="text-5xl font-bold">Our All Applications</h1>
                <p className="py-6">
                    Explore All Apps on the Market developed by us. We code for Millions
                </p>
            </div>

            <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
                <h3 className="font-bold text-left text-lg">
                    Apps Found ({filteredApps.length})
                </h3>

                <label className="flex border rounded-md p-2 bg-white w-64">
                    <svg
                        className="h-5 w-5 opacity-50 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search app by title"
                        value={searchApp}
                        onChange={(e) => setSearchApp(e.target.value)}
                        className="w-full outline-none"
                    />
                </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {filteredApps.length > 0 ? (
                    filteredApps.map(app => <CartDesign key={app.id} app={app} />)
                ) : (
                    <div className="col-span-full flex justify-center items-center">
                        <p className=" text-xl font-semibold">
                            OPPS!! APP NOT FOUND
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Apps;
