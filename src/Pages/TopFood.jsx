import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../Component/FoodCard";

const TopFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("https://dine-flow-server-neon.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const filteredFoods = data
          .filter((food) => food.purchaseCount >= 5)
          .sort((a, b) => b.purchaseCount - a.purchaseCount);
        setFoods(filteredFoods.slice(0, 6));
      });
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Parallax Hero Section */}
      <div
        className="relative bg-fixed bg-center bg-cover h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')`,
        }}
      >
        <div className="bg-black/60 px-6 py-10 rounded-xl text-center max-w-2xl text-white shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono tracking-wide">
            Experience the Flavor
          </h2>
          <p className="text-lg md:text-xl font-light">
            Dive into a world of taste with our chef-crafted dishes made from the freshest ingredients.
          </p>
        </div>
      </div>

      {/* Top Foods Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800 font-mono">-- Top Picks --</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-10">
          <Link to="/allFoods">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition">
              See All Foods
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopFood;
