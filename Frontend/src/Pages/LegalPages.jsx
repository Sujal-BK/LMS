import React from 'react';

const LegalPages = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 text-gray-800 leading-relaxed">
      {/* Accessibility Statement */}
      <section>
        <h1 className="text-3xl font-bold mb-4">📘 Accessibility Statement</h1>
        <p>
          We are committed to ensuring digital accessibility for all users, regardless of ability. Our goal is to make
          our platform as accessible and usable as possible, following the Web Content Accessibility Guidelines (WCAG)
          2.1 AA standards.
        </p>
        <h2 className="text-xl font-semibold mt-4">Our Commitments:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Ensure text has sufficient contrast against backgrounds</li>
          <li>Provide keyboard navigation support throughout the site</li>
          <li>Use clear, consistent headings and labels</li>
          <li>Offer alt text for images and icons</li>
        </ul>
        <h2 className="text-xl font-semibold mt-4">Feedback</h2>
        <p>
          If you encounter any accessibility barriers while using our website, please let us know:
          <br />📧 Email: support@example.com
          <br />📞 Phone: +91-12345-67890
        </p>
      </section>

      {/* Privacy Policy */}
      <section>
        <h1 className="text-3xl font-bold mb-4">🔒 Privacy Policy</h1>
        <p className="italic mb-2">Effective Date: June 1, 2025</p>
        <p>
          We value your privacy and are committed to protecting your personal information. This Privacy Policy explains
          how we collect, use, and protect your data when you use our services.
        </p>

        <h2 className="text-xl font-semibold mt-4">Information We Collect:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Name, email address, and contact information</li>
          <li>Course progress and activity</li>
          <li>Billing and payment details (secured)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">How We Use It:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To deliver personalized learning experiences</li>
          <li>To improve website functionality and content</li>
          <li>To process transactions securely</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">Your Rights:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Access, update, or delete your data at any time</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <p className="mt-2">For requests, contact us at support@example.com.</p>
      </section>

      {/* Terms and Conditions */}
      <section>
        <h1 className="text-3xl font-bold mb-4">📜 Terms and Conditions</h1>
        <p>
          By accessing and using our platform, you agree to abide by the following terms:
        </p>

        <h2 className="text-xl font-semibold mt-4">Use of Service:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Content is for personal, non-commercial use</li>
          <li>You may not reproduce, distribute, or modify materials without permission</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">Accounts:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You are responsible for maintaining the confidentiality of your login credentials</li>
          <li>You agree to provide accurate and current information</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">Payments:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>All purchases are final unless stated otherwise</li>
          <li>Refunds are subject to our refund policy</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">Termination:</h2>
        <p>
          We reserve the right to suspend or terminate your account for violations of these terms.
        </p>

        <p className="mt-2">For full details or inquiries, please contact: support@example.com</p>
      </section>
    </div>
  );
};

export default LegalPages;
