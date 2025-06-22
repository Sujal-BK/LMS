import React,{useState} from 'react'
import Layout from '../Layout/Layout'

const ContactUs = () => {
     const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    console.log('Form submitted:', form);
    setSubmitted(true);

   
    setForm({ name: '', email: '', message: '' });
  };
  return (
   
        <div className="max-w-5xl mx-auto p-6 font-[Poppins] text-gray-800">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Contact Us</h1>
      <p className="mb-6 text-lg">
        Have questions, feedback, or partnership ideas? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">📍 Our Office</h2>
            <p className="text-sm text-gray-600">LMS HQ, Surat, Gujarat, India</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">📧 Email</h2>
            <p className="text-sm text-gray-600">
              <a href="mailto:contact@lms-platform.com" className="text-teal-600 hover:underline">
                contact@lms-platform.com
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">📞 Phone</h2>
            <p className="text-sm text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-md shadow">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-2 ring-teal-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-2 ring-teal-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded outline-none focus:ring-2 ring-teal-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            Send Message
          </button>
          {submitted && <p className="text-green-600 mt-2">✅ Message sent successfully!</p>}
        </form>
      </div>
    </div>
    
  )
}

export default ContactUs