import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const UpdateCourse = () => {
    const [mentorId, setMentorId] = useState(null);
    const { courseId } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        mentor: "",
        coverImg: null,
        videos: [],
    });
    const [loading, setLoading] = useState(false);

    const getMentor = async () => {
        try {
            const { data } = await api.get("/auth/mentor");
            setMentorId(data.mentor._id);
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching mentor details");
            toast.error(error.response?.data?.message || "Error fetching mentor details");
        }
    };

    useEffect(() => {
        getMentor();
    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            mentor: mentorId,
        }));
    }, [mentorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "coverImg" ? files[0] : files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("mentor", mentorId);

        if (formData.coverImg) {
            data.append("coverImg", formData.coverImg);
        }

        if (formData.videos.length) {
            Array.from(formData.videos).forEach((video) => {
                data.append("videos", video);
            });
        }

        try {
            const response = await api.put(`/course/update-course/${courseId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Course updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update course");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center font-[Poppins]">Update Course</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 mt-6 space-y-4"
            >
                <div>
                    <label className="block text-gray-700 font-medium">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
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
                        value={formData.price}
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
                        value={formData.category}
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
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Updating..." : "Update Course"}
                </button>
            </form>
        </div>
    );
};

export default UpdateCourse;
