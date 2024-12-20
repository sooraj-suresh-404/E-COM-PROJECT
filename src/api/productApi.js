import axios from "axios";

const product_URL =  "http://localhost:3000/products";

export const getallProducts = async () => {
    return await axios.get(product_URL);
}

// export const getProductById = async (id) => {
//     return await axios.get(`${product_URL}/${id}`);
// }