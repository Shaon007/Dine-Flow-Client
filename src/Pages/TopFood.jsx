import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../Component/FoodCard";

const TopFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => {
        const filteredFoods = data
          .filter((food) => food.purchaseCount >= 5)
          .sort((a, b) => b.purchaseCount - a.purchaseCount);
        setFoods(filteredFoods.slice(0, 6));
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Selling Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map(food => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <Link to="/allFoods">
          <button className="btn w-40 text-xl font-bold">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default TopFood;
