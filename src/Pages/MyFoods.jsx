import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaGears } from "react-icons/fa6";
import Error from "./Error";

const MyFoods = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get(
          "https://dine-flow-server-neon.vercel.app/foods",
          { withCredentials: true }
        );
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setFetchError(err.message);
      }
    };
    fetchFoods();
  }, []);

  if (loading) return <div className="text-center py-20">Loading user info…</div>;
  if (fetchError) return <div className="text-center py-20 text-red-600"><Error></Error></div>;

  const userFoods = foods.filter(
    (food) => food.addedByEmail?.toLowerCase() === user?.email?.toLowerCase()
  );

  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 py-16 px-2 md:px-20 flex flex-col justify-center ">
      <h1 className="text-3xl md:text-4xl font-bold text-center dark:text-gray-200 mb-10 md:mb-20 font-mono">My Foods</h1>

      {userFoods.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white  rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-100 dark:bg-stone-300">
              <tr>
                {["Image", "Name", "Category", "Price", "Sold", "Action"].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:bg-stone-300">
              {userFoods.map((food, idx) => (
                <tr
                  key={food._id}
                  className={idx % 2 === 0 ? "bg-white dark:bg-stone-200" : "bg-gray-50 dark:bg-stone-300"}
                >
                  <td className="py-3 px-6">
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-800">{food.foodName}</td>
                  <td className="py-3 px-6 text-gray-800">{food.foodCategory}</td>
                  <td className="py-3 px-6 text-gray-800">${food.price}</td>
                  <td className="py-3 px-6 text-gray-800">
                    {food.purchaseCount || 0}
                  </td>
                  <td className="py-3 px-6">
                    <Link to={`/updateFood/${food._id}`}>
                      <FaGears className="w-6 h-6 text-gray-600 hover:text-gray-900 transition" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">You haven't added any foods yet.</p>
      )}
    </div>
  );
};

export default MyFoods;