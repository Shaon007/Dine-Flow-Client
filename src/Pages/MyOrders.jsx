import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders?email=${user?.email}`);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setFetchError(err.message);
      }
    };

    if (user?.email) fetchOrders();
  }, [user?.email]);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
      Swal.fire("Success", "Order deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting order:", err);
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <div>Loading user information...</div>;
  if (fetchError) return <div>Error fetching orders: {fetchError}</div>;

  return (
    <div className="my-orders-page my-12">
      <h1 className="text-4xl text-center font-bold my-6">My Orders</h1>
      {orders.length > 0 ? (
        <table className="mx-auto table-auto border-collapse w-10/12">
          <thead>
            <tr>
              <th className="px-2 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Food Name</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">{order.foodName}</td>
                <td className="px-4 py-2 border">{order.quantity}</td>
                <td className="px-4 py-2 border">${order.price}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for your account.</p>
      )}
    </div>
  );
};

export default MyOrders;
