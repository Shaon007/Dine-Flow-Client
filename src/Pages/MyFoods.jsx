import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const MyFoods = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5000/foods",{withCredentials:true});
        setFoods(response.data);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setFetchError(err.message);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <div>Loading user information...</div>;
  if (fetchError) return <div>Error fetching food data: {fetchError}</div>;

  // Filter foods based on the logged-in user's email
  const userFoods = foods.filter(
    (food) => food.addedByEmail?.toLowerCase() === user?.email?.toLowerCase()
  );

  return (
    <div className="my-foods-page">
      <h1 className="text-2xl font-bold mb-4">My Foods</h1>
      {userFoods.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Food Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Sold</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {userFoods.map((food) => (
              <tr key={food._id}>
                <td className="px-4 py-2 border">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border">{food.foodName}</td>
                <td className="px-4 py-2 border">{food.foodCategory}</td>
                <td className="px-4 py-2 border">${food.price}</td>
                <td className="px-4 py-2 border">{food.purchaseCount || 0}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/updateFood/${food._id}`}>
                    <button className="btn bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No food items found for your account.</p>
      )}
    </div>
  );
};

export default MyFoods;
