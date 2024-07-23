import axios from "../config/axios";

const paymentApi = {};

paymentApi.get = () => axios.get("/payments");
paymentApi.post = (body) => axios.post("/payments", body);

paymentApi.updateStatus = (itemId, newStatus) =>
  axios.patch(`/payments/admin/${itemId}`, {
    status: newStatus,
  });

paymentApi.updateMethod = (itemId, newMethod) =>
  axios.patch(`/payments/admin/method/${itemId}`, {
    method: newMethod,
  });
export default paymentApi;
