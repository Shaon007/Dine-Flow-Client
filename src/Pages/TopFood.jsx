import { useEffect, useState } from "react";

const TopFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/foods')
      .then(res => res.json())
      .then(data => {
        const sortedFoods = data.sort((a, b) => b.sellingCount - a.sellingCount);
        setFoods(sortedFoods.slice(0, 6));

      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Selling Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{food.name}</h3>
              <p className="text-gray-600">Selling Count: {food.sellingCount}</p>
              <p className="text-gray-800 font-bold">${food.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFood;
