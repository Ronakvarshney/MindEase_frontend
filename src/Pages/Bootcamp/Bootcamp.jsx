import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const BootcampPage = () => {
  const [isEligible, setIsEligible] = useState(false);
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleEligibilityCheck = () => {
    if (document) {
      // This can be expanded to include actual verification logic
      setIsEligible(true);
    } else {
      alert("Please upload your BPL or Ration card to verify your eligibility and earn Free Bootcamps Chance.");
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-900">Mental Health Bootcamp</h1>
        <p className="text-lg text-gray-600 mt-2">Free Bootcamps For Poors , Yoga Classes & More for Mental Health Improvement</p>
      </header>

      <div className="container mx-auto px-6 bg-white shadow-xl rounded-lg p-8 mb-12">
        <div className='flex items-center justify-center'>
          <img src='/11098.jpg' className='w-1/2 ' />
        </div>
        <h2 className="text-3xl font-semibold text-blue-900 mb-6">Join Our Mental Health Bootcamp Free For Poor's</h2>
        <p className="text-gray-700 mb-4">
          Our bootcamps and yoga classes are designed to help individuals improve their mental health. We offer free programs to those who are eligible.
          Please upload your BPL or Ration card for verification.
        </p>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-blue-900">Upload Your BPL or Ration Card</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>

        <button
          onClick={handleEligibilityCheck}
          className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all"
        >
          Verify Eligibility
        </button>
      </div>

      {isEligible && (
        <div className="container mx-auto px-6 bg-green-100 shadow-xl rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Congratulations! You're Eligible</h2>
          <p className="text-gray-700 mb-4">
            You're eligible for the free mental health bootcamp and yoga classes. Please complete your registration below.
          </p>
          <div className="flex justify-center mt-4">
            <button onClick={() => navigate("/freebootcamp")}
              className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all"
            >
              Enter
            </button>
          </div>
        </div>
      )}

      {!isEligible && document && (
        <div className="container mx-auto px-6 bg-yellow-100 shadow-xl rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-yellow-900 mb-4">Not Eligible for Free Bootcamp</h2>
          <p className="text-gray-700 mb-4">
            Unfortunately, you're not eligible for the free bootcamp. However, you can still participate by paying for the program. Click below to proceed.
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {/* Programs Section - Card Layout */}
      <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img src="/Screenshot_2025-02-05_at_2.17.05_PM.webp" alt="Bootcamp Program" className="w-57  h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900">Mental Health Bootcamp</h3>
            <p className="text-gray-600 mt-2">
              Our mental health bootcamp is a comprehensive program that provides tools and strategies to help you overcome stress, anxiety, and depression.
            </p>
            <button className="mt-4 bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img src="/6172edae4f281c001296a1e7.webp" alt="Yoga Classes" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900">Free Yoga Classes</h3>
            <p className="text-gray-600 mt-2">
              Improve your mental health with daily yoga sessions designed to relax your body, clear your mind, and enhance overall well-being.
            </p>
            <button className="mt-4 bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <img src="/people-in-addiction-treatment-program.jpg" alt="Therapy Programs" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-900">Therapy Programs</h3>
            <p className="text-gray-600 mt-2">
              Our therapy programs offer personalized sessions with experienced therapists who can help you through your mental health journey.
            </p>
            <button className="mt-4 bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800">What is the Mental Health Bootcamp?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our Mental Health Bootcamp is a free, self-paced program designed to help you build strong mental resilience.
            Whether you are dealing with stress, anxiety, or just need guidance on self-care, this bootcamp provides you with the
            tools and resources to take control of your mental health.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Daily Mindfulness Practices</h3>
              <p className="mt-4 text-gray-600">Learn techniques to center your mind and manage anxiety.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Mental Health Exercises</h3>
              <p className="mt-4 text-gray-600">Practice exercises to reduce stress and boost mental well-being.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Expert Guidance</h3>
              <p className="mt-4 text-gray-600">Get access to expert tips and advice on managing mental health challenges.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 bg-white shadow-xl rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6">Program Details</h2>
        <p className="text-gray-700 mb-4">
          All programs are designed to improve your mental health and help you build a more resilient and positive mindset. Join our community to get started.
        </p>
        <p className="text-gray-700 mb-4">
          If you're in need of mental health support or simply want to improve your well-being, our team is here to guide you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default BootcampPage;
