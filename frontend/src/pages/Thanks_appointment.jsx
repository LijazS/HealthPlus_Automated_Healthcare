import React from "react";
import { Link } from "react-router-dom";

const Thanks_appointment = () => {
    return (
    <div>
        <div className="fixed inset-0 w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-8 ext-center mb-8" >
        {/* Header */}
        
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            THANKS FOR TAKING AN APPOINTMENT
          </h2>
            <div className="text-center mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 sm:col-span-2 text-center mb-4">
            We have received your appointment request. Our team will contact you soon to confirm the details.
            </p>
            Go back - <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
            </div>  
          
        </div>
      
      </div>

    </div>
    )

}

export default Thanks_appointment;