/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import orderApi from "../apis/order";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import productApi from "../apis/product";
import paymentApi from "../apis/payment";
import { Toaster, toast } from "react-hot-toast";

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
  }, [orders]);

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

const createPayment = async (orderItems, totalPrice) => {
  try {
    const orderItemIds = orderItems.map((item) => item.id);

    const response = await paymentApi.post({
      orderItems: orderItemIds,
      status: "NOTYET",
      date_payment: new Date(),
      total: totalPrice,
      method: "Cash",
    });

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    //alert(response.data.message);
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    //alert(error.response.data.message);
    toast.error(error.response.data.message);
    console.error("Error creating payment:", error);
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
  const [totalPrice, setTotalPrice] = useState(0);

  const handleStatusChange = (itemId, newStatus) => {
    setOrderItems((prev) => ({
      ...prev,
      [itemId]: newStatus,
    }));
    updateOrderStatus(itemId, newStatus);
  };

  // ฟังก์ชันคำนวณ total price โดยเฉพาะรายการที่มี status: "SUCCESS"
  useEffect(() => {
    const calculateTotalPrice = (orders) => {
      return orders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
          if (orderItems[item.id] === "SUCCESS") {
            return orderSum + item.price;
          }
          return orderSum;
        }, 0);
        return total + orderTotal;
      }, 0);
    };

    setTotalPrice(calculateTotalPrice(orders));
  }, [orderItems, orders]);

  const handleCreatePayment = async () => {
    const successfulItems = orders
      .flatMap((order) => order.orderItems)
      .filter((item) => orderItems[item.id] === "SUCCESS");

    if (successfulItems.length > 0) {
      await createPayment(successfulItems, totalPrice);
      //alert("Payment created successfully!");
      //toast.success("Successfully toasted!");
    } else {
      //alert("No successful items to create a payment.");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="text-2xl font-extrabold mb-5">
          {"Table: " + orders[0]?.table_id}
        </div>

        {orders.map((order) => (
          <div key={order?.date_order} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              {dayjs(order?.date_order).utc().format("MMMM DD • HH:m a • YYYY")}
            </h2>
            <ul>
              {order.orderItems?.map((item) => (
                <li key={item?.id} className="mb-1">
                  <span className="font-medium">Product name:</span>{" "}
                  {
                    products?.find((product) => product.id === item.product_id)
                      ?.name
                  }
                  ,<span className="font-medium"> Amount:</span> {item?.amount},
                  <span className="font-medium"> Price:</span> {item?.price},
                  <span className="font-medium"> Status:</span>
                  <select
                    value={orderItems[item?.id]}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
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
        <div className="text-xl font-bold">
          {"Total Price: " + totalPrice + " Baht"}
        </div>
        {totalPrice !== 0 && (
          <button
            onClick={handleCreatePayment}
            className="mt-4 p-2 bg-blue-500 text-white rounded font-extrabold hover:bg-blue-800"
          >
            Create Payment
          </button>
        )}
      </div>
    </>
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
      {Object.values(groupedOrders)?.map((orders, index) => (
        <OrderCard key={index} orders={orders} products={products} />
      ))}
    </div>
  );
};
