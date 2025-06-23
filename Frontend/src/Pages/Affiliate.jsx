import React from 'react';

const Affiliate = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-[Poppins] text-gray-800">
      <h1 className="text-4xl font-bold text-teal-600 mb-6">Join Our Affiliate Program</h1>

      <p className="text-lg mb-6">
        Become a part of the Discovery LMS success story. As an affiliate, you can earn money by promoting our online learning platform. It's simple — share, refer, and earn!
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">💼 Why Become an Affiliate?</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Earn attractive commissions on every sale.</li>
          <li>Promote high-quality, in-demand courses.</li>
          <li>Access to ready-made marketing materials.</li>
          <li>Real-time tracking and reporting dashboard.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🚀 How It Works</h2>
        <ol className="list-decimal ml-6 space-y-2 text-gray-700">
          <li>Sign up for the affiliate program.</li>
          <li>Get your unique referral link.</li>
          <li>Share the link on social media, blogs, YouTube, etc.</li>
          <li>Earn money for every user who joins through your link!</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📊 Commission Structure</h2>
        <p className="text-gray-700 mb-2">Here’s what you can earn:</p>
        <ul className="ml-6 space-y-2 text-gray-700">
          <li><strong>10% commission</strong> on all course sales.</li>
          <li><strong>5% recurring</strong> commission for subscription referrals.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📝 Join Today</h2>
        <p className="text-gray-700 mb-4">Start earning with LMS today. Click the button below to apply:</p>
        <a
          href="mailto:affiliate@lms-platform.com"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
        >
          Apply as an Affiliate
        </a>
      </section>
    </div>
  );
};

export default Affiliate;
