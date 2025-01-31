import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const { data } = await api.get("/course/get-course");
      setCourses(data.courses);
     
      
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Courses</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, idx) => (
            <div
              key={idx}
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
                <Link to={`enroll/${course._id}`} className="bg-blue-600 text-white p-1 my-2    rounded-lg">Enroll now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
