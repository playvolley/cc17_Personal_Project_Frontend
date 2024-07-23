import { useEffect, useState } from "react";
import paymentApi from "../apis/payment";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function AdminPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responsePayments = await paymentApi.get();
        console.log("responsePayments", responsePayments);
        setPayments(responsePayments.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleStatusChangeStatus = (itemId, newStatus) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === itemId ? { ...payment, status: newStatus } : payment
      )
    );
    updatePaymentStatus(itemId, newStatus);
  };

  const updatePaymentStatus = async (itemId, newStatus) => {
    try {
      const response = await paymentApi.updateStatus(itemId, newStatus);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      return null;
    }
  };

  const handleStatusChangeMethod = (itemId, newMethod) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === itemId ? { ...payment, method: newMethod } : payment
      )
    );
    updatePaymentMethod(itemId, newMethod);
  };

  const updatePaymentMethod = async (itemId, newStatus) => {
    try {
      const response = await paymentApi.updateMethod(itemId, newStatus);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 mt-10">
        <div className="w-auto h-auto">
          <ul>
            {payments.map((item) => (
              <li key={item.id} className="mb-4">
                <span className="font-medium"> order_item_id: </span>
                {item?.order_item_id},
                <span className="font-medium"> date_payment: </span>
                <span className="text-lg mb-2">
                  {dayjs(item?.date_payment)
                    .utc()
                    .format("MMMM DD • HH:m a • YYYY")}
                </span>
                ,<span className="font-semibold"> Total: </span> {item?.total},
                <span className="font-semibold"> Status: </span>{" "}
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChangeStatus(item.id, e.target.value)
                  }
                  className="ml-2 p-1 border rounded"
                >
                  <option value="NOTYET">NOTYET</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
                ,<span className="font-semibold"> Method: </span>{" "}
                <select
                  value={item.method}
                  onChange={(e) =>
                    handleStatusChangeMethod(item.id, e.target.value)
                  }
                  className="ml-2 p-1 border rounded"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                  <option value="Promptpay">Promptpay</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
