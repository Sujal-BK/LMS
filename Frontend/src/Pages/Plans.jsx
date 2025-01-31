import React from 'react';
import { FaUser } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const Plans = () => {
    return (
        <div className="p-4">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="font-semibold font-serif text-3xl mb-2">Accelerate growth — for you or your organization</h1>
                <p className="font-[Poppins] text-zinc-500 animate-pulse">Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.</p>
            </div>

            {/* Plans Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Personal Plan */}
                <div className="border rounded-lg shadow-lg p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Personal Plan</h4>
                        <p className="text-zinc-500 mb-4">For you</p>

                        <div className="flex items-center mb-4">
                            <FaUser className="mr-2" />
                            <p>Individual</p>
                        </div>

                        <h3 className="text-lg font-semibold">Starting at ₹850 per month</h3>
                        <p className="text-zinc-500 mb-4">Billed monthly or annually. Cancel anytime.</p>
                        <Link to="/subscribe" className="flex items-center gap-2 text-blue-600 hover:underline mb-4">
                            <div>Start Subscription</div>
                            <FaArrowRight />
                        </Link>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Access to 12,000+ top courses</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Certification prep</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Goal-focused recommendations</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />AI-powered coding exercises</li>
                    </ul>
                </div>

                {/* Team Plan */}
                <div className="border rounded-lg shadow-lg p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Team Plan</h4>
                        <p className="text-zinc-500 mb-4">For your team</p>

                        <div className="flex items-center mb-4">
                            <FaUsers className="mr-2" />
                            <p>2 to 20 people</p>
                        </div>

                        <h3 className="text-lg font-semibold">₹2,000 a month per user</h3>
                        <p className="text-zinc-500 mb-4">Billed annually. Cancel anytime.</p>
                        <Link to="/subscribe" className="flex items-center gap-2 text-blue-600 hover:underline mb-4">
                            <div>Start Subscription</div>
                            <FaArrowRight />
                        </Link>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Access to 12,000+ top courses</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Certification prep</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Goal-focused recommendations</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />AI-powered coding exercises</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Analytics and adoption reports</li>
                    </ul>
                </div>

                {/* Enterprise Plan */}
                <div className="border rounded-lg shadow-lg p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Enterprise Plan</h4>
                        <p className="text-zinc-500 mb-4">For your whole organization</p>

                        <div className="flex items-center mb-4">
                            <FaUsers className="mr-2" />
                            <p>More than 20 people</p>
                        </div>

                        <h3 className="text-lg font-semibold">Contact sales for pricing</h3>
                        <Link to="/demo" className="flex items-center gap-2 text-blue-600 hover:underline mb-4">
                            <div>Request a demo</div>
                            <FaArrowRight />
                        </Link>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Access to 27,000+ top courses</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Certification prep</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Goal-focused recommendations</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />AI-powered coding exercises</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Analytics and adoption reports</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Dedicated customer success team</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Customizable content</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Hands-on tech training with add-on</li>
                        <li className="flex items-center"><BsCheck2Circle className="text-green-800 mr-2" />Strategic implementation services with add-on</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Plans;
