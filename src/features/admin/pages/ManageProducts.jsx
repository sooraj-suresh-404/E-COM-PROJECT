import React, { useState, useEffect } from 'react';

// Mock API calls for demonstration purposes
const fetchProducts = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Product 1', price: 100, stock: 20, category: 'Category 1' },
                { id: 2, name: 'Product 2', price: 150, stock: 15, category: 'Category 2' },
                { id: 3, name: 'Product 3', price: 200, stock: 10, category: 'Category 1' },
            ]);
        }, 1000);
    });
};

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts().then(fetchedProducts => {
            setProducts(fetchedProducts);
        });
    }, []);

    const handleAddProduct = () => {
        // Logic to add product
        const newProductData = { ...newProduct, id: products.length + 1 };
        setProducts([...products, newProductData]);
        setNewProduct({ name: '', price: '', stock: '', category: '' }); // Reset the form
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEditProduct = (id) => {
        const product = products.find(product => product.id === id);
        setNewProduct(product);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

            {/* Add New Product Form */}
            <div className="bg-gray-200 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        className="p-2 border rounded-md"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded-md"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <input
                        type="number"
                        className="p-2 border rounded-md"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />
                    <input
                        type="text"
                        className="p-2 border rounded-md"
                        placeholder="Category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="mt-4 bg-green-600 text-white p-2 rounded-md"
                >
                    Add Product
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Product List</h2>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Product Name</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Stock</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-t">
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">${product.price}</td>
                                <td className="px-4 py-2">{product.stock}</td>
                                <td className="px-4 py-2">{product.category}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEditProduct(product.id)}
                                        className="bg-blue-600 text-white p-2 rounded-md mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="bg-red-600 text-white p-2 rounded-md"
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
