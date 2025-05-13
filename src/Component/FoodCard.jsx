import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const { foodName, foodCategory, purchaseCount, price, _id, foodImage } = food;

  return (
    <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.02] overflow-hidden dark:bg-stone-300">
      <img
        src={foodImage}
        alt={foodName}
        className="w-full h-36 md:h-48 object-cover"
      />

      <div className="p-4 space-y-2 ">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{foodName}</h3>
        <p className="text-sm text-red-400 font-medium">{foodCategory}</p>
        <p className="text-sm text-gray-500">Sold: {purchaseCount || 0}</p>
        <p className="text-xl text-gray-900 font-bold">${price}</p>

        <Link to={`/foods/${_id}`}>
          <button className="mt-3 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;