import React from "react";
import Header from '../components/header.jsx';
import { useState, useEffect } from "react";
import ClientLand from '../components/clientLand.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedUser = localStorage.getItem("userName");

    if (savedEmail) setEmail(savedEmail);
    if (savedUser) setUserName(savedUser);

    const verify = async () => {
      if (!token) return;

      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Token verified:", resp.data);
      } catch (error) {
        if (error.response) {
          console.error(
            "❌ Verification failed:",
            error.response.status,
            error.response.data
          );
          if (error.response.status === 401) {
            alert("Session expired. Please sign in again.");
            navigate("/signin");
          }
        } else {
          console.error("⚠️ Error verifying token:", error.message);
        }
      }
    };

    verify();

    const intervalId = setInterval(verify, 300000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="w-full">
        <Header />
      </div>

      <div className="relative w-screen min-h-screen pt-12 left-0 right-0">
        {token ? (
          <ClientLand />
        ) : (
          <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white md:text-6xl">
              Please sign in to continue
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;