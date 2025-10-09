import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../components/Header/Header";

const MainLayout = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // route change hole spinner dekahno 
        setLoading(true);

        const delay = setTimeout(() => {
            setLoading(false);
        }, 100);

        return () => clearTimeout(delay);
    }, [location.pathname]);

    return (
        <div className="max-w-7xl mx-auto relative">
            <Header />

            {/* Global overlay spinner dekhano */}
            {loading && (
                <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-[9999] transition-opacity duration-300">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
