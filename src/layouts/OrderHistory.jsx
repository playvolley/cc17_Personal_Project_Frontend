import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import orderApi from "../apis/order";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.get(user.id);
        setOrders(response.data);
        console.log("response.data = ", response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Orders for {user.firstName}</h1>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul>
          {orders.map((order) => {
            const totalPrice = order.orderItems.reduce((total, item) => {
              return total + item.amount * item.price;
            }, 0);

            return (
              <li key={order.id}>
                <h2>Order ID: {order.id}</h2>
                <h2>Table ID: {order.table_id}</h2>
                <h2>DATE_ORDER: {order.date_order}</h2>
                <h3>Total Price: {totalPrice} Baht</h3>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      Product ID: {item.product_id}, Amount: {item.amount},
                      Price: {item.price} Baht
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
