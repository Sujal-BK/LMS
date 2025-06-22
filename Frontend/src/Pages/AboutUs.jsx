import React from 'react'
import Layout from '../Layout/Layout'

const AboutUs = () => {
    return (
       
            <div>
                <div className="max-w-4xl mx-auto p-6 text-gray-800 font-[Poppins]">
                    <h1 className="text-3xl font-bold mb-4 text-teal-600">About Us</h1>

                    <p className="mb-4">
                        Welcome to <strong>LMS</strong> – your personalized learning hub! Whether you're a student looking to upskill, a professional aiming for growth, or a mentor passionate about sharing knowledge, our platform is designed for you.
                    </p>

                    <p className="mb-4">
                        Built with simplicity and scalability in mind, LMS provides high-quality courses across diverse fields including Development, Design, Business, IT, Finance, and more. We believe that education should be accessible, engaging, and flexible — and our platform reflects that philosophy.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🎯 Our Mission</h2>
                    <p className="mb-4">
                        To empower learners and mentors through a seamless, intuitive online learning experience. We aim to bridge the gap between traditional education and modern skill-based learning.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">👥 Who We Are</h2>
                    <p className="mb-4">
                        We’re a group of developers and educators who built this platform as part of a college placement project — but with real-world goals. Our team is committed to innovation, feedback, and continuous improvement.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🚀 What Makes Us Different</h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Clean, user-friendly course discovery and enrollment experience</li>
                        <li>Role-based access for Mentors and Students</li>
                        <li>Interactive content structure with progress tracking</li>
                        <li>Affordable, accessible learning for everyone</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">📬 Contact Us</h2>
                    <p>
                        Have questions, feedback, or collaboration ideas? We'd love to hear from you. Reach out at <a href="mailto:contact@lms-platform.com" className="text-teal-600 hover:underline">contact@lms-platform.com</a>.
                    </p>
                </div>

            </div>
       
    )
}

export default AboutUs