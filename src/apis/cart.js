import axios from "../config/axios";

const cartApi = {};

cartApi.get = (body) => axios.get("/cart", body);
cartApi.post = (body) => axios.post("/cart", body);
cartApi.delete = (body) => {
  console.log("bodyApi = ", body);
  return axios.delete("/cart", body);
};

export default cartApi;
