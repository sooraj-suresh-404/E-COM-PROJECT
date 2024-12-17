import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();  // Get the product ID from URL parameters
    const [product, setProduct] = useState(null);  // State for storing product data
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const navigate = useNavigate();  // Hook to navigate to another page

    // Fetch product details when the component mounts or the ID changes
    useEffect(() => {
        setLoading(true);  // Start loading when component is mounted

        // Fetch product details from API
        axios
            .get(`http://localhost:5000/products/${id}`)
            .then((response) => {
                setProduct(response.data);  // Set product data to state
                setLoading(false);  // Set loading to false when data is fetched
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setError("Error fetching product details.");
                setLoading(false);
            });
    }, [id]);

    // If loading, show loading message
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // If there's an error fetching the product, show error message
    if (error) {
        return <div className="text-center">{error}</div>;
    }

    // If product is not found, show no product found message
    if (!product) {
        return <div className="text-center">No product found.</div>;
    }

    // Add to Cart functionality (with axios POST request)
    const addToCart = async () => {
        try {
            // Send product data to the cart API
            const response = await axios.post('http://localhost:5002/cart', {
                id: product.id,
                name: product.model,
                price: product.price,
                imageUrl: product.image,  // Make sure the image URL is included
                quantity: 1  // You can dynamically set quantity based on user input if needed
            });

            // Handle successful cart addition
            console.log('Product added to cart:', response.data);
            alert(`${product.model} has been added to your cart!`);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('There was an error adding the product to the cart.');
        }
    };

    // Buy Now functionality (redirect to checkout)
    const buyNow = () => {
        navigate("/checkout", { state: { product } });
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Product Image Section */}
                <div className="flex-1 md:w-2/5">
                    <img
                        src={product.image}
                        alt={product.model}
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Details Section */}
                <div className="flex-1 mt-6 md:mt-0 md:w-3/5">
                    <h2 className="text-3xl font-bold text-gray-800">{product.model}</h2>
                    <p className="text-xl text-gray-600 mt-2">{product.brand}</p>
                    <p className="text-2xl text-green-600 mt-4">${product.price}</p>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                    </div>

                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 ? (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">Specifications</h3>
                            <ul className="list-disc list-inside mt-2 text-gray-600">
                                {Object.entries(product.specifications).map(([key, value], index) => (
                                    <li key={index}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">No specifications available.</h3>
                        </div>
                    )}

                    {/* Add to Cart and Buy Now Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
                        <button
                            className="w-full sm:w-[150px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition mb-4 sm:mb-0"
                            onClick={addToCart}  // Trigger Add to Cart functionality
                        >
                            Add to Cart
                        </button>
                        <button
                            className="w-full sm:w-[150px] bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
                            onClick={buyNow}  // Trigger Buy Now functionality
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
