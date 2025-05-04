import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const UpdateCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [mentorId, setMentorId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true); // for fetching course data

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        mentor: "",
        coverImg: null,
        videos: [], // handle multiple videos here
    });

    // Fetch logged-in mentor info
    const getMentor = async () => {
        try {
            const { data } = await api.get("/auth/mentor");
            setMentorId(data.mentor._id);
        } catch (error) {
            console.error("Error fetching mentor info");
            toast.error("Error fetching mentor info");
        }
    };

    // Fetch course details to populate the form
    const getCourseDetails = async () => {
        try {
            const { data } = await api.get(`/course/get-course/${courseId}`);
            const course = data.course;

            setFormData({
                title: course.title || "",
                description: course.description || "",
                price: course.price || "",
                category: course.category || "",
                mentor: course.mentor || "",
                coverImg: null,
                videos: [], // You can populate this with existing video URLs if necessary
            });
        } catch (error) {
            console.error("Error fetching course", error);
            toast.error("Failed to load course data");
        } finally {
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        getMentor();
        getCourseDetails();
    }, []);

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
            [name]: name === "coverImg" ? files[0] : files, // handle multiple videos
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
        data.append("mentor", mentorId); // ensure latest mentor ID

        if (formData.coverImg) {
            data.append("coverImg", formData.coverImg);
        }

        if (formData.videos.length) {
            Array.from(formData.videos).forEach((video) => {
                data.append("videos", video);
            });
        }

        try {
            await api.put(`/course/update-course/${courseId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Course updated successfully!");
            navigate("/mentor"); // or wherever the dashboard route is
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div className="text-center mt-10">Loading course...</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center font-[Poppins]">Update Course</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 mt-6 space-y-4"
            >
                {["title", "description", "price", "category"].map((field) => (
                    <div key={field}>
                        <label className="block text-gray-700 font-medium capitalize">{field}:</label>
                        {field === "description" ? (
                            <textarea
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        ) : (
                            <input
                                type={field === "price" ? "number" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        )}
                    </div>
                ))}

                <div>
                    <label className="block text-gray-700 font-medium">Cover Image:</label>
                    <input
                        type="file"
                        name="coverImg"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full"
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
