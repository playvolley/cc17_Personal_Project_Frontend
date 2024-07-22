import { useEffect, useState } from "react";
import orderApi from "../apis/order";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchOrders();
  }, []);

  return (
    <div>
      <TodoList dataAPI={orders} />
    </div>
  );
}

const OrderCard = ({ orders }) => {
  return (
    <div className="card">
      {orders.map((order) => (
        <div key={order.date_order}>
          <h2>{order.date_order}</h2>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.id}>
                Product ID: {item.product_id}, Amount: {item.amount}, Status:{" "}
                {item.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const TodoList = ({ dataAPI }) => {
  const groupedOrders = dataAPI.reduce((acc, order) => {
    const key = `${order.table_id}-${order.user_id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <div>
      {Object.values(groupedOrders).map((orders, index) => (
        <OrderCard key={index} orders={orders} />
      ))}
    </div>
  );
};
