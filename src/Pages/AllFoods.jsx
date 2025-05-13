import { useEffect, useState } from "react";
import FoodCard from "../Component/FoodCard";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Fetch all food items
  useEffect(() => {
    fetch("https://dine-flow-server-neon.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  // Filter and sort logic
  const filteredFoods = foods
    .filter((food) =>
      food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-screen">
      {/* Page Title */}
      <div className="text-center pt-20">
        <h1 className="text-4xl font-bold font-mono dark:text-gray-200">All Foods</h1>
      </div>

      {/* Search and Sort Bar */}
      <div className="my-6 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search for foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border bg-white  border-gray-300 dark:bg-stone-200 rounded-lg w-full max-w-md shadow"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 dark:bg-stone-200 rounded-lg shadow bg-white max-w-xs"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 ">
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