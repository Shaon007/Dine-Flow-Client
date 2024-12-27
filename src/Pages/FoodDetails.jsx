import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const FoodDetails = ({ loggedInUserEmail }) => {
  const food = useLoaderData();
  const {
    foodName,
    price,
    foodCategory,
    foodImage,
    foodOrigin,
    addedByEmail,
    description: { ingredients, makingProcedure },
  } = food;

  const handlePurchaseClick = () => {
    if (loggedInUserEmail === addedByEmail) {
      Swal.fire({
        icon: "error",
        title: "Unable to Purchase",
        text: "You cannot purchase a food item that you added!",
      });
      return;
    }
    window.location.href = `/purchase?foodName=${encodeURIComponent(foodName)}&price=${price}`;
  };

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
            <span className="font-semibold text-gray-700">Ingredients:</span> {ingredients}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Making Procedure:</span>{" "}
            {makingProcedure}
          </p>

          {/* Button to trigger purchase check */}
          <button
            onClick={handlePurchaseClick}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
