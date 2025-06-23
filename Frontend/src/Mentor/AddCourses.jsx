import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCourses = () => {
    const [mentorId, setMentorId] = useState('');
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        coverImg: null,
        price: '',
        category: '',
        mentor: '',
        videos: [],
    });

    const navigate  = useNavigate()

    const getMentor = async () => {
        try {
            const { data } = await api.get('/auth/mentor');
            setMentorId(data.mentor._id);
        } catch (error) {
            console.error(error.response?.data?.message || 'Error fetching mentor details');
            toast.error(error.response?.data?.message || 'Error fetching mentor details');
        }
    };

    useEffect(() => {
        getMentor();
    }, []);

    useEffect(() => {
        setCourseData((prevData) => ({
            ...prevData,
            mentor: mentorId,
        }));
    }, [mentorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'coverImg') {
            setCourseData((prevData) => ({
                ...prevData,
                coverImg: files[0],
            }));
        } else if (name === 'videos') {
            setCourseData((prevData) => ({
                ...prevData,
                videos: files,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mentorId) {
            toast.error('Mentor ID is missing.');
            return;
        }

        const formData = new FormData();
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('price', courseData.price);
        formData.append('category', courseData.category);
        formData.append('mentor', mentorId);

        if (courseData.coverImg) {
            formData.append('coverImg', courseData.coverImg);
        }

        if (courseData.videos.length > 0) {
            for (let i = 0; i < courseData.videos.length; i++) {
                formData.append('videos', courseData.videos[i]);
            }
        }

        try {
            const response = await api.post('/course/add-course', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Course added successfully!');
            console.log('Course added successfully:', response.data);

            // Clear the form and reassign mentor ID
            setCourseData({
                title: '',
                description: '',
                coverImg: null,
                price: '',
                category: '',
                mentor: mentorId,
                videos: [],
            });

            navigate('/mentor')

        } catch (err) {
            console.error('Error adding course:', err.response?.data?.message || err);
            toast.error(err.response?.data?.message || 'Failed to add course.');
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto font-[Poppins]">
            <h1 className="text-3xl font-bold text-center">Add New Course</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 mt-6 space-y-4"
            >
                <div>
                    <label className="block text-gray-700 font-medium">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Description:</label>
                    <textarea
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={courseData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={courseData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Cover Image:</label>
                    <input
                        type="file"
                        name="coverImg"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Videos:</label>
                    <input
                        type="file"
                        name="videos"
                        accept="video/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourses;
