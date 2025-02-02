import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams, Link } from 'react-router-dom'
import api from '../../api/axios'

const MentorProfile = () => {
    const [mentor, setMentor] = useState(null)  
    const [courses, setCourses] = useState([])

    const { id } = useParams()

    const getMentor = async () => {
        try {
            const { data } = await api.get(`/auth/mentor/${id}`)
            setMentor(data.mentor)  
        } catch (error) {
            console.error("Error fetching mentor:", error)
        }
    }

    const getCourses = async (mentorId) => {
        try {
            const { data } = await api.get(`/course/get-courses/${mentorId}`)
            setCourses(data.courses)
        } catch (error) {
            console.error("Error fetching courses:", error)
        }
    }

    useEffect(() => {
        getMentor()
    }, [id])

    useEffect(() => {
        if (mentor?._id) {
            getCourses(mentor._id)
        }
    }, [mentor])

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 font-[Poppins]">
                {mentor ? (
                    <>
                        <h1 className="text-2xl font-bold text-center mb-4">
                            {mentor.username}'s Profile
                        </h1>
                        <p className="text-center text-lg">{mentor.email}</p>

                        <h2 className="text-2xl font-bold text-center mt-8">Courses by {mentor.username}</h2>
                        {courses.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
                                {courses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <img
                                            src={course.coverImg}
                                            alt={course.title}
                                            className="w-full h-52 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                                            <p className="text-gray-600 text-sm mb-2">
                                                {course.description}
                                            </p>
                                            <p className="text-gray-800 font-medium mb-2">
                                                Price: ₹{course.price}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Category: {course.category}
                                            </p>
                                            <div className="flex gap-5">
                                                <Link
                                                    to={`/show-courses/enroll/${course._id}`}
                                                    className="bg-blue-600 text-white p-1 my-2 rounded-lg"
                                                >
                                                    Enroll now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-lg mt-4">No courses found.</p>
                        )}
                    </>
                ) : (
                    <p className="text-center text-lg">Loading mentor profile...</p>
                )}
            </div>
        </Layout>
    )
}

export default MentorProfile
