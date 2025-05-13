import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa6";

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://dine-flow-server-neon.vercel.app/purchases/${user.email}`
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setFetchError(err.message);
      }
    };

    if (user?.email) fetchOrders();
  }, [user?.email]);

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `https://dine-flow-server-neon.vercel.app/purchases/${orderId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order.");
      }

      setOrders(orders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Order removed successfully", "success");
    } catch (err) {
      console.error("Error deleting order:", err);
      Swal.fire("Error", err.message || "An error occurred", "error");
    }
  };

  if (loading) return <div className="text-center py-20">Loading user info…</div>;
  if (fetchError) return <div className="text-center text-red-600">Error: {fetchError}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-2 md:px-20 flex flex-col justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 dark:text-gray-200 font-mono">My Orders</h1>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-slate-200 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-stone-200 dark:bg-stone-400 ">
              <tr>
                {["Food Name", "Quantity", "Price", "Order Date", "Action"].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-6 text-left text-sm text-gray-700 uppercase tracking-wider font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <tr
                  key={order._id}
                  className={idx % 2 === 0 ? "bg-stone-50 dark:bg-stone-200" : "bg-stone-200 dark:bg-stone-300"}
                >
                  <td className="py-3 px-6 text-gray-800">{order.foodName}</td>
                  <td className="py-3 px-6 text-gray-800">{order.quantity}</td>
                  <td className="py-3 px-6 text-gray-800">${order.price}</td>
                  <td className="py-3 px-6 text-gray-800">
                    {order.buyingDate
                      ? new Date(order.buyingDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-white bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded-md flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          You haven't placed any orders yet.
        </p>
      )}
    </div>
  );
};

export default MyOrders;