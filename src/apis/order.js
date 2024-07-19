import axios from "../config/axios";

const orderApi = {};

orderApi.get = (body) => axios.get("/orders", body);
orderApi.post = (body) => axios.post("/orders", body);

export default orderApi;
