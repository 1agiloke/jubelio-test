import axios from 'axios';
import Product from "./Product";
const API_KEY = process.env.REACT_APP_API_KEY;
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${API_KEY}`
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const ProductApi = Product;