import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import { useOutletContext } from "react-router-dom";

const CoursePayment = () => {
  // const [orderId, setOrderId] = useState("");
  const [paymentCheck, setPaymentCheck] = useState(false);
  const [videos, setVideos] = useState([]);
  const { price, id } = useOutletContext();

  const currency = "INR";
  const receiptId = Math.floor(Math.random() * 12);

  const paymentHandler = useCallback(async () => {
    try {
      const { data } = await api.post("/cart/createOrder", {
        amount: price * 100, // Amount in the smallest currency unit
        currency,
        receipt: receiptId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: price * 100,
        currency,
        name: "LMS",
        description: "Payment Transaction",
        order_id: data.order_id,
        handler: () => {
          alert("Transaction Successful");
          setPaymentCheck(true);
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", () => alert("Transaction Failed"));
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  }, [price, currency, receiptId]);

  const getVideos = useCallback(async () => {
    try {
      const { data } = await api.get(`course/get-course/${id}`);
      setVideos(data.courses.videoUrls || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }, [id]);

  useEffect(() => {
    paymentHandler();
  }, [paymentHandler]);

  useEffect(() => {
    if (paymentCheck) {
      getVideos();
    }
  }, [paymentCheck, getVideos]);

  return (
    <ul>
      {videos.map((videoUrl, idx) => (
        <li key={idx}>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Video {idx + 1}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CoursePayment;
