import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import orderApi from "../apis/order";
import productApi from "../apis/product";

export default function OrderHistory() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const responseOrders = await orderApi.get(user.id);
      try {
        setOrders(responseOrders.data);
        console.log("responseOrders.data = ", responseOrders.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const responseProducts = await productApi.get();
        setProducts(responseProducts.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
    fetchProducts();
  }, [user.id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );

  // คำนวณ Summary Price
  const summaryPrice = orders.reduce((total, order) => {
    const orderTotalPrice = order.orderItems.reduce((orderTotal, item) => {
      return orderTotal + item.price;
    }, 0);
    return total + orderTotalPrice;
  }, 0);

  return (
    <div className="container mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-10 mt-10">History</h2>
      <span>Order for </span>
      <span className="font-semibold ">
        {user.firstName} {user.lastName}
      </span>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul>
          {orders.map((order) => {
            const totalPrice = order.orderItems.reduce((total, item) => {
              return total + item.price;
            }, 0);

            return (
              <li key={order.id} className="mt-4 p-4 border rounded shadow">
                <p>Order ID: {order.id}</p>
                <p>Table: {order.table_id}</p>
                <p>
                  Date_Ordered:{" "}
                  {new Date(order.date_order).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      Product name:{" "}
                      {
                        products.find(
                          (product) => product.id === item.product_id
                        )?.name
                      }
                      , Amount: {item.amount}, Price: {item.price} Baht
                    </li>
                  ))}
                </ul>
                <b>Total Price: {totalPrice} Baht</b>
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-6">
        <b>Summary Price: {summaryPrice} Baht</b>
      </div>
    </div>
  );
}
