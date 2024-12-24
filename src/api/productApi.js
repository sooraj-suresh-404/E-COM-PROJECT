import axios from 'axios';

const PRODUCT_URL = "http://localhost:3000/products";
// products

export const getAllProducts = () => {
    return axios.get(PRODUCT_URL);
}
export const getProductById = (productId) => {
    return axios.get(`${PRODUCT_URL}/${productId}`);
}
export const addProduct = async (productData) => {
    try {
      const response = await axios.post(PRODUCT_URL, productData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };
export const updateProduct = (productId, productData) => {
    return axios.patch(`${PRODUCT_URL}/${productId}`, productData);
}
export const deleteProduct = (productId) => {
    return axios.delete(`${PRODUCT_URL}/${productId}`);
}
export const deleteNewProduct = (productId) => {
    return axios.put(`${PRODUCT_URL}/${productId}`);
}
export const getAllProductsAdmin = async () => {
    try {
      const response = await axios.get(PRODUCT_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };