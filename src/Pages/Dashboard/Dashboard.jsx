import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MoodChart from '../../Components/MoodChart';
import MentalHealthLineChart from '../../Components/LineChart';
import { toast, ToastContainer } from 'react-toastify';


const Dashboard = () => {
  const [userData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/profile', {
        withCredentials: true,
      });
      
      console.log(res.data.existingUser);
      setData(res.data.existingUser);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Your session will expire please login again")
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

 

  return (
    <div className="p-8 space-y-8 max-w-screen-lg mx-auto">
      {/* User Info Section */}
      <div className="flex items-center space-x-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="w-24 h-24 bg-white rounded-full overflow-hidden">
          {/* Placeholder for Profile Image */}
          {userData?.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-3xl text-gray-500">
              <span>{userData.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{userData?.name}</h2>
          <p className="text-sm text-gray-200">{userData?.email}</p>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-semibold text-gray-800">Upcoming Appointments</h3>
        <div className=''>
          <h2 className='text-xs font-bold '>Total Appointments - {userData?.appointment.length}</h2></div>
        {userData?.appointment && userData?.appointment.length > 0 ? (

          userData?.appointment?.map((appointment) => (

            <div
              key={appointment._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className='font-semibold text-xs m-1'>Doctor's Details -</h2>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {appointment.doctor}
                  </h4>
                  <p className="text-gray-600">{appointment.date}</p>
                  <p className="text-gray-600">{appointment.time}</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
                  View Details
                </button>
              </div>

              {/* Personal Info Section */}
              {appointment.personalinfo && (
                <div className="mt-6 space-y-4 text-sm text-gray-600">
                  <h2 className='text-xs font-semibold text-black'>Personal's Information -</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-800">Phone:</span>{' '}
                      {appointment.personalinfo.name}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Phone:</span>{' '}
                      {appointment.personalinfo.email}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Phone:</span>{' '}
                      {appointment.personalinfo.phone}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Emergency Contact:</span>{' '}
                      {appointment.personalinfo.emergencyContact}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-800">Language:</span>{' '}
                      {appointment.personalinfo.language}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Mode:</span>{' '}
                      {appointment.personalinfo.mode}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Duration:</span>{' '}
                      {appointment.personalinfo.duration}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-800">Symptoms:</span>{' '}
                      {appointment.personalinfo.symptoms}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Description:</span>{' '}
                      {appointment.personalinfo.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments available</p>
        )}
      </div>
      <div>
      <h3 className="text-3xl font-semibold text-gray-800">Mental Health Analysis</h3>
         <div>
          <MentalHealthLineChart scoresOverTime={[5 , 7 , 2]}/>
         </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
