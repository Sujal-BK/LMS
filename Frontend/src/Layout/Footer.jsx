import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2">
            <li><Link  className="hover:underline" to='/about-us'>About us</Link></li>
            <li><Link  className="hover:underline" to='/career'>Career</Link></li>
            <li><Link className="hover:underline" to='/contact-us'>Contact us</Link></li>
            <li><Link  className="hover:underline" to='/investment'>Investment</Link></li>
          </ul>
        </div>

        {/* Discovery Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Discovery LMS</h3>
          <ul className="space-y-2">
            <li><Link to="/teach" className="hover:underline">Teach on LMS</Link></li>
            <li><Link to="/plans" className="hover:underline">Plans & Pricing</Link></li>
            <li><Link  className="hover:underline">Affiliate</Link></li>
            <li><Link  className="hover:underline">Help and Support</Link></li>
          </ul>
        </div>

        {/* Legal & Accessibility Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal & Accessibility</h3>
          <ul className="space-y-2">
            <li><Link className="hover:underline">Accessibility Statement</Link></li>
            <li><Link  className="hover:underline">Privacy Policy</Link></li>
            <li><Link  className="hover:underline">Sitemap</Link></li>
            <li><Link  className="hover:underline">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Discovery LMS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
