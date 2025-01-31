import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Layout from '../Layout/Layout';
import MentorDashboard from './MentorDashboard';

const GetMentorDetails = () => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMentor = async () => {
        try {
            const { data } = await api.get('/auth/mentor');
            setDetails(data.mentor);
        } catch (error) {
            console.error(error.response?.data?.message || 'Error fetching mentor details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMentor();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-xl font-[Poppins]">Loading...</div>;
    }

    if (!details) {
        return <div className="text-center mt-10 text-xl">No mentor details found.</div>;
    }

    return (<Layout>
        <div className="p-4 max-w-4xl mx-auto font-[Poppins]">
            <h1 className="text-3xl font-bold text-center mb-6">Mentor Profile</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6 transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center">
                    {details.photo && (
                        <img
                            src={details.photo}
                            alt="Mentor"
                            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
                        />
                    )}
                    <h2 className="text-2xl font-semibold">{details.username}</h2>
                    <p className="text-gray-600 mt-2">Email: {details.email}</p>
                    <p className="text-gray-600 mt-2">Role: {details.role}</p>
                </div>
            </div>
        </div>

        <MentorDashboard mentorId={details._id}/>
        </Layout>
    );
};

export default GetMentorDetails;