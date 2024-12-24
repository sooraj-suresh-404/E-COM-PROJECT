import React, { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatus } from '../../../api/adminApi';
import { FiPackage, FiUser, FiCalendar, FiClock, FiDollarSign, FiTruck, FiMapPin } from 'react-icons/fi';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetchOrders();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderToUpdate = orders.find(order => order.id === orderId);
            const updatedOrder = { ...orderToUpdate, status: newStatus, updatedAt: new Date().toISOString() };
            const updatedData = await updateOrderStatus(orderId, updatedOrder);
            setOrders(orders.map(order => (order.id === orderId ? updatedData : order)));
        } catch (err) {
            setError(err.message);
        }
    };

    const getStatusColor = (status) => {
        const statusColors = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '🕒' },
            processing: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '⚙️' },
            shipped: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🚚' },
            delivered: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' }
        };
        return statusColors[status?.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: '❓' };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            }),
            time: date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };
    };

    const filteredOrders = filterStatus === 'all' 
        ? orders 
        : orders.filter(order => order.status?.toLowerCase() === filterStatus);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            <p className="font-semibold">Error loading orders:</p>
            <p>{error}</p>
        </div>
    );

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
                
                {/* Filter Section */}
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <label className="text-sm text-gray-600">Filter by Status:</label>
                    <select 
                        className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-gray-500">No orders found</p>
                    </div>
                ) : (
                    filteredOrders.map(order => {
                        const { date, time } = formatDate(order.date);
                        const isExpanded = expandedOrder === order.id;
                        const statusStyle = getStatusColor(order.status);

                        return (
                            <div key={order.id} 
                                className={`bg-white rounded-lg shadow-sm border transition-all duration-200 
                                    ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                            >
                                {/* Order Summary Card */}
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {/* Order Info */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FiPackage className="text-blue-500" />
                                                <span className="font-medium text-gray-800">Order Details</span>
                                            </div>
                                            <p className="text-sm text-gray-600">ID: #{order.id}</p>
                                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text} mt-2`}>
                                                <span>{statusStyle.icon}</span>
                                                <span className="capitalize">{order.status}</span>
                                            </div>
                                        </div>

                                        {/* Customer Info */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FiUser className="text-blue-500" />
                                                <span className="font-medium text-gray-800">Customer</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{order.email}</p>
                                        </div>

                                        {/* Date & Time */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FiCalendar className="text-blue-500" />
                                                <span className="font-medium text-gray-800">Date And Time</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{date}</p>
                                            <p className="text-sm text-gray-500">{time}</p>
                                        </div>

                                        {/* Amount */}
                                        <div>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FiDollarSign className="text-blue-500" />
                                                <span className="font-medium text-gray-800">Total Amount</span>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-800">${order.total}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                                        <select
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-offset-2 ${statusStyle.bg} ${statusStyle.text}`}
                                            value={order.status || 'pending'}
                                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                        <button
                                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                        >
                                            {isExpanded ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="border-t border-gray-100 bg-gray-50 p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Order Items */}
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Items</h3>
                                                <div className="space-y-3">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
                                                            <div className="flex-shrink-0">
                                                                <img 
                                                                    src={item.image || 'https://via.placeholder.com/150'} 
                                                                    alt={item.model || `Product ${item.id}`}
                                                                    className="w-16 h-16 object-cover rounded-md"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-gray-800">{item.model || `Product ${item.id}`}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    Quantity: {item.quantity} × ${item.price}
                                                                </p>
                                                                <p className="text-sm font-medium text-gray-800">
                                                                    Subtotal: ${item.quantity * item.price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shipping & Payment Info */}
                                            <div className="space-y-6">
                                                {/* Shipping Address */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Details</h3>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                                        <div className="space-y-2">
                                                            <p className="font-medium text-gray-800">{order.shippingAddress.name}</p>
                                                            <p className="text-gray-600">{order.shippingAddress.street}</p>
                                                            <p className="text-gray-600">
                                                                {order.shippingAddress.city}, {order.shippingAddress.state}
                                                            </p>
                                                            <p className="text-gray-600">{order.shippingAddress.postalCode}</p>
                                                            <p className="text-gray-600">{order.shippingAddress.country}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment Info */}
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Details</h3>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                                        <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                                                        <p className="font-medium text-gray-800 mt-2">Total Paid: ${order.total}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ManageOrders;
