import React from 'react';
import Header from '../components/header.jsx';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {

  const [formData, setFormData]  = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    preferredDate: '',
    speciality: ''
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSBooking = async (e) => {
    e.preventDefault();

    const resp = await axios.post("http://localhost:5000/appointments", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
    const data = resp.data;
    console.log("Appointment booked:", data);
  }



        return(
    <div>
      <div className="Header">
        <Header />
       </div>

       
          
          <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-30 flex items-center justify-center">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            APPOINTMENT BOOKING
          </h2>
          
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         



          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Name*
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="age"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Age*
            </label>
            <input
              name="age"
              type="number"
            value={formData.age}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Email*
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="Phone"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Phone No.*
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="preferredDate"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Preferred Date*
            </label>
            <input
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="speciality"
              className="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >
              Speciality/Department*
            </label>
            <input
              name="speciality"
              type="text"
              value={formData.speciality}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          


       <div className="w-full sm:col-span-2 relative flex justify-center items-center">
  <button
    type="submit"
    className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-sm font-semibold text-white transition duration-150 cursor-pointer"
  >
    BOOK
  </button>

  <span className="absolute right-0 text-sm text-gray-500 dark:text-gray-400">
    *Required
  </span>
</div>

          <p className="text-xs text-gray-400 dark:text-gray-500 sm:col-span-2 text-center">
            By booking an appointment you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-indigo-400 transition-colors duration-150"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
      </div>

    </div>
        )
}

export default Appointments;