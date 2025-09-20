import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DonatePage = () => {
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    setDonationData({ ...donationData, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle donation (e.g. send to backend or Razorpay)
    console.log("Donation Submitted:", donationData);
    alert("Thanks for your Support ,Details of Payment sent to your email");
    setDonationData({
      name: "",
      email: "",
      amount: ""
    })

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">
          Support Mental Health for All
        </h1>
        <p className="text-gray-600 mb-6">
          Your donation helps provide mental health care to those who can't afford it.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2784/2784459.png"
          alt="Donate"
          className="w-24 h-24 mx-auto mb-6"
        />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={donationData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={donationData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <select
            name="amount"
            value={donationData.amount}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Choose Donation Amount</option>
            <option value="100">₹100</option>
            <option value="500">₹500</option>
            <option value="1000">₹1000</option>
            <option value="custom">Custom Amount</option>
          </select>
         
         




            <button

              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 mt-2 px-6 rounded-xl shadow-md transition duration-300"
            >
              Submit Details
            </button>
          

        </form>
        <div className="flex justify-between" >
            <h2>Choose A Method to Pay-</h2>
          <div className="flex gap-2 items-center">
            
            <div>
            <a href="https://paytm.com" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/paytm_icon-icons.webp" width={40} height={40} />
              </a>
            </div>
            <div>
            <a href="https://phonepe.com" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/download.jpg" width={40} height={40} />
              </a>
            </div>

          </div>
          </div>

        <p className="text-sm text-gray-500 mt-6">
          Every rupee counts. Thank you for your kindness.
        </p>
      </div>

    </div>
  );
};

export default DonatePage;