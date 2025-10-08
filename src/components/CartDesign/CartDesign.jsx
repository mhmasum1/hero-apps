import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';


const CartDesign = ({ app }) => {
    return (
        <Link to={`/apps/${app.id}`}>
            <div
                key={app.id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-3"
            >
                <img
                    src={app.image}
                    alt={app.title}
                    className="w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg mb-4">{app.title}</h3>
                    <div className="mt-auto flex justify-between items-center text-sm font-semibold">
                        <span className="text-green-500 bg-gray-200 rounded-2xl p-1">
                            {app.downloads}
                        </span>
                        <span className="text-blue-500 flex items-center gap-1 bg-gray-200 rounded-2xl p-1">
                            <FaStar className="text-yellow-400" /> {app.ratingAvg}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CartDesign;