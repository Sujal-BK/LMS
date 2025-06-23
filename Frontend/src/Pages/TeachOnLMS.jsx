import React from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.webp';

const TeachOnLMS = () => {
    const url = "https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg";

    return (
        
            <div className="w-full -my-4">
                {/* Container with responsive background image */}
                <div
                    style={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className="w-full h-full sm:h-screen bg-cover bg-center"
                >
                    <div className="translate-y-32 sm:translate-y-44 p-4 sm:px-8 md:px-16 lg:px-24">
                        {/* Heading */}
                        <h2 className="my-8 text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-black">
                            Come teach with us
                        </h2>

                        {/* Paragraph */}
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 mt-2 font-medium animate-pulse">
                            Become an instructor and change lives — including your own.
                        </p>
                        <br />

                        {/* Link with hover effect */}
                        <Link
                            to="/sign-up"
                            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 border rounded-lg hover:bg-slate-800 transition-transform duration-200 transform hover:scale-105"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Reasons Section */}
                <div className="p-4 sm:p-8 md:p-16">
                    <h2 className="my-28 md:my-5 text-2xl md:text-3xl font-bold text-center mb-8 font-[Poppins]">So many reasons to start</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Reason 1 */}
                        <div className="flex flex-col items-center text-center">
                            <img src={img1} alt="Get rewarded" className="w-32 h-32 object-cover mb-4 rounded-lg shadow-md" />
                            <h3 className="text-lg font-semibold">Get rewarded</h3>
                            <p className="text-sm text-gray-600">Expand your professional network, build your expertise, and earn money on each paid enrollment.</p>
                        </div>

                        {/* Reason 2 */}
                        <div className="flex flex-col items-center text-center">
                            <img src={img2} alt="Inspire learners" className="w-32 h-32 object-cover mb-4 rounded-lg shadow-md" />
                            <h3 className="text-lg font-semibold">Inspire learners</h3>
                            <p className="text-sm text-gray-600">Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</p>
                        </div>

                        {/* Reason 3 */}
                        <div className="flex flex-col items-center text-center">
                            <img src={img3} alt="Teach your way" className="w-32 h-32 object-cover mb-4 rounded-lg shadow-md" />
                            <h3 className="text-lg font-semibold">Teach your way</h3>
                            <p className="text-sm text-gray-600">Publish the course you want, in the way you want, and always have control of your own content.</p>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default TeachOnLMS;