import { useEffect, useState } from "react";
import FoodCard from "../Component/FoodCard";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all food items from the API
  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  // Filter foods based on the search term
  const filteredFoods = foods.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="bg-gray-200 text-center py-12">
        <h2 className="text-4xl font-bold">All Foods</h2>
      </div>

      {/* Search Bar */}
      <div className="my-4 text-center">
        <input
          type="text"
          placeholder="Search for foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-3/4 sm:w-1/2"
        />
      </div>

      {/* Displaying Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
