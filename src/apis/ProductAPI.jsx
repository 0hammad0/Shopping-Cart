import axios from "axios";

export const ProductAPI = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});
