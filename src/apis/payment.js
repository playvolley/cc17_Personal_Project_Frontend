import axios from "../config/axios";

const paymentApi = {};

paymentApi.get = () => axios.get("/payments");
paymentApi.post = (body) => axios.post("/payments", body);

export default paymentApi;
