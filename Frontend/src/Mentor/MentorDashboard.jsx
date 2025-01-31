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
        if (mentorId) {
            getMentorCourses();
        }
    }, [mentorId]);

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading courses...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;
    }

    if (courses.length === 0) {
        return <div className="text-center mt-10 text-xl">No courses found.</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto font-[Poppins]">
            <div>
                <Link to={`add-course`} className='bg-blue-500 p-2 rounded-lg text-white m-2 hover:bg-blue-600'>Add Course</Link>
            </div>
            <h2 className="text-2xl font-bold mb-4 mt-5">Courses</h2>
            <ul className="space-y-4">
                {courses.map((c) => (
                    <li key={c._id} className="border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-semibold">{c.title}</h3>
                        <p className="text-gray-700">{c.description}</p>
                        <p className="font-bold">Price: ${c.price}</p>
                        {c.coverImg && (
                            <img src={c.coverImg} alt={c.title} className="w-full h-48 object-cover rounded mt-2" />
                        )}
                        <p className="mt-2">Category: <span className="font-medium">{c.category}</span></p>
                        <div className="mt-2">
                            <h4 className="font-semibold">Video URLs:</h4>
                            <ul className="list-disc list-inside">
                                {c.videoUrls.map((url, index) => (
                                    <li key={index}>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {url}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex gap-5 m-2 p-2'>
                        <Link to={`update-course/${c._id}`} className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>Update</Link>
                        <Link to={`delete-course/${c._id}`} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600'>Delete</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorDashboard;