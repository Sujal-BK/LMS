import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, ChevronDown } from 'lucide-react';

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      category: 'General',
      questions: [
        { q: 'How do I create an account?', a: 'Click on Sign Up and fill out your details to create an account.' },
        { q: 'How can I change my password?', a: 'Go to Settings > Security to change your password.' },
      ],
    },
    {
      category: 'Courses & Learning',
      questions: [
        { q: 'How do I access my enrolled courses?', a: 'Go to Dashboard > My Courses.' },
        { q: 'Can I download course materials?', a: 'Yes, many courses offer downloadable PDFs and resources.' },
      ],
    },
    {
      category: 'Billing & Payments',
      questions: [
        { q: 'How do I get an invoice?', a: 'Invoices are available in the Billing section of your profile.' },
        { q: 'Can I request a refund?', a: 'Yes, check our Refund Policy or contact support.' },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center">Help & Support</h1>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search help topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FAQs */}
      <div className="space-y-8">
        {faqs.map((section, secIndex) => (
          <div key={secIndex}>
            <h2 className="text-2xl font-semibold mb-4">{section.category}</h2>
            <div className="space-y-2">
              {section.questions.map((item, i) => {
                const index = `${secIndex}-${i}`;
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="border rounded-xl overflow-hidden">
                    <button
                      className="w-full text-left p-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-medium">{item.q}</span>
                      <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-gray-700 border-t">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
        <div className="p-6 border rounded-2xl shadow-md">
          <Mail className="mx-auto mb-2" />
          <h3 className="font-semibold">Email Us</h3>
          <p className="text-sm text-gray-600">support@example.com</p>
        </div>
        <div className="p-6 border rounded-2xl shadow-md">
          <Phone className="mx-auto mb-2" />
          <h3 className="font-semibold">Call Us</h3>
          <p className="text-sm text-gray-600">+91-12345-67890</p>
        </div>
        <div className="p-6 border rounded-2xl shadow-md">
          <MessageSquare className="mx-auto mb-2" />
          <h3 className="font-semibold">Live Chat</h3>
          <p className="text-sm text-gray-600">Mon–Fri, 9 AM–6 PM IST</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">
          <a href="#">User Guide</a>
          <a href="#">Submit a Ticket</a>
          <a href="#">Report a Bug</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        🔒 Your data is safe with us.
      </div>
    </div>
  );
};

export default HelpSupport;
