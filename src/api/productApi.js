import axios from 'axios';

const PRODUCT_URL = "http://localhost:3000/products";
// products

export const getAllProducts = () => {
    return axios.get(PRODUCT_URL);
}
export const getProductById = (productId) => {
    return axios.get(`${PRODUCT_URL}/${productId}`);
}
export const addProduct = (productData) => {
    return axios.post(PRODUCT_URL, productData);
}
export const updateProduct = (productId, productData) => {
    return axios.patch(`${PRODUCT_URL}/${productId}`, productData);
}
export const deleteProduct = (productId) => {
    return axios.delete(`${PRODUCT_URL}/${productId}`);
}
export const deleteNewProduct = (productId) => {
    return axios.put(`${PRODUCT_URL}/${productId}`);
}
