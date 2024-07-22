import axios from "../config/axios";

const orderApi = {};

orderApi.get = (id) =>
  axios.get("/orders", {
    params: {
      id: id,
    },
  });

orderApi.getAllitems = () => axios.get("/orders/itemorder");

orderApi.post = (body) => axios.post("/orders", body);

orderApi.updateStatus = (itemId, newStatus) =>
  axios.patch(`/orders/admin/${itemId}`, {
    status: newStatus,
  });

export default orderApi;
