import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const Enroll = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  const getCourse = async () => {
    try {
      const { data } = await api(`course/get-course/${id}`);
      setDetails(data.courses);
    } catch (error) {
      console.error("Failed to fetch course details", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

 
  if (!details) {
    return <div className="text-center mt-10">Loading course details...</div>;
  }

  return (
   <Layout>

  
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg font-semibold">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{details.title}</h1>
      </div>

      <div className="mb-4">
        <img
          src={details.coverImg}
          alt={details.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Category</h2>
        <p className="text-gray-600">{details.category}</p>
      </div>
      <div className="mb-6">
        
        <p className="text-gray-600 ">{details.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Price</h2>
        <p className="text-gray-600">₹{details.price}</p>
        <div className="my-3 ">
 <div >
  <Link 
  to = {`payment`}
  className="bg-blue-400 inline-block p-2 rounded-lg hover:scale-95 duration-150">
   
    Pay Now</Link>
 </div>
</div>

      </div>

      {/* <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Video URLs</h2>
        <ul className="list-disc pl-5 text-gray-600">
          {details.videoUrls?.map((url, index) => (
            <li key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Video {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div> */}
       <Outlet context={{ price: details.price,id:details._id }} />
    </div>
    </Layout>
  );
};

export default Enroll;