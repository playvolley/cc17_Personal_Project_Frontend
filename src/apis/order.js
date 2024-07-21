import axios from "../config/axios";

const orderApi = {};

orderApi.get = (id) =>
  axios.get("/orders", {
    params: {
      id: id,
    },
  });

orderApi.post = (body) => axios.post("/orders", body);

export default orderApi;
