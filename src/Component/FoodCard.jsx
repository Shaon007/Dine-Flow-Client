import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const {foodName, foodCategory, purchaseCount, price, _id} = food;
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl">
      <img
        src={food.image}
        alt={food.foodName}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{food.foodName}</h3>
        <p className="text-blue-500">{food.foodCategory}</p>
        <p className="text-gray-600">Sold: {food.purchaseCount}</p>
        <p className="text-gray-800 text-2xl font-bold">${food.price}</p>
      </div>
      <Link to={`/foods/${_id}`}>
        <button className="btn bg-green-200 hover:bg-green-300">Details</button>
      </Link>
    </div>
  );
};

export default FoodCard;
