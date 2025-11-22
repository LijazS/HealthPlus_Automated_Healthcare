import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const resp = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            const data = resp.data;
            console.log("Admin login successful:", data);
            localStorage.setItem("username", formData.username);
            localStorage.setItem("token", data.token);
            // Handle successful admin login, e.g., redirect to admin dashboard
            navigate("/admin/dashboard"); // Example redirect

        } catch (error) {
            console.error("Admin login failed:", error);
            // Handle login failure, e.g., show error message
        }

        // Add your admin login logic here
    }


    return(
        <>
        <div className="w-full top-0 fixed left-0 min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Admin Login
          </h2>
          
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
         



          <div className="sm:col-span-2">
            <label
              htmlFor="text"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Userame*
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Password*
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          


       <div className="w-full sm:col-span-2 relative flex justify-center items-center">
        <button
            type="submit"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-sm font-semibold text-white transition duration-150 cursor-pointer"
        >
            Login
        </button>

        <span className="absolute right-0 text-sm text-gray-500 dark:text-gray-400">
            *Required
        </span>
        </div>



                <p className="text-xs text-gray-400 dark:text-gray-500 sm:col-span-2 text-center">
                    This is only for administrators{" "}
                    
                </p>
                </form>
            </div>
            </div>
        </>
);
}

export default AdminPage;