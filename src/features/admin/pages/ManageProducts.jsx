import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newProduct, setNewProduct] = useState({
        brand: '',
        model: '',
        price: '',
        description: '',
        specifications: {
            display: '',
            processor: '',
            ram: '',
            storage: '',
            battery: '',
            os: ''
        },
        image: '',
        rating: 0
    });

    // Fetch products when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('specifications.')) {
            const specField = name.split('.')[1];
            setNewProduct(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [specField]: value
                }
            }));
        } else {
            setNewProduct(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddProduct = async () => {
        try {
            const response = await axios.post('http://localhost:3000/products', {
                ...newProduct,
                id: Date.now().toString(),
                rating: parseFloat(newProduct.rating) || 0,
                price: parseFloat(newProduct.price)
            });
            
            setProducts([...products, response.data]);
            setNewProduct({
                brand: '',
                model: '',
                price: '',
                description: '',
                specifications: {
                    display: '',
                    processor: '',
                    ram: '',
                    storage: '',
                    battery: '',
                    os: ''
                },
                image: '',
                rating: 0
            });
        } catch (err) {
            setError('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    const handleEditProduct = async (product) => {
        setEditMode(true);
        setNewProduct(product);
    };

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${newProduct.id}`, newProduct);
            setProducts(products.map(p => p.id === newProduct.id ? response.data : p));
            setEditMode(false);
            setNewProduct({
                brand: '',
                model: '',
                price: '',
                description: '',
                specifications: {
                    display: '',
                    processor: '',
                    ram: '',
                    storage: '',
                    battery: '',
                    os: ''
                },
                image: '',
                rating: 0
            });
        } catch (err) {
            setError('Failed to update product');
        }
    };

    if (loading) return <div className="p-4">Loading products...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

            {/* Add/Edit Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {editMode ? 'Edit Product' : 'Add New Product'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="brand"
                        className="p-2 border rounded-md"
                        placeholder="Brand"
                        value={newProduct.brand}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="model"
                        className="p-2 border rounded-md"
                        placeholder="Model"
                        value={newProduct.model}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        className="p-2 border rounded-md"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="image"
                        className="p-2 border rounded-md"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        className="p-2 border rounded-md md:col-span-2"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                    />
                    
                    {/* Specifications */}
                    <div className="md:col-span-2">
                        <h3 className="font-semibold mb-2">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="specifications.display"
                                className="p-2 border rounded-md"
                                placeholder="Display"
                                value={newProduct.specifications.display}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="specifications.processor"
                                className="p-2 border rounded-md"
                                placeholder="Processor"
                                value={newProduct.specifications.processor}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="specifications.ram"
                                className="p-2 border rounded-md"
                                placeholder="RAM"
                                value={newProduct.specifications.ram}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="specifications.storage"
                                className="p-2 border rounded-md"
                                placeholder="Storage"
                                value={newProduct.specifications.storage}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="specifications.battery"
                                className="p-2 border rounded-md"
                                placeholder="Battery"
                                value={newProduct.specifications.battery}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="specifications.os"
                                className="p-2 border rounded-md"
                                placeholder="Operating System"
                                value={newProduct.specifications.os}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={editMode ? handleUpdateProduct : handleAddProduct}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    {editMode ? 'Update Product' : 'Add Product'}
                </button>
                {editMode && (
                    <button
                        onClick={() => {
                            setEditMode(false);
                            setNewProduct({
                                brand: '',
                                model: '',
                                price: '',
                                description: '',
                                specifications: {
                                    display: '',
                                    processor: '',
                                    ram: '',
                                    storage: '',
                                    battery: '',
                                    os: ''
                                },
                                image: '',
                                rating: 0
                            });
                        }}
                        className="mt-4 ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={product.image} 
                                        alt={product.model}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
