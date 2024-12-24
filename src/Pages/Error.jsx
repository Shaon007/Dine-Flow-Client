import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src='https://i.pinimg.com/736x/63/d4/1a/63d41af9e37556966bd00f933925e2ca.jpg'
        alt="404 Not Found"
        className="w-1/2 md:w-1/3 mb-6"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">
        We're sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="text-white bg-violet-400 hover:bg-violet-500 p-3 rounded-lg text-xl"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default Error;