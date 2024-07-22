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

export default orderApi;
