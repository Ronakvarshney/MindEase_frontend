import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SelectDoctor = () => {
    const location = useLocation();
    const { expert } = location.state || {};
    const navigate = useNavigate();

    if (!expert) return <div>Loading...</div>; // Handling case where expert data is not available yet
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 py-12">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Doctor Image and Details */}
                <div className="flex flex-col items-center p-8">
                    <img
                        src={expert.src}
                        alt={expert.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600"
                    />
                    <h2 className="mt-6 text-3xl font-semibold text-indigo-900">{expert.name}</h2>
                    <p className="text-sm text-gray-500">{expert.specialization}</p>
                    <p className="mt-4 text-lg text-gray-700">{expert.description}</p>
                </div>

                {/* Degrees Section */}
                <div className="bg-gray-50 p-8">
                    <h3 className="text-2xl font-semibold text-gray-800">Degrees & Qualifications</h3>
                    <ul className="mt-4 space-y-2">
                        {expert?.degrees?.map((degree, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                                <span className="text-lg text-gray-600">• {degree}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                <button onClick={()=> navigate("/booking")} className='bg-blue-500 p-2 text-white mt-1'>Book Appointment</button>

                </div>
     
            </div>
            <div>
                <button onClick={()=>navigate("/")} className='bg-red-500 text-white p-2 m-2 rounded-lg'>Back To Home</button>
            </div>
        </div>
    );
};

export default SelectDoctor;
