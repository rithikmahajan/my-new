import React, { useState, useMemo, useCallback } from 'react';

/**
 * ReturnOrders Component - Modern Black & White Theme
 * 
 * Comprehensive return order management interface featuring:
 * - Return request listing and filtering
 * - Return reason analysis
 * - Order refund processing
 * - Customer communication
 * - Return status tracking
 * - Analytics and reporting
 */
const ReturnOrders = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample return orders data
  const returnOrders = useMemo(() => [
    {
      id: 'RET001',
      orderId: 'ORD12345',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      productName: 'Premium T-Shirt',
      productImage: '/api/placeholder/80/80',
      quantity: 2,
      orderAmount: 8998,
      refundAmount: 8998,
      returnReason: 'Size/fit issue',
      detailedReason: 'The size was too small, ordered XL but received M size.',
      requestDate: '2024-01-18',
      status: 'pending',
      priority: 'medium',
      returnMethod: 'pickup',
      trackingNumber: 'RET789123456',
      refundMethod: 'original_payment'
    },
    {
      id: 'RET002',
      orderId: 'ORD12346',
      customerName: 'Mike Chen',
      customerEmail: 'mike.c@email.com',
      productName: 'Wireless Headphones',
      productImage: '/api/placeholder/80/80',
      quantity: 1,
      orderAmount: 12999,
      refundAmount: 12999,
      returnReason: 'Damaged/defective product',
      detailedReason: 'Left earphone not working, possible manufacturing defect.',
      requestDate: '2024-01-17',
      status: 'approved',
      priority: 'high',
      returnMethod: 'courier',
      trackingNumber: 'RET789123457',
      refundMethod: 'bank_transfer'
    },
    {
      id: 'RET003',
      orderId: 'ORD12347',
      customerName: 'Emma Wilson',
      customerEmail: 'emma.w@email.com',
      productName: 'Designer Jeans',
      productImage: '/api/placeholder/80/80',
      quantity: 1,
      orderAmount: 7999,
      refundAmount: 6399, // Partial refund due to wear
      returnReason: 'Product not as expected',
      detailedReason: 'Color looks different from website photos.',
      requestDate: '2024-01-16',
      status: 'completed',
      priority: 'low',
      returnMethod: 'pickup',
      trackingNumber: 'RET789123458',
      refundMethod: 'wallet_credit'
    },
    {
      id: 'RET004',
      orderId: 'ORD12348',
      customerName: 'David Brown',
      customerEmail: 'david.b@email.com',
      productName: 'Running Shoes',
      productImage: '/api/placeholder/80/80',
      quantity: 1,
      orderAmount: 6499,
      refundAmount: 6499,
      returnReason: 'Wrong item received',
      detailedReason: 'Ordered black shoes but received white ones.',
      requestDate: '2024-01-15',
      status: 'rejected',
      priority: 'medium',
      returnMethod: 'courier',
      trackingNumber: null,
      refundMethod: 'original_payment',
      rejectionReason: 'Item shows signs of use beyond return window'
    }
  ], []);

  // Filter returns based on status and search
  const filteredReturns = useMemo(() => {
    return returnOrders.filter(returnOrder => {
      const matchesFilter = selectedFilter === 'all' || returnOrder.status === selectedFilter;
      const matchesSearch = 
        returnOrder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnOrder.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnOrder.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnOrder.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [returnOrders, selectedFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = returnOrders.length;
    const pending = returnOrders.filter(r => r.status === 'pending').length;
    const approved = returnOrders.filter(r => r.status === 'approved').length;
    const completed = returnOrders.filter(r => r.status === 'completed').length;
    const rejected = returnOrders.filter(r => r.status === 'rejected').length;
    const totalRefundAmount = returnOrders
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.refundAmount, 0);
    
    return { total, pending, approved, completed, rejected, totalRefundAmount };
  }, [returnOrders]);

  const handleStatusChange = useCallback((returnId, newStatus) => {
    console.log(`Changing return ${returnId} status to ${newStatus}`);
    // In real app, this would make an API call
  }, []);

  const handleViewDetails = useCallback((returnOrder) => {
    setSelectedReturn(returnOrder);
    setIsModalOpen(true);
  }, []);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      approved: 'bg-blue-100 text-blue-800 border border-blue-200',
      completed: 'bg-green-100 text-green-800 border border-green-200',
      rejected: 'bg-red-100 text-red-800 border border-red-200'
    };
    
    const emojis = {
      pending: '⏳',
      approved: '✅',
      completed: '🎉',
      rejected: '❌'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${styles[status]}`}>
        <span>{emojis[status]}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const colors = {
      high: 'border-l-red-500',
      medium: 'border-l-yellow-500',
      low: 'border-l-green-500'
    };
    return colors[priority] || 'border-l-zinc-600';
  }, []);

  const getReturnReasonIcon = useCallback((reason) => {
    const icons = {
      'Size/fit issue': '📏',
      'Product not as expected': '🤔',
      'Wrong item received': '📦',
      'Damaged/defective product': '💔',
      'Late delivery': '⏰',
      'Quality not as expected': '⭐'
    };
    return icons[reason] || '📋';
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All Returns', count: stats.total },
    { value: 'pending', label: 'Pending', count: stats.pending },
    { value: 'approved', label: 'Approved', count: stats.approved },
    { value: 'completed', label: 'Completed', count: stats.completed },
    { value: 'rejected', label: 'Rejected', count: stats.rejected }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                🔄 Return Orders
              </h1>
              <p className="text-zinc-300 mt-2">Manage product returns and refund requests</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                📊 Generate Report
              </button>
              <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                📧 Bulk Notify
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.total}</div>
                  <div className="text-sm text-blue-300">Total Returns</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">{stats.pending}</div>
                  <div className="text-sm text-yellow-300">Pending</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.approved}</div>
                  <div className="text-sm text-blue-300">Approved</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <div className="text-xl font-bold text-green-400">{stats.completed}</div>
                  <div className="text-sm text-green-300">Completed</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-xl font-bold text-purple-400">₹{stats.totalRefundAmount.toLocaleString()}</div>
                  <div className="text-sm text-purple-300">Total Refunded</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-zinc-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search by customer, order ID, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`whitespace-nowrap px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedFilter === option.value
                      ? 'bg-white text-black'
                      : 'bg-black/30 text-zinc-300 hover:bg-black/40 hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-xs">{option.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Returns List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Return Requests ({filteredReturns.length})
            </h2>

            <div className="space-y-4">
              {filteredReturns.map((returnOrder) => (
                <div 
                  key={returnOrder.id} 
                  className={`bg-black/30 border border-zinc-700 rounded-xl p-6 hover:bg-black/40 transition-all duration-300 border-l-4 ${getPriorityColor(returnOrder.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Product Image */}
                      <img 
                        src={returnOrder.productImage} 
                        alt={returnOrder.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-zinc-600"
                      />
                      
                      {/* Return Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              Return #{returnOrder.id}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                              <span>📦 Order: {returnOrder.orderId}</span>
                              <span>👤 {returnOrder.customerName}</span>
                              <span>📅 {new Date(returnOrder.requestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {getStatusBadge(returnOrder.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Product</div>
                            <div className="text-white font-medium">{returnOrder.productName}</div>
                            <div className="text-sm text-zinc-400">Qty: {returnOrder.quantity}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Return Reason</div>
                            <div className="text-white font-medium flex items-center gap-2">
                              <span>{getReturnReasonIcon(returnOrder.returnReason)}</span>
                              {returnOrder.returnReason}
                            </div>
                            <div className="text-sm text-zinc-400 line-clamp-2">{returnOrder.detailedReason}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Refund Amount</div>
                            <div className="text-white font-medium">₹{returnOrder.refundAmount.toLocaleString()}</div>
                            {returnOrder.refundAmount !== returnOrder.orderAmount && (
                              <div className="text-sm text-zinc-400">
                                Original: ₹{returnOrder.orderAmount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Status-specific info */}
                        {returnOrder.status === 'rejected' && returnOrder.rejectionReason && (
                          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                            <div className="text-red-300 text-sm">
                              <strong>Rejection Reason:</strong> {returnOrder.rejectionReason}
                            </div>
                          </div>
                        )}
                        
                        {returnOrder.trackingNumber && (
                          <div className="text-sm text-zinc-400 mb-4">
                            📍 Tracking: {returnOrder.trackingNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleViewDetails(returnOrder)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm"
                      >
                        👁️ View
                      </button>
                      
                      {returnOrder.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(returnOrder.id, 'approved')}
                            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(returnOrder.id, 'rejected')}
                            className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm"
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}
                      
                      {returnOrder.status === 'approved' && (
                        <button
                          onClick={() => handleStatusChange(returnOrder.id, 'completed')}
                          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm"
                        >
                          💰 Process Refund
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredReturns.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔄</div>
                  <div className="text-zinc-400 text-lg">No return requests found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Return Details Modal */}
        {isModalOpen && selectedReturn && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Return Request Details</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer & Order Info */}
                <div className="space-y-4">
                  <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <div><span className="text-zinc-400">Name:</span> <span className="text-white">{selectedReturn.customerName}</span></div>
                      <div><span className="text-zinc-400">Email:</span> <span className="text-white">{selectedReturn.customerEmail}</span></div>
                      <div><span className="text-zinc-400">Order ID:</span> <span className="text-white">{selectedReturn.orderId}</span></div>
                      <div><span className="text-zinc-400">Return ID:</span> <span className="text-white">{selectedReturn.id}</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Product Details</h4>
                    <div className="flex gap-3 mb-3">
                      <img 
                        src={selectedReturn.productImage} 
                        alt={selectedReturn.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-zinc-600"
                      />
                      <div>
                        <div className="text-white font-medium">{selectedReturn.productName}</div>
                        <div className="text-sm text-zinc-400">Quantity: {selectedReturn.quantity}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div><span className="text-zinc-400">Order Amount:</span> <span className="text-white">₹{selectedReturn.orderAmount.toLocaleString()}</span></div>
                      <div><span className="text-zinc-400">Refund Amount:</span> <span className="text-white">₹{selectedReturn.refundAmount.toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
                
                {/* Return Details */}
                <div className="space-y-4">
                  <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Return Details</h4>
                    <div className="space-y-2">
                      <div><span className="text-zinc-400">Reason:</span> <span className="text-white">{selectedReturn.returnReason}</span></div>
                      <div><span className="text-zinc-400">Request Date:</span> <span className="text-white">{new Date(selectedReturn.requestDate).toLocaleDateString()}</span></div>
                      <div><span className="text-zinc-400">Status:</span> <span className="ml-2">{getStatusBadge(selectedReturn.status)}</span></div>
                      <div><span className="text-zinc-400">Priority:</span> <span className="text-white capitalize">{selectedReturn.priority}</span></div>
                      <div><span className="text-zinc-400">Return Method:</span> <span className="text-white capitalize">{selectedReturn.returnMethod}</span></div>
                      {selectedReturn.trackingNumber && (
                        <div><span className="text-zinc-400">Tracking:</span> <span className="text-white">{selectedReturn.trackingNumber}</span></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Customer Message</h4>
                    <p className="text-zinc-300 leading-relaxed">{selectedReturn.detailedReason}</p>
                  </div>
                  
                  {selectedReturn.rejectionReason && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-red-300 mb-3">Rejection Reason</h4>
                      <p className="text-red-300">{selectedReturn.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Close
                </button>
                {selectedReturn.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedReturn.id, 'approved');
                        setIsModalOpen(false);
                      }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 font-semibold"
                    >
                      ✅ Approve Return
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedReturn.id, 'rejected');
                        setIsModalOpen(false);
                      }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 font-semibold"
                    >
                      ❌ Reject Return
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnOrders;
