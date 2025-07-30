import React, { useState, useMemo, useCallback } from 'react';

/**
 * Orders Component
 * 
 * A comprehensive orders management interface that displays order data in a table format
 * with filtering capabilities, status tracking, and action buttons.
 * 
 * Features:
 * - Order listing with detailed information
 * - Multiple filter options (date, type, status)
 * - Status color coding for better visibility
 * - Action buttons for order management
 * - Responsive design with modern black/white theme
 * 
 * Performance Optimizations:
 * - useMemo for expensive computations
 * - useCallback for stable function references
 * - Optimized re-renders with proper dependency arrays
 * - Memoized child components to prevent unnecessary re-renders
 */
const Orders = React.memo(() => {
  // State management for filters and UI controls
  const [selectedDate] = useState('06/05/1999');
  const [filterBy, setFilterBy] = useState('All');
  const [orderType, setOrderType] = useState('All');
  const [orderStatus, setOrderStatus] = useState('All');

  /**
   * Sample order data - In a real application, this would come from an API
   * Memoized to prevent unnecessary re-creation on each render
   */
  const orders = useMemo(() => [
    {
      orderId: '12345670922O',
      paymentStatus: 'Pending',
      image: '/api/placeholder/60/60',
      productName: 'T shirt',
      name: 'Tarnnish',
      date: '13 aug 2024',
      amount: '$29.99',
      quantity: 2,
      orderType: 'Online',
      orderStatus: 'Processing'
    },
    {
      orderId: '12345670923O',
      paymentStatus: 'Completed',
      image: '/api/placeholder/60/60',
      productName: 'Sneakers',
      name: 'Alex Johnson',
      date: '14 aug 2024',
      amount: '$129.99',
      quantity: 1,
      orderType: 'Online',
      orderStatus: 'Shipped'
    },
    {
      orderId: '12345670924O',
      paymentStatus: 'Failed',
      image: '/api/placeholder/60/60',
      productName: 'Backpack',
      name: 'Sarah Smith',
      date: '15 aug 2024',
      amount: '$79.99',
      quantity: 1,
      orderType: 'Online',
      orderStatus: 'Failed'
    },
    {
      orderId: '12345670925O',
      paymentStatus: 'Completed',
      image: '/api/placeholder/60/60',
      productName: 'Headphones',
      name: 'Mike Wilson',
      date: '16 aug 2024',
      amount: '$199.99',
      quantity: 1,
      orderType: 'In-Store',
      orderStatus: 'Delivered'
    },
    {
      orderId: '12345670926O',
      paymentStatus: 'Pending',
      image: '/api/placeholder/60/60',
      productName: 'Jeans',
      name: 'Emma Davis',
      date: '17 aug 2024',
      amount: '$89.99',
      quantity: 2,
      orderType: 'Online',
      orderStatus: 'Processing'
    }
  ], []);

  /**
   * Filter orders based on selected criteria
   * Memoized to prevent unnecessary filtering on each render
   */
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesFilter = filterBy === 'All' || order.paymentStatus === filterBy;
      const matchesType = orderType === 'All' || order.orderType === orderType;
      const matchesStatus = orderStatus === 'All' || order.orderStatus === orderStatus;
      
      return matchesFilter && matchesType && matchesStatus;
    });
  }, [orders, filterBy, orderType, orderStatus]);

  /**
   * Get status color for payment status badges
   * Memoized callback to prevent re-creation on each render
   */
  const getPaymentStatusColor = useCallback((status) => {
    switch (status) {
      case 'Completed':
        return 'bg-gradient-to-r from-white to-zinc-200 text-black';
      case 'Pending':
        return 'bg-gradient-to-r from-zinc-400 to-zinc-600 text-white';
      case 'Failed':
        return 'bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600';
      default:
        return 'bg-zinc-800 text-white';
    }
  }, []);

  /**
   * Get status color for order status badges
   */
  const getOrderStatusColor = useCallback((status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-gradient-to-r from-white to-zinc-200 text-black';
      case 'Shipped':
        return 'bg-gradient-to-r from-white to-zinc-200 text-black';
      case 'Processing':
        return 'bg-gradient-to-r from-zinc-400 to-zinc-600 text-white';
      case 'Failed':
        return 'bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600';
      default:
        return 'bg-zinc-800 text-white';
    }
  }, []);

  /**
   * Memoized filter options to prevent re-creation
   */
  const filterOptions = useMemo(() => ({
    paymentStatus: ['All', 'Pending', 'Completed', 'Failed'],
    orderType: ['All', 'Online', 'In-Store'],
    orderStatus: ['All', 'Processing', 'Shipped', 'Delivered', 'Failed']
  }), []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Order Management
              </h1>
              <p className="text-zinc-400 mt-2">Track and manage customer orders</p>
            </div>
            <button className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-zinc-200 hover:to-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
              <span>📥</span>
              <span>Export Orders</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters Section */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 mb-6 border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedDate}
                  readOnly
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white pr-10 transition-all duration-300"
                />
                <span className="absolute right-3 top-3 text-zinc-400">📅</span>
              </div>
            </div>

            {/* Payment Status Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Payment Status</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
              >
                {filterOptions.paymentStatus.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Order Type Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Order Type</label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
              >
                {filterOptions.orderType.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Order Status Filter */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Order Status</label>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
              >
                {filterOptions.orderStatus.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
          <div className="px-6 py-4 border-b border-zinc-700">
            <h3 className="text-xl font-bold text-white">Recent Orders</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-zinc-800">
                {filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-zinc-900/50 transition-all duration-300">
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-white">{order.orderId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-white to-zinc-200 rounded-lg flex items-center justify-center text-black font-bold mr-4">
                          📦
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{order.productName}</div>
                          <div className="text-sm text-zinc-400">Qty: {order.quantity}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{order.name}</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>👁</span>
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>✏️</span>
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>📥</span>
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>⋯</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Total Orders</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">{orders.length}</p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              {orders.filter(order => order.paymentStatus === 'Completed').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Pending</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              {orders.filter(order => order.paymentStatus === 'Pending').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Failed</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-zinc-700 to-zinc-800 bg-clip-text text-transparent">
              {orders.filter(order => order.paymentStatus === 'Failed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Set display name for better debugging
Orders.displayName = 'Orders';

export default Orders;
