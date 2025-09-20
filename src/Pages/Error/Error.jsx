import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something Went Wrong</h1>
      <p className="text-lg mb-6">We couldn't find the page you're looking for. Please try again later or go back to the homepage.</p>
      <a href="/" className="px-6 py-3 text-white bg-blue-600 rounded-md text-lg hover:bg-blue-700 transition-colors">
        Go Back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
