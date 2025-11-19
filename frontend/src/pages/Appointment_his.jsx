import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../components/header.jsx';

const Appointment_his = () => {

    const [appointments, setAppointments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                    return;
                }

                const response = await axios.get("http://localhost:5000/appointments", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);
                console.log("Fetched appointments:", response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [refresh]);


        return (
        <div>
                <Header />

                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl sm:text-3xl font-bold">Appointment History / Status</h1>
                            <div>
                                <button
                                    onClick={() => setRefresh(r => !r)}
                                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>

                        <div className="mt-6">
                            {appointments.length === 0 ? (
                                <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-gray-600 dark:text-gray-300">
                                    No appointments found.
                                </div>
                            ) : (
                                <div className="overflow-auto rounded-lg shadow">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                {Object.keys(appointments[0]).map((col) => (
                                                    <th
                                                        key={col}
                                                        scope="col"
                                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        {col}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                            {appointments.map((apt, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    {Object.keys(appointments[0]).map((col) => {
                                                        const val = apt[col];
                                                        const text =
                                                            val === null || val === undefined
                                                                ? ''
                                                                : typeof val === 'object'
                                                                ? JSON.stringify(val)
                                                                : String(val);
                                                        return (
                                                            <td key={col} className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                                                                {text}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
        )
};

export default Appointment_his;