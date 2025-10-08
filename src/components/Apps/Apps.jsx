import React, { useEffect, useState } from 'react';
import CartDesign from '../CartDesign/CartDesign';

const Apps = () => {
    const [foundApps, setFoundApps] = useState([]);

    useEffect(() => {
        fetch('/appsFound.json')
            .then(res => res.json())
            .then((data) => setFoundApps(data))
    }, []);
    return (
        <div className=" bg-base-200 text-center py-10 ">
            <div className=" ">
                <h1 className="text-5xl font-bold">Our All Applications</h1>
                <p className="py-6">
                    Explore All Apps on the Market developed by us. We code for Millions
                </p>
            </div>
            <div className='flex justify-between px-2 items-center pb-2'>
                <h3 className='font-bold'>Apps Found ({foundApps.length}) </h3>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" required placeholder="Search" />
                </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {
                    foundApps.map(foundApp => (<CartDesign key={foundApp.id} app={foundApp}></CartDesign>))
                }
            </div>
        </div>
    );
};

export default Apps;