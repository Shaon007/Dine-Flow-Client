import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim() || !photoURL.trim()) {
      setError("Both fields are required!");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      const updatedUser = { ...user, displayName: name, photoURL: photoURL };
      setUser(updatedUser);
      toast.success('Profile Updated ')
      setSuccess("Profile updated successfully!");
      setError("");

    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center  py-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-500 mb-6">
          Welcome, {user?.displayName}
        </h2>

        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {user?.displayName || "Your Name"}
          </h3>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              id="photoURL"
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter photo URL"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {success && (
            <div className="mb-4 text-green-600 text-sm">{success}</div>
          )}
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
