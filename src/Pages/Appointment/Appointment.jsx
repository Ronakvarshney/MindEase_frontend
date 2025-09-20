import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles
import ErrorPage from '../Error/Error';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Appointment = () => {
  const location = useLocation();
  const { expert } = location.state || {};
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null); // Time selected by the user
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // Personal information state object
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '', // Emergency contact number
    language: '', // Preferred language
    mode: '', // Mode of consultation (Video or Telephone)
    duration: '', // Duration of suffering
    symptoms: '', // Symptoms description
    description: '', // Detailed problem description
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false); // Close the calendar once the date is selected
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/booking',
        {
          time: time.toLocaleTimeString(),
          date: date.toLocaleDateString(),
          doctor: expert.name,
          user : personalInfo, // Spread the personal info into the request body
        },
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
      toast.success(data.msg);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem('token') || localStorage.getItem('user'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      {user ? (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800">Welcome!</h1>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Book your appointment in a few simple steps: Choose a service, select a date and time, fill in your details, and we'll see you soon...
            </p>
          </div>

          {/* Expert Details Section */}
          <div className="flex items-center justify-start gap-6 bg-gray-50 p-6 rounded-xl shadow-md mt-6">
            <img
              src={expert?.src}
              alt={expert?.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{expert?.name}</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">{expert?.specialization}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Fill Personal Information</h3>
            <p className="mt-2 text-sm text-gray-600">Please fill in your personal details below.</p>

            {/* Full Name */}
            <div className="mt-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={personalInfo.name}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone */}
            <div className="mt-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Emergency Contact */}
            <div className="mt-4">
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
              <input
                id="emergencyContact"
                name="emergencyContact"
                type="tel"
                value={personalInfo.emergencyContact}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter an emergency contact number"
              />
            </div>

            {/* Language */}
            <div className="mt-4">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">Preferred Language</label>
              <input
                id="language"
                name="language"
                type="text"
                value={personalInfo.language}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter preferred language"
              />
            </div>

            {/* Mode of Consultation */}
            <div className="mt-4">
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode of Consultation</label>
              <select
                id="mode"
                name="mode"
                value={personalInfo.mode}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Mode</option>
                <option value="video">Video</option>
                <option value="telephone">Telephone</option>
              </select>
            </div>

            {/* Duration of Suffering */}
            <div className="mt-4">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">How Long Have You Been Suffering?</label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={personalInfo.duration}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter how long you have been suffering"
              />
            </div>

            {/* Symptoms */}
            <div className="mt-4">
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Problem Symptoms</label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={personalInfo.symptoms}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Describe your symptoms"
              />
            </div>

            {/* Description */}
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Problem Description</label>
              <textarea
                id="description"
                name="description"
                value={personalInfo.description}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Provide a detailed description of your issue"
              />
            </div>
          </div>

          {/* Booking Section */}
          <div className="p-6 bg-white shadow rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Book Your Appointment</h2>

            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <div
                onClick={() => setShowCalendar(!showCalendar)}
                className="p-2 border border-gray-300 rounded-lg cursor-pointer"
              >
                {date ? date.toDateString() : 'Select a date'}
              </div>
              {showCalendar && (
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="mt-2 border-2 border-gray-300 rounded-lg"
                />
              )}
            </div>

            {/* Time Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
              <DatePicker
                selected={time}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15} // Select time intervals of 15 minutes
                timeCaption="Time"
                dateFormat="h:mm aa" // Format the time
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Book Appointment Button */}
            <div className="flex justify-center">
              <button
                onClick={handleBooking}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
      <ToastContainer />
    </div>
  );
};

export default Appointment;
