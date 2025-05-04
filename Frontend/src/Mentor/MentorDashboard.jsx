import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const MentorDashboard = ({ mentorId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMentorCourses = async () => {
        try {
            const { data } = await api.get(`/course/get-courses/${mentorId}`);
            setCourses(data.courses);
            console.log(data.courses);
        } catch (error) {
            console.error(error.response?.data?.message || 'Error fetching courses');
            setError(error.response?.data?.message || 'Error fetching courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("mentorId in Dashboard:", mentorId); 
        if (mentorId) {
            getMentorCourses();
        }
    }, [mentorId]);

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading courses...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto font-[Poppins]">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold">Your Courses</h2>
                <Link
                    to="add-course"
                    className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600"
                >
                    Add Course
                </Link>
            </div>

            {error && (
                <div className="text-center text-red-500 text-xl mb-4">{error}</div>
            )}

            {courses.length === 0 ? (
                <div className="text-center text-xl mt-10">No courses found.</div>
            ) : (
                <ul className="space-y-4">
                    {courses.map((c) => (
                        <li
                            key={c._id}
                            className="border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            <h3 className="text-xl font-semibold">{c.title}</h3>
                            <p className="text-gray-700">{c.description}</p>
                            <p className="font-bold">Price: ${c.price}</p>
                            {c.coverImg && (
                                <img
                                    src={c.coverImg}
                                    alt={c.title}
                                    className="w-full h-48 object-cover rounded mt-2"
                                />
                            )}
                            <p className="mt-2">
                                Category: <span className="font-medium">{c.category}</span>
                            </p>

                            <div className="mt-2">
                                <h4 className="font-semibold">Video Preview:</h4>
                                {c.videoUrls.length > 0 ? (
                                    <div className="space-y-2">
                                        {c.videoUrls.map((url, index) => (
                                            <div key={index}>
                                                <video
                                                    controls
                                                    className="w-full h-60 object-cover"
                                                    src={url}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No videos available.</p>
                                )}
                            </div>

                            <div className="flex gap-5 m-2 p-2">
                                <Link
                                    to={`update-course/${c._id}`}
                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                >
                                    Update
                                </Link>
                                <Link
                                    to={`delete-course/${c._id}`}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MentorDashboard;
