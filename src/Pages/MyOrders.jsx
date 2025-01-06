import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Fetch orders using axiosSecure
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get(`/purchases?email=${user?.email}`);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setFetchError(err.message);
      }
    };

    if (user?.email) fetchOrders();
  }, [user?.email, axiosSecure]);

  const handleDelete = async (orderId) => {
    try {
      await axiosSecure.delete(`/purchases/${orderId}`);
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
    <div className="my-orders-page">
      <h1 className="text-2xl font-bold mb-4 text-center">My Orders</h1>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Food Name</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Order Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border-b">{order.foodName}</td>
                  <td className="px-4 py-2 border-b">{order.quantity}</td>
                  <td className="px-4 py-2 border-b">${order.price}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(order.buyingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
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
        </div>
      ) : (
        <p>No orders found for your account.</p>
      )}
    </div>
  );
};

export default MyOrders;
