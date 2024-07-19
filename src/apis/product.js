import axios from "../config/axios";

const productApi = {};

productApi.get = (body) => axios.get("/products", body);
productApi.post = (body) => axios.post("/products", body);

export default productApi;
