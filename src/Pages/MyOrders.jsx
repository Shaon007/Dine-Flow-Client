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
        const res = await fetch(`https://dine-flow-server-neon.vercel.app/purchases/${user.email}`);
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
      Swal.fire("Success", "Order deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting order:", err);
      Swal.fire("Error", err.message || "An error occurred", "error");
    }
  };

  if (loading) return <div>Loading user information...</div>;
  if (fetchError) return <div>Error fetching orders: {fetchError}</div>;

  return (
    <div className="my-orders-page my-12 lg:w-11/12 mx-auto">
      <h1 className="text-2xl md:text-4xl text-center font-bold my-6">My Orders</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse text-sm md:text-base">
            <thead>
              <tr>
                <th className="px-2 md:px-4 py-2 border">Food Name</th>
                <th className="px-2 md:px-4 py-2 border">Quantity</th>
                <th className="px-2 md:px-4 py-2 border">Price</th>
                <th className="px-2 md:px-4 py-2 border">Order Date</th>
                <th className="px-2 md:px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-2 md:px-4 py-2 border">{order.foodName}</td>
                  <td className="px-2 md:px-4 py-2 border">{order.quantity}</td>
                  <td className="px-2 md:px-4 py-2 border">${order.price}</td>
                  <td className="px-2 md:px-4 py-2 border">
                    {order.buyingDate
                      ? new Date(order.buyingDate).toLocaleDateString()
                      : "Date not available"}
                  </td>
                  <td className="px-2 md:px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-white py-1 px-2 md:px-3 rounded-lg hover:bg-red-600 flex items-center justify-center"
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
        <p className="text-center text-lg mt-8">No orders found for your account.</p>
      )}
    </div>
  );
};

export default MyOrders;
