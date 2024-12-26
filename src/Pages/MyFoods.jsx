import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import FoodCard from "../Component/FoodCard";

const MyFoods = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Fetch food items from API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:5000/foods");
        if (!response.ok) throw new Error("Failed to fetch food items.");
        const data = await response.json();
        setFoods(data);
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
  const userFoods = foods.filter((food) => food.email?.toLowerCase() === user?.email?.toLowerCase());

  return (
    <div className="my-foods-page">
      <h1 className="text-2xl font-bold mb-4">My Foods</h1>
      {userFoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <p>No food items found for your account.</p>
      )}
    </div>
  );
};

export default MyFoods;
