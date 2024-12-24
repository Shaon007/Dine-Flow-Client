import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import Lottie from "lottie-react";
import registerLottieData from '../assets/lottie/register.json';

const Register = () => {
  const [error, setError] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');
    const photo = form.get('photo');
    const password = form.get('password');

    if (!validatePassword(password)) {
      setError({ ...error, password: 'Password must be at least 6 characters long, include 1 uppercase and 1 lowercase letter.' });
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration Successful.");

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            console.error('Profile update error:', err);
          });
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f7f7f7]">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-center text-[#9333EA] mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
              <input
                id="photoUrl"
                name="photo"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter your profile photo URL"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                required
              />
              {error.password && <p className="mt-2 text-sm text-red-700">{error.password}</p>}
            </div>
            {error.login && <p className="text-sm text-red-700 mb-4">{error.login}</p>}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 bg-[#9333EA] text-white rounded-lg shadow-md hover:bg-[#7b2ad7]"
              >
                Register
              </button>
              <p className='mt-5'>Already Have an Account? <Link to='/login' className= 'hover:underline pl-2 text-purple-600'>Log In</Link></p>
            </div>
          </form>
        </div>

        {/* Animation Section */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
          <Lottie animationData={registerLottieData} loop={true} style={{ width: '350px', height: '350px' }} />
        </div>
      </div>
    </div>
  );
};

export default Register;
