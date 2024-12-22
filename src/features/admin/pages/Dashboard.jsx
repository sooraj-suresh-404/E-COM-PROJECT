import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiShoppingBag, FiDollarSign, FiBox } from 'react-icons/fi';

const Dashboard = () => {
    const [data, setData] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
        revenueToday: 0,
        newSignups: 0,
        pendingOrders: 0,
        shippedOrders: 0,
        cancelledOrders: 0,
        topCategories: 0,
        averageOrderValue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch users data
            const usersResponse = await axios.get('http://localhost:3000/users');
            const users = usersResponse.data;
            
            // Fetch products data
            const productsResponse = await axios.get('http://localhost:3000/products');
            const products = productsResponse.data;

            // Calculate statistics
            const totalUsers = users.length;
            // Make sure products is an array before counting
            const totalProducts = Array.isArray(products) ? products.length : 0;
            const newUsers = users.filter(user => {
                const createdDate = new Date(user.createdAt);
                const today = new Date();
                return createdDate.toDateString() === today.toDateString();
            }).length;

            // Calculate product statistics - ensure products is an array
            const totalValue = Array.isArray(products) 
                ? products.reduce((sum, product) => sum + (parseFloat(product.price) || 0), 0)
                : 0;
            const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

            // Get unique brands (categories) - ensure products is an array
            const uniqueBrands = Array.isArray(products) 
                ? new Set(products.map(product => product.brand)).size
                : 0;

            setData({
                users: totalUsers,
                products: totalProducts,
                newSignups: newUsers,
                revenue: totalValue,
                revenueToday: totalValue * 0.1, // Example calculation
                averageOrderValue: averagePrice,
                topCategories: uniqueBrands,
                pendingOrders: Math.floor(Math.random() * 20), // Placeholder
                shippedOrders: Math.floor(Math.random() * 50), // Placeholder
                cancelledOrders: Math.floor(Math.random() * 10), // Placeholder
            });

            setLoading(false);
        } catch (err) {
            console.error('Dashboard data fetch error:', err);
            setError('Failed to fetch dashboard data');
            setLoading(false);
        }
    };

    if (loading) return <div className="p-4">Loading dashboard data...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {typeof value === 'number' && title.toLowerCase().includes('revenue') 
                            ? `$${value.toLocaleString()}` 
                            : value.toLocaleString()}
                    </p>
                </div>
                <Icon className="h-8 w-8 text-gray-400" />
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Users" 
                    value={data.users} 
                    icon={FiUsers}
                    color="border-blue-500"
                />
                <StatCard 
                    title="Total Products" 
                    value={data.products} 
                    icon={FiBox}
                    color="border-green-500"
                />
                <StatCard 
                    title="Total Revenue" 
                    value={data.revenue} 
                    icon={FiDollarSign}
                    color="border-yellow-500"
                />
                <StatCard 
                    title="New Signups Today" 
                    value={data.newSignups} 
                    icon={FiUsers}
                    color="border-purple-500"
                />
            </div>

            {/* Orders Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Pending Orders</p>
                        <p className="text-2xl font-bold text-orange-600">{data.pendingOrders}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Shipped Orders</p>
                        <p className="text-2xl font-bold text-green-600">{data.shippedOrders}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Cancelled Orders</p>
                        <p className="text-2xl font-bold text-red-600">{data.cancelledOrders}</p>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Revenue Today</h3>
                    <p className="text-2xl font-bold text-green-600">
                        ${data.revenueToday.toLocaleString()}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Average Product Price</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        ${data.averageOrderValue.toFixed(2)}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
                    <p className="text-2xl font-bold text-purple-600">{data.topCategories}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
