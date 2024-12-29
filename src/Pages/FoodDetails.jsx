import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);  // Get logged-in user info from context
  const navigate = useNavigate();
  const food = useLoaderData();

  const {
    foodName,
    price,
    foodCategory,
    foodImage,
    foodOrigin,
    addedByEmail,
    quantity,
    description: { ingredients, makingProcedure },
  } = food;

  const handlePurchaseClick = () => {
    // Check if the logged-in user is the one who added the food
    if (user?.email === addedByEmail) {
      // Show modal to inform the user that they can't purchase the food
      Swal.fire({
        icon: "error",
        title: "Unable to Purchase",
        text: "You cannot purchase a food item that you added!",
      });
      return;  // Stop further execution (do not navigate)
    }

    // Check if the food is out of stock
    if (quantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This item is currently unavailable.",
      });
      return;  // Stop further execution (do not navigate)
    }

    // Navigate to the purchase page, passing food details as state
    navigate("/purchase", {
      state: { foodName, price, quantity, foodImage },
    });
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

          {quantity === 0 ? (
            <p className="text-red-600 font-semibold">This item is currently unavailable.</p>
          ) : (
            <p className="font-semibold text-gray-700">Available Quantity: {quantity}</p>
          )}

          <button
            onClick={handlePurchaseClick}
            className={`w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ${quantity === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
            disabled={quantity === 0}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
