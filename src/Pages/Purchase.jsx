import Swal from "sweetalert2";
import { AuthContext } from "./../Provider/AuthProvider";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const Purchase = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const foodName = location.state?.foodName || "";
  const foodPrice = location.state?.price || "";
  const availableQuantity = location.state?.quantity || 0; // Fetch available quantity

  const handlePurchase = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const price = form.price.value;
    const quantity = form.quantity.value;

    if (quantity > availableQuantity) {
      Swal.fire({
        icon: "error",
        title: "Order Exceeds Available Stock",
        text: `You cannot order more than the available quantity of ${availableQuantity}.`,
      });
      return;
    }

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const newPurchase = {
      foodName,
      price,
      quantity,
      buyer: {
        name: user?.displayName,
        email: user?.email,
      },
      buyingDate: formatDate(Date.now()),
    };

    console.log(newPurchase);

    fetch("https://dine-flow-server-neon.vercel.app/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPurchase),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your order has been placed.",
            icon: "success",
            confirmButtonText: "OK",
          });
          form.reset();
        }
      });
  };

  return (
    <div className="flex justify-center items-center my-10 md:w-11/12 lg:w-full mx-auto">
      <form
        onSubmit={handlePurchase}
        className="max-w-3xl mx-auto bg-[#F4F3F0] px-6 py-6 rounded-xl"
      >
        <h6 className="text-gray-800 text-3xl mt-3 mb-6 font-bold uppercase text-center">
          Purchase Food
        </h6>
        <div className="flex flex-wrap">
          {/* Food Name */}
          <div className="w-full px-4 mb-4">
            <label
              className="block uppercase text-gray-800 text-xs font-bold mb-2"
              htmlFor="foodName"
            >
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              value={foodName}
              readOnly
              className="border px-3 py-3 text-gray-800 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              required
            />
          </div>

          {/* Price */}
          <div className="w-full lg:w-6/12 px-4 mb-4">
            <label
              className="block uppercase text-gray-800 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={foodPrice}
              placeholder="Enter price"
              readOnly={!!foodPrice}
              className={`border px-3 py-3 text-gray-800 ${foodPrice ? "bg-gray-200" : "bg-white"
                } rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
              required
            />
          </div>

          {/* Quantity */}
          <div className="w-full lg:w-6/12 px-4 mb-4">
            <label
              className="block uppercase text-gray-800 text-xs font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              className="border px-3 py-3 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              required
            />
          </div>

          {/* Buyer Name */}
          <div className="w-full lg:w-6/12 px-4 mb-4">
            <label
              className="block uppercase text-gray-800 text-xs font-bold mb-2"
              htmlFor="buyerName"
            >
              Buyer Name
            </label>
            <input
              type="text"
              name="buyerName"
              value={user?.displayName || ""}
              readOnly
              className="border px-3 py-3 text-gray-800 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>

          {/* Buyer Email */}
          <div className="w-full lg:w-6/12 px-4 mb-4">
            <label
              className="block uppercase text-gray-800 text-xs font-bold mb-2"
              htmlFor="buyerEmail"
            >
              Buyer Email
            </label>
            <input
              type="email"
              name="buyerEmail"
              value={user?.email || ""}
              readOnly
              className="border px-3 py-3 text-gray-800 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>

          <div className="w-full px-4 mt-4">
            <input
              type="submit"
              value="Purchase"
              className="w-full py-3 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-150 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Purchase;
