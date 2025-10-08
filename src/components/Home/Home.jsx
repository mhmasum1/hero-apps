import React from 'react';
import AppList from '../AppList/AppList';
import googlePlay from '../../../public/assets/google_play.png'
import playStore from '../../../public/assets/app_store.png'

const Home = () => {
    return (
        <div className="hero bg-base-200 ">
            <div className="hero-content text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold">We Build <br />
                        <span className='text-purple-600'>Productive</span> Apps</h1>
                    <p className="py-6">
                        At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. <br />Our goal is to turn your ideas into digital experiences that truly make an impact.
                    </p>
                    <div className='flex justify-center gap-2'>
                        <button className="btn font-bold"> <img src={googlePlay} alt="" /> Google Play</button>
                        <button className="btn font-bold"> <img src={playStore} alt="" /> App Store</button>
                    </div>
                    <div className='pt-6'>
                        <img className='mx-auto' src="/assets/hero.png" alt="" />
                    </div>
                    <div className=" bg-gradient-to-br from-purple-400 to-indigo-700 flex items-center justify-center p-8">
                        <div className="w-full ">

                            <h1 className="text-3xl md:text-4xl  font-bold text-white text-center mb-16">
                                Trusted By Millions, Built For You
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                                <div className="text-center">
                                    <p className="text-white ">
                                        Total Downloads
                                    </p>
                                    <h2 className="text-4xl  font-bold text-white mb-4">
                                        29.6M
                                    </h2>
                                    <p className="text-white">
                                        21% More Than Last Month
                                    </p>
                                </div>


                                <div className="text-center">
                                    <p className="text-white">
                                        Total Reviews
                                    </p>
                                    <h2 className="text-4xl font-bold text-white mb-4">
                                        906K
                                    </h2>
                                    <p className="text-white">
                                        46% More Than Last Month
                                    </p>
                                </div>


                                <div className="text-center">
                                    <p className="text-white">
                                        Active Apps
                                    </p>
                                    <h2 className="text-4xl  font-bold text-white mb-4">
                                        132+
                                    </h2>
                                    <p className="text-white">
                                        31 More Will Launch
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AppList></AppList>

                </div>
            </div>
        </div>
    );
};

export default Home;