import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FaKey } from 'react-icons/fa';

const ForgotPass = () => {
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (location?.state) {
      setEmail(location.state);
    }
  }, [location]);

  const resetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.');
      window.open('https://mail.google.com/', '_blank');
      navigate('/login');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to send reset email.');
    }
  };

  return (
    <div className="my-36">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Reset Password</h1>
        <p className="text-slate-500">Fill up the form to reset your password</p>

        <form onSubmit={resetPassword} className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email Address</p>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 border rounded-lg px-3"
                placeholder="Enter your email"
              />
            </label>

            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-indigo-600 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <FaKey />
              <span>Reset Password</span>
            </button>

            {error && <p className="text-red-600 text-center">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
