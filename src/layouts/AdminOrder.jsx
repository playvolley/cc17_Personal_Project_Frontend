/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import orderApi from "../apis/order";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import productApi from "../apis/product";
import axios from "../config/axios";

dayjs.extend(utc);

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const responseOrders = await orderApi.getAllitems();
      try {
        setOrders(responseOrders.data);
        console.log("Admin.data = ", responseOrders.data);
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
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4">
          Loading...
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );

  return (
    <div>
      <TodoList dataAPI={orders} products={products} />
    </div>
  );
}

const updateOrderStatus = async (itemId, newStatus) => {
  try {
    const response = await orderApi.updateStatus(itemId, newStatus);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    return null;
  }
};

const OrderCard = ({ orders, products }) => {
  const [orderItems, setOrderItems] = useState(
    orders.reduce((acc, order) => {
      order.orderItems.forEach((item) => {
        acc[item.id] = item.status;
      });
      return acc;
    }, {})
  );

  const handleStatusChange = (itemId, newStatus) => {
    setOrderItems((prev) => ({
      ...prev,
      [itemId]: newStatus,
    }));
    updateOrderStatus(itemId, newStatus);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="text-2xl font-extrabold mb-5">
        {"Table: " + orders[0].table_id}
      </div>
      {orders.map((order) => (
        <div key={order.date_order} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            {dayjs(order.date_order).utc().format("MMMM DD • HH:m a • YYYY")}
          </h2>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.id} className="mb-1">
                <span className="font-medium">Product name:</span>{" "}
                {
                  products?.find((product) => product.id === item.product_id)
                    ?.name
                }
                ,<span className="font-medium"> Amount:</span> {item.amount},
                <span className="font-medium"> Status:</span>
                <select
                  value={orderItems[item.id]}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="ml-2 p-1 border rounded"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CANCEL">CANCEL</option>
                  <option value="SUCCESS">SUCCESS</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const TodoList = ({ dataAPI, products }) => {
  const groupedOrders = dataAPI.reduce((acc, order) => {
    const key = `${order.table_id}-${order.user_id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      {Object.values(groupedOrders).map((orders, index) => (
        <OrderCard key={index} orders={orders} products={products} />
      ))}
    </div>
  );
};
