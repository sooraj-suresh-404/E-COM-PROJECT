import React from 'react';

const Report = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Report</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Total Sales: $10,000</p>
            <p className="text-gray-600">Monthly Sales: $3,500</p>
            <p className="text-gray-600">Weekly Sales: $800</p>
          </div>
        </div>

        {/* Product Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Report</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Total Products: 150</p>
            <p className="text-gray-600">Low Stock Items: 12</p>
            <p className="text-gray-600">Out of Stock: 5</p>
          </div>
        </div>

        {/* User Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Report</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Total Users: 500</p>
            <p className="text-gray-600">New Users (This Month): 45</p>
            <p className="text-gray-600">Active Users: 320</p>
          </div>
        </div>

        {/* Order Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Report</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Total Orders: 750</p>
            <p className="text-gray-600">Pending Orders: 25</p>
            <p className="text-gray-600">Completed Orders: 725</p>
          </div>
        </div>

        {/* Revenue Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Revenue Report</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Total Revenue: $50,000</p>
            <p className="text-gray-600">Monthly Revenue: $15,000</p>
            <p className="text-gray-600">Average Order Value: $67</p>
          </div>
        </div>

        {/* Customer Report Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Customer Report</h3>
          <div className="space-y-2">
            <p className="text-gray-600">Total Customers: 450</p>
            <p className="text-gray-600">Returning Customers: 200</p>
            <p className="text-gray-600">New Customers: 250</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report; 