import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import auth from '../firebase/Firebase.init';

const Login = () => {
  const provider = new GoogleAuthProvider();
  const { userLogin, setUser } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [forgetEmail, setForgetEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgetPassActive, setIsForgetPassActive] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        toast.success('Google login successful!');
        navigate(location?.state || '/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setForgetEmail(email);
    const password = e.target.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success('Login successful!');
        setIsForgetPassActive(false);
        navigate(location?.state || '/');
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        console.error(err);
        toast.error('Invalid credentials. Please try again.');
        setIsForgetPassActive(true);
      });
  };

  const handleForgetPass = () => {
    if (!isForgetPassActive) {
      toast.error('Forget Pass disabled ');
      return;
    }
    // navigate('/forgot', { state: forgetEmail });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f7f7f7]">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-[#9333EA] mb-6">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              required
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              required
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
          </div>
          {error.login && <label className="label text-sm text-red-700">{error.login}</label>}

          {/* Forgot Password */}
          <p
            onClick={handleForgetPass}
            className={`cursor-pointer text-[#9333EA] hover:underline ${!isForgetPassActive ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            Forgot Password?
          </p>

          {/* Login Button */}
          <div className="my-4">
            <button type="submit" className="w-full p-3 bg-[#9333EA] text-white rounded-lg shadow-md hover:bg-[#7b2ad7]">
              Sign In
            </button>
          </div>
        </form>

        {/* Google Login Button */}
        <div className="mb-6 mt-2">
          <button
            onClick={handleGoogleSignIn}
            className="mb-2 w-full flex items-center justify-center gap-3 p-3 bg-[#4285F4] text-white rounded-lg shadow-md hover:bg-[#357ae8]"
          >
            <i className="fa-brands fa-google"></i>
            Sign in with Google
          </button>
        </div>

        {/* Register Now */}
        <div className="text-center">
          <p className="text-sm">
            New here?{' '}
            <Link to="/register" className="text-[#9333EA] hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
