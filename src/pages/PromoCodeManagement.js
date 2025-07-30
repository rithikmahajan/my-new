import React, { useState, useMemo, useCallback } from 'react';

/**
 * PromoCodeManagement Component - Modern Black & White Theme
 * 
 * Comprehensive promo code management interface featuring:
 * - Create new promo codes with customizable parameters
 * - Toggle code status (Active/Inactive)
 * - Set discount values and types
 * - Configure date ranges and usage limits
 * - Category, subcategory, and item-specific targeting
 * - View and manage existing promo codes
 * - Edit and delete functionality
 * - Analytics and performance tracking
 */
const PromoCodeManagement = () => {
  // State for form inputs
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderValue: '',
    maxUses: '',
    startDate: '',
    endDate: '',
    applicableOn: 'all',
    category: '',
    subcategory: '',
    description: '',
    status: 'active'
  });

  // Mock data for existing promo codes
  const [promoCodes, setPromoCodes] = useState([
    {
      id: 1,
      code: 'WELCOME30',
      description: 'New customer welcome discount',
      discountType: 'percentage',
      discountValue: 30,
      minOrderValue: 1000,
      maxUses: 100,
      usedCount: 45,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      applicableOn: 'all',
      status: 'active',
      totalSavings: 125000,
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      code: 'SAVE500',
      description: 'Flat discount on electronics',
      discountType: 'fixed',
      discountValue: 500,
      minOrderValue: 5000,
      maxUses: 50,
      usedCount: 32,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      applicableOn: 'category',
      category: 'Electronics',
      status: 'active',
      totalSavings: 16000,
      createdDate: '2024-01-15'
    },
    {
      id: 3,
      code: 'FASHION20',
      description: '20% off on fashion items',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 2000,
      maxUses: 200,
      usedCount: 180,
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      applicableOn: 'category',
      category: 'Fashion',
      status: 'expired',
      totalSavings: 89000,
      createdDate: '2023-12-01'
    },
    {
      id: 4,
      code: 'SUMMER50',
      description: 'Summer sale special',
      discountType: 'percentage',
      discountValue: 50,
      minOrderValue: 3000,
      maxUses: 75,
      usedCount: 12,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      applicableOn: 'all',
      status: 'inactive',
      totalSavings: 24000,
      createdDate: '2024-02-01'
    }
  ]);

  // Statistics
  const stats = useMemo(() => {
    const active = promoCodes.filter(code => code.status === 'active').length;
    const total = promoCodes.length;
    const totalUsed = promoCodes.reduce((sum, code) => sum + code.usedCount, 0);
    const totalSavings = promoCodes.reduce((sum, code) => sum + code.totalSavings, 0);
    
    return { active, total, totalUsed, totalSavings };
  }, [promoCodes]);

  // Event handlers
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleCreateCode = useCallback(() => {
    if (!formData.code || !formData.discountValue || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newCode = {
      id: Date.now(),
      ...formData,
      discountValue: parseFloat(formData.discountValue),
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      maxUses: parseInt(formData.maxUses) || 0,
      usedCount: 0,
      totalSavings: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setPromoCodes(prev => [newCode, ...prev]);
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderValue: '',
      maxUses: '',
      startDate: '',
      endDate: '',
      applicableOn: 'all',
      category: '',
      subcategory: '',
      description: '',
      status: 'active'
    });
    setIsCreateModalOpen(false);
  }, [formData]);

  const handleToggleStatus = useCallback((id) => {
    setPromoCodes(prev => prev.map(code => 
      code.id === id 
        ? { ...code, status: code.status === 'active' ? 'inactive' : 'active' }
        : code
    ));
  }, []);

  const handleDeleteCode = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this promo code?')) {
      setPromoCodes(prev => prev.filter(code => code.id !== id));
    }
  }, []);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      inactive: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      expired: 'bg-red-100 text-red-800 border border-red-200'
    };
    
    const emojis = {
      active: '✅',
      inactive: '⏸️',
      expired: '❌'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${styles[status]}`}>
        <span>{emojis[status]}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getUsagePercentage = useCallback((used, max) => {
    if (max === 0) return 0;
    return Math.min((used / max) * 100, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                🎫 Promo Code Management
              </h1>
              <p className="text-zinc-300 mt-2">Create and manage promotional codes and discounts</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              ➕ Create New Code
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎫</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.total}</div>
                  <div className="text-sm text-blue-300">Total Codes</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="text-xl font-bold text-green-400">{stats.active}</div>
                  <div className="text-sm text-green-300">Active Codes</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="text-xl font-bold text-purple-400">{stats.totalUsed.toLocaleString()}</div>
                  <div className="text-sm text-purple-300">Total Uses</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">₹{stats.totalSavings.toLocaleString()}</div>
                  <div className="text-sm text-yellow-300">Total Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Codes List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Active Promo Codes</h2>

            <div className="space-y-4">
              {promoCodes.map((code) => (
                <div key={code.id} className="bg-black/30 border border-zinc-700 rounded-xl p-6 hover:bg-black/40 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-gradient-to-r from-white/20 to-zinc-200/20 border border-white/30 rounded-lg px-4 py-2">
                          <code className="text-xl font-bold text-white">{code.code}</code>
                        </div>
                        {getStatusBadge(code.status)}
                        <div className="text-sm text-zinc-400">
                          Created: {new Date(code.createdDate).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="text-zinc-300 mb-4">{code.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-black/50 border border-zinc-600 rounded-lg p-3">
                          <div className="text-sm text-zinc-400 mb-1">Discount</div>
                          <div className="text-white font-semibold">
                            {code.discountType === 'percentage' 
                              ? `${code.discountValue}%` 
                              : `₹${code.discountValue}`
                            }
                          </div>
                        </div>

                        <div className="bg-black/50 border border-zinc-600 rounded-lg p-3">
                          <div className="text-sm text-zinc-400 mb-1">Min Order</div>
                          <div className="text-white font-semibold">₹{code.minOrderValue.toLocaleString()}</div>
                        </div>

                        <div className="bg-black/50 border border-zinc-600 rounded-lg p-3">
                          <div className="text-sm text-zinc-400 mb-1">Usage</div>
                          <div className="text-white font-semibold">
                            {code.usedCount}/{code.maxUses || '∞'}
                          </div>
                          {code.maxUses > 0 && (
                            <div className="w-full bg-zinc-700 rounded-full h-2 mt-1">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getUsagePercentage(code.usedCount, code.maxUses)}%` }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="bg-black/50 border border-zinc-600 rounded-lg p-3">
                          <div className="text-sm text-zinc-400 mb-1">Savings</div>
                          <div className="text-white font-semibold">₹{code.totalSavings.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>📅 {new Date(code.startDate).toLocaleDateString()} - {new Date(code.endDate).toLocaleDateString()}</span>
                        {code.applicableOn !== 'all' && (
                          <span>🏷️ {code.category || code.subcategory}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(code.id)}
                        className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          code.status === 'active'
                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400'
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400'
                        } text-white`}
                        title={code.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {code.status === 'active' ? '⏸️' : '▶️'}
                      </button>
                      
                      <button
                        className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      
                      <button
                        onClick={() => handleDeleteCode(code.id)}
                        className="p-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {promoCodes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎫</div>
                  <div className="text-zinc-400 text-lg">No promo codes found</div>
                  <div className="text-zinc-500 text-sm mt-2">Create your first promo code to get started</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Code Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Create New Promo Code</h3>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Promo Code *
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                      placeholder="e.g., WELCOME30"
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of this promo code"
                    className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    rows={3}
                  />
                </div>

                {/* Discount Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Discount Type *
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => handleInputChange('discountType', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Discount Value *
                    </label>
                    <input
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) => handleInputChange('discountValue', e.target.value)}
                      placeholder={formData.discountType === 'percentage' ? '30' : '500'}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>

                {/* Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Minimum Order Value (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.minOrderValue}
                      onChange={(e) => handleInputChange('minOrderValue', e.target.value)}
                      placeholder="1000"
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Maximum Uses
                    </label>
                    <input
                      type="number"
                      value={formData.maxUses}
                      onChange={(e) => handleInputChange('maxUses', e.target.value)}
                      placeholder="100 (leave empty for unlimited)"
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>

                {/* Applicability */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Applicable On
                  </label>
                  <select
                    value={formData.applicableOn}
                    onChange={(e) => handleInputChange('applicableOn', e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="all">All Products</option>
                    <option value="category">Specific Category</option>
                    <option value="subcategory">Specific Subcategory</option>
                  </select>
                </div>

                {formData.applicableOn === 'category' && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCode}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold"
                >
                  Create Promo Code
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodeManagement;
