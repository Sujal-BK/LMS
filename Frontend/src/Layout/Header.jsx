import React, { useRef, useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import useAuth from '../Store/useAuth';
import api from '../../api/axios';

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef(null);
  const timeRef = useRef(null);

  const { isLoggedIn, handleLogout, role } = useAuth();

  const handleMouseLeave = () => {
    timeRef.current = setTimeout(() => {
      setIsDropDownOpen(false);
    }, 100);
  };

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const { data } = await api.get(`/course/search-course?query=${query}`);
      console.log(data);
      
      if (data.success) {
        setSearchResults(data.courses);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsSearching(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      fetchSearchResults(query);
    }, 500);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setSearchResults([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="flex items-center justify-between m-3 p-3 font-[Poppins] text-lg ">
        {/* Logo & Explore */}
        <div className="flex items-center gap-7 mx-5">
          <Link to="/" className="font-bold text-3xl">LMS</Link>

          {/* Desktop Explore Dropdown */}
          <div className="relative hidden md:block">
            <button
              onMouseEnter={() => setIsDropDownOpen(true)}
              onMouseLeave={handleMouseLeave}
              className="hover:text-teal-600 transition duration-100"
            >
              Explore
            </button>
            {isDropDownOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                onMouseEnter={() => setIsDropDownOpen(true)}
                onMouseLeave={() => setIsDropDownOpen(false)}
              >
                {["Development", "Design", "Business", "Finance & Accounting", "IT & Software"].map((cat) => (
                  <div key={cat} className="block px-4 py-2 hover:bg-teal-100 cursor-pointer">{cat}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:flex items-center border p-3 rounded-lg w-auto gap-1 search-container">
          <IoSearchOutline />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for anything"
            className="text-sm outline-none w-96"
          />

          {/* Search Dropdown */}
          {searchQuery && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-lg border rounded-md z-50 max-h-60 overflow-y-auto">
              {isSearching ? (
                <div className="p-2 text-gray-500">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <Link
                    key={course._id}
                    to={`/show-courses/enroll/${course._id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {course.title}
                  </Link>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Right Side */}
        <div className="hidden md:flex items-center text-base gap-7">
          <Link to="/plans" className="hover:text-teal-600 transition duration-100">Plan & Pricing</Link>
          {role === 'Mentor' ? (
            <Link to="/mentor" className="hover:text-teal-600 transition duration-100">Check Profile</Link>
          ) : (
            <Link to="/show-courses" className="hover:text-teal-600 transition duration-100">See Courses</Link>
          )}
          <MdOutlineShoppingCart className="text-2xl" />
          {isLoggedIn ? (
            <Link to='/'><button
              onClick={handleLogout}
              className="hover:text-teal-600 transition duration-100"
            >
              Logout
            </button></Link>
          ) : (
            <>
              <Link to="/sign-in" className="hover:text-teal-600 transition duration-100">Login</Link>
              <Link to="/sign-up" className="hover:text-teal-600 transition duration-100">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <RxCross2 size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md font-[Poppins]">
          <div className="flex flex-col p-4">
            {["Development", "Design", "Business", "Finance & Accounting", "IT & Software"].map((cat) => (
              <div key={cat} className="block px-4 py-2 hover:text-teal-600 transition duration-100">{cat}</div>
            ))}
            <Link to='/plans' className="block px-4 py-2 hover:text-teal-600 transition duration-100">Plan & Pricing</Link>
            {role === 'Mentor' ? (
              <Link to='/mentor' className="block px-4 py-2 hover:text-teal-600 transition duration-100">Check Profile</Link>
            ) : (
              <Link to='/show-courses' className="block px-4 py-2 hover:text-teal-600 transition duration-100">See Courses</Link>
            )}
            {isLoggedIn ? (
              <Link to='/'><button
                onClick={handleLogout}
                className="block px-4 py-2 hover:text-teal-600 transition duration-100"
              >
                Logout
              </button></Link>
            ) : (
              <>
                <Link to="/sign-in" className="block px-4 py-2 hover:text-teal-600 transition duration-100">Login</Link>
                <Link to="/sign-up" className="block px-4 py-2 hover:text-teal-600 transition duration-100">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
