import { useEffect, useState } from "react";
import FoodCard from "../Component/FoodCard";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all food items
  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  // Filter foods based on search input
  const filteredFoods = foods.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="bg-gray-100 text-center py-12">
        <h1 className="text-4xl font-bold">All Foods</h1>
      </div>

      {/* Search Bar */}
      <div className="my-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full max-w-md"
        />
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-center col-span-full text-xl text-gray-500">
            No foods found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
