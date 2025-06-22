import React from 'react'
import Layout from '../Layout/Layout'

const InvestmentInfo = () => {
  return (
   
         <div className="max-w-5xl mx-auto px-6 py-10 font-[Poppins] text-gray-800">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Investor Information</h1>
      <p className="text-lg mb-6">
        At <strong>LMS</strong>, we believe in the power of scalable education. As we grow, we invite visionary investors to be a part of our mission to make skill-based learning accessible, engaging, and career-focused for everyone.
      </p>

      {/* Section: Vision */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🌍 Our Vision</h2>
        <p>
          To become India’s most trusted student-driven learning platform, empowering millions to upskill and transform their careers — starting from college campuses and expanding globally.
        </p>
      </section>

      {/* Section: Growth */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📈 Market Opportunity</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Over 50 million higher-ed students in India alone</li>
          <li>Growing demand for job-ready skills in tech, business, and creative fields</li>
          <li>Increased trust in online learning post-pandemic</li>
          <li>Global ed-tech industry projected to reach $400B+ by 2030</li>
        </ul>
      </section>

      {/* Section: Financials */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">💰 Investment Potential</h2>
        <p>
          LMS is built to scale — with modular architecture, mentor-driven content, and freemium pricing. We're seeking early-stage investment to grow our reach, onboard top educators, and expand course categories.
        </p>
      </section>

      {/* Section: How to Invest */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🤝 How to Invest</h2>
        <p>
          Interested in partnering with us? We'd love to share our pitch deck, demo, and roadmap with serious investors.
        </p>
        <p className="mt-2">
          Email us at: <a href="mailto:invest@lms-platform.com" className="text-teal-600 hover:underline">invest@lms-platform.com</a>
        </p>
      </section>

      {/* Section: Legal */}
      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">📄 Legal & Compliance</h2>
        <p className="text-sm text-gray-600">
          LMS is a student-led initiative. While not yet a registered company, we are open to formal incorporation based on investor interest and scaling needs.
        </p>
      </section>
    </div>
   
  )
}

export default InvestmentInfo