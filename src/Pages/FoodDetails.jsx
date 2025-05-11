import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
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
    if (user?.email === addedByEmail) {
      Swal.fire({
        icon: "error",
        title: "Unable to Purchase",
        text: "You cannot purchase a food item that you added!",
      });
      return;
    }

    if (quantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This item is currently unavailable.",
      });
      return;
    }

    navigate("/purchase", {
      state: { foodName, price, quantity, foodImage },
    });
  };

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-gray-900 overflow-hidden flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white dark:bg-stone-200 shadow-xl rounded-xl overflow-hidden">
        <div className="text-center px-4 py-6 border-b">
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-gray-800">{foodName}</h2>
          <p className="text-blue-600 font-medium text-md md:text-lg mt-2">{foodCategory}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={foodImage}
              alt={foodName}
              className="rounded-lg shadow-md w-full h-72 object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 overflow-auto">
            <div className="space-y-3 text-gray-700 text-base">
              <p>
                <span className="font-semibold">Origin:</span> {foodOrigin}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${price}
              </p>
              <p>
                <span className="font-semibold">Ingredients:</span> {ingredients}
              </p>
              <p>
                <span className="font-semibold">Making Procedure:</span> {makingProcedure}
              </p>
              <p className={quantity === 0 ? "text-red-600 font-semibold" : "font-semibold"}>
                {quantity === 0
                  ? "This item is currently unavailable."
                  : `Available Quantity: ${quantity}`}
              </p>
            </div>

            <button
              onClick={handlePurchaseClick}
              disabled={quantity === 0}
              className={`w-full mt-6 py-3 text-lg rounded-lg transition-all duration-300 font-semibold
                ${quantity === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
