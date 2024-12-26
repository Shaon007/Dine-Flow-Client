import { Link, useLoaderData } from "react-router-dom";

const FoodDetails = () => {
  const food = useLoaderData();
  const {
    foodName,
    price,
    foodCategory,
    foodImage,
    foodOrigin,
    purchaseCount,
    description: { ingredients, makingProcedure },
  } = food;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-5">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">{foodName}</h2>
        <p className="text-lg text-blue-600 font-semibold">{foodCategory}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={foodImage}
            alt={foodName}
            className="rounded-lg shadow-md w-full object-cover h-72"
          />
        </div>

        <div className="flex-1 space-y-4">
          <p>
            <span className="font-semibold text-gray-700">Origin:</span> {foodOrigin}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Price:</span> ${price}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Sold:</span> {purchaseCount}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Ingredients:</span> {ingredients}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Making Procedure:</span>{" "}
            {makingProcedure}
          </p>

          {/* Pass foodName as state */}
          <Link to="/purchase" state={{ foodName, price }}>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
              Purchase
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
