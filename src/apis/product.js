import axios from "../config/axios";

const productApi = {};

productApi.get = (body) => axios.get("/products", body);
productApi.post = (body) => axios.post("/products", body);

export const getProducts = () => {
  return axios.get(`/products`);
};

export const addProduct = (product) => {
  return axios.post(`/products`, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`/products/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`/products/${id}`);
};

export default productApi;
