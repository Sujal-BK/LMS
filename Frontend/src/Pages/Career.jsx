import React from 'react'
import Layout from '../Layout/Layout'

const Career = () => {
  return (
 
         <div className="max-w-5xl mx-auto px-4 py-10 font-[Poppins] text-gray-800">
      <h1 className="text-4xl font-bold text-teal-600 mb-4">Careers at LMS</h1>
      <p className="text-lg mb-6">
        At <strong>LMS</strong>, we're building the next generation of online learning. We’re looking for passionate educators, developers, and creative thinkers who believe in the power of education to change lives.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🚀 Why Work With Us?</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Flexible work environment – remote-friendly</li>
          <li>Build real impact in the education space</li>
          <li>Get mentorship from experienced developers and educators</li>
          <li>Earn while you teach – monetize your expertise</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📌 Current Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium">Frontend Developer (React)</h3>
            <p className="text-sm text-gray-600 mb-2">Remote · Internship / Part-time</p>
            <p className="text-sm">Help us build dynamic, user-friendly interfaces for learners and instructors.</p>
          </div>

          <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium">Course Content Creator</h3>
            <p className="text-sm text-gray-600 mb-2">Remote · Freelance</p>
            <p className="text-sm">If you’re great at explaining concepts and love teaching, join us as a mentor!</p>
          </div>

          <div className="p-5 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium">Backend Developer (Node.js)</h3>
            <p className="text-sm text-gray-600 mb-2">Remote · Internship / Part-time</p>
            <p className="text-sm">Design and maintain scalable APIs and manage our database systems.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📬 How to Apply</h2>
        <p className="text-sm mb-2">
          Email your resume and portfolio (if any) to: <a href="mailto:careers@lms-platform.com" className="text-teal-600 hover:underline">careers@lms-platform.com</a>
        </p>
        <p className="text-sm text-gray-500">
          We typically respond within 5–7 business days.
        </p>
      </section>
    </div>
    
  )
}

export default Career