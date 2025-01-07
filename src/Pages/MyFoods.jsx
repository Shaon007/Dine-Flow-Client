import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaGears } from "react-icons/fa6";

const MyFoods = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("https://dine-flow-server-neon.vercel.app/foods", { withCredentials: true });
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

  const userFoods = foods.filter(
    (food) => food.addedByEmail?.toLowerCase() === user?.email?.toLowerCase()
  );

  return (
    <div className="my-foods-page my-12">
      <h1 className="text-4xl text-center  font-bold my-6 ">My Foods</h1>
      {userFoods.length > 0 ? (
        <table className="mx-auto table-auto border-collapse w-10/12">
          <thead>
            <tr>
              <th className="px-2 py-2 border">Image</th>
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
                <td className="px-2 py-2 border">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-16 h-16 object-cover rounded mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border">{food.foodName}</td>
                <td className="px-4 py-2 border">{food.foodCategory}</td>
                <td className="px-4 py-2 border">${food.price}</td>
                <td className="px-4 py-2 border">{food.purchaseCount || 0}</td>
                <td className="px-4 py-2 border">
                  <Link to={`/updateFood/${food._id}`}>
                      <FaGears className="w-10 h-10 mx-auto"></FaGears>
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
