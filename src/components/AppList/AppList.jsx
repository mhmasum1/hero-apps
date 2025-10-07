import React, { useState, useEffect } from "react";
import CartDesign from "../CartDesign/CartDesign";

const AppList = () => {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        fetch("/apps.json")
            .then((res) => res.json())
            .then((data) => setApps(data))
    }, []);

    return (
        <div className="p-4">
            <div className="py-5">
                <h2 className="text-2xl font-bold mb-4">Trending Apps</h2>
                <p>Explore All Trending Apps on the Market developed by us</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {apps.map((app) => (
                    <CartDesign key={app.id} app={app} />
                ))}
            </div>
        </div>
    );
};

export default AppList;