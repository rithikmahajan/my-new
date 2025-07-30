import React, { useState, useMemo, useCallback } from 'react';

/**
 * InviteAFriend Component - Modern Black & White Theme
 * 
 * Comprehensive referral program management interface featuring:
 * - Referral code generation and management
 * - Invite system control and settings
 * - Referral analytics and tracking
 * - Custom reward configuration
 * - Bulk code operations
 * - Performance metrics and insights
 * - Social sharing integration
 */
const InviteAFriend = () => {
  const [isInviteSystemOn, setIsInviteSystemOn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  
  const [formData, setFormData] = useState({
    userName: '',
    codeToIssue: '',
    codeLimit: '',
    codeValue: '',
    rewardType: 'percentage',
    expiryDate: '',
    description: '',
    minOrderValue: ''
  });

  const [issuedCodes, setIssuedCodes] = useState([
    {
      id: 1,
      userName: 'Rithik Kumar',
      userEmail: 'rithik.kumar@email.com',
      code: 'RITHIK27',
      description: 'Invite a friend and get additional 10% off on your 1st purchase',
      limit: 100,
      used: 23,
      value: '10%',
      rewardType: 'percentage',
      createdDate: '2024-01-15',
      expiryDate: '2024-03-15',
      isActive: true,
      totalInvites: 45,
      successfulInvites: 23,
      totalRewards: 15600,
      minOrderValue: 500
    },
    {
      id: 2,
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@email.com',
      code: 'SARAH50',
      description: 'Special friend invitation with flat ₹200 discount',
      limit: 50,
      used: 12,
      value: '₹200',
      rewardType: 'fixed',
      createdDate: '2024-01-12',
      expiryDate: '2024-02-12',
      isActive: true,
      totalInvites: 28,
      successfulInvites: 12,
      totalRewards: 8400,
      minOrderValue: 1000
    },
    {
      id: 3,
      userName: 'Mike Chen',
      userEmail: 'mike.chen@email.com',
      code: 'MIKE2024',
      description: 'Premium membership referral - 15% off',
      limit: 25,
      used: 25,
      value: '15%',
      rewardType: 'percentage',
      createdDate: '2024-01-08',
      expiryDate: '2024-01-20',
      isActive: false,
      totalInvites: 35,
      successfulInvites: 25,
      totalRewards: 12750,
      minOrderValue: 750
    },
    {
      id: 4,
      userName: 'Emma Thompson',
      userEmail: 'emma.t@email.com',
      code: 'EMMA100',
      description: 'Exclusive invite code with bonus rewards',
      limit: 75,
      used: 8,
      value: '12%',
      rewardType: 'percentage',
      createdDate: '2024-01-18',
      expiryDate: '2024-04-18',
      isActive: true,
      totalInvites: 15,
      successfulInvites: 8,
      totalRewards: 4200,
      minOrderValue: 600
    }
  ]);

  // Filter codes based on search and status
  const filteredCodes = useMemo(() => {
    return issuedCodes.filter(code => {
      const matchesSearch = 
        code.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        selectedStatus === 'all' ||
        (selectedStatus === 'active' && code.isActive) ||
        (selectedStatus === 'inactive' && !code.isActive) ||
        (selectedStatus === 'expired' && new Date(code.expiryDate) < new Date()) ||
        (selectedStatus === 'exhausted' && code.used >= code.limit);
      
      return matchesSearch && matchesStatus;
    });
  }, [issuedCodes, searchTerm, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = issuedCodes.length;
    const active = issuedCodes.filter(c => c.isActive).length;
    const totalInvites = issuedCodes.reduce((sum, c) => sum + c.totalInvites, 0);
    const successfulInvites = issuedCodes.reduce((sum, c) => sum + c.successfulInvites, 0);
    const totalRewards = issuedCodes.reduce((sum, c) => sum + c.totalRewards, 0);
    const conversionRate = totalInvites > 0 ? ((successfulInvites / totalInvites) * 100).toFixed(1) : 0;
    
    return { total, active, totalInvites, successfulInvites, totalRewards, conversionRate };
  }, [issuedCodes]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleIssueCode = useCallback(() => {
    if (!formData.userName.trim() || !formData.codeToIssue.trim() || !formData.codeLimit || !formData.codeValue) {
      return;
    }
    
    const newCode = {
      id: Date.now(),
      userName: formData.userName.trim(),
      userEmail: `${formData.userName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      code: formData.codeToIssue.trim().toUpperCase(),
      description: formData.description.trim() || `Referral code for ${formData.userName}`,
      limit: parseInt(formData.codeLimit),
      used: 0,
      value: formData.rewardType === 'percentage' ? `${formData.codeValue}%` : `₹${formData.codeValue}`,
      rewardType: formData.rewardType,
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: formData.expiryDate,
      isActive: true,
      totalInvites: 0,
      successfulInvites: 0,
      totalRewards: 0,
      minOrderValue: parseInt(formData.minOrderValue) || 0
    };
    
    setIssuedCodes(prev => [newCode, ...prev]);
    setFormData({
      userName: '',
      codeToIssue: '',
      codeLimit: '',
      codeValue: '',
      rewardType: 'percentage',
      expiryDate: '',
      description: '',
      minOrderValue: ''
    });
    setShowCreateModal(false);
  }, [formData]);

  const handleDeleteCode = useCallback((codeId) => {
    setIssuedCodes(prev => prev.filter(code => code.id !== codeId));
  }, []);

  const handleToggleStatus = useCallback((codeId) => {
    setIssuedCodes(prev => 
      prev.map(code => 
        code.id === codeId 
          ? { ...code, isActive: !code.isActive }
          : code
      )
    );
  }, []);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you might show a toast notification here
  }, []);

  const getStatusBadge = useCallback((code) => {
    if (!code.isActive) {
      return <span className="bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-full text-xs font-medium">🚫 Inactive</span>;
    }
    
    if (new Date(code.expiryDate) < new Date()) {
      return <span className="bg-orange-100 text-orange-800 border border-orange-200 px-2 py-1 rounded-full text-xs font-medium">⏰ Expired</span>;
    }
    
    if (code.used >= code.limit) {
      return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 rounded-full text-xs font-medium">🎯 Exhausted</span>;
    }
    
    return <span className="bg-green-100 text-green-800 border border-green-200 px-2 py-1 rounded-full text-xs font-medium">✅ Active</span>;
  }, []);

  const getUsagePercentage = useCallback((used, limit) => {
    return Math.min((used / limit) * 100, 100);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'All Codes', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'inactive', label: 'Inactive', count: issuedCodes.filter(c => !c.isActive).length },
    { value: 'expired', label: 'Expired', count: issuedCodes.filter(c => new Date(c.expiryDate) < new Date()).length },
    { value: 'exhausted', label: 'Exhausted', count: issuedCodes.filter(c => c.used >= c.limit).length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                🎁 Invite A Friend
              </h1>
              <p className="text-zinc-300 mt-2">Manage referral codes and invitation system</p>
            </div>
            
            <div className="flex gap-3">
              {/* System Toggle */}
              <div className="flex items-center gap-3 bg-black/30 border border-zinc-600 rounded-xl px-4 py-2">
                <span className="text-sm text-zinc-300">Invite System</span>
                <button
                  onClick={() => setIsInviteSystemOn(!isInviteSystemOn)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isInviteSystemOn ? 'bg-green-600' : 'bg-zinc-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isInviteSystemOn ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${isInviteSystemOn ? 'text-green-400' : 'text-red-400'}`}>
                  {isInviteSystemOn ? 'ON' : 'OFF'}
                </span>
              </div>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm"
              >
                ➕ Issue Code
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                📊 Analytics
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
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
                <span className="text-2xl">📤</span>
                <div>
                  <div className="text-xl font-bold text-purple-400">{stats.totalInvites}</div>
                  <div className="text-sm text-purple-300">Total Invites</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">{stats.successfulInvites}</div>
                  <div className="text-sm text-yellow-300">Successful</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="text-xl font-bold text-orange-400">₹{stats.totalRewards.toLocaleString()}</div>
                  <div className="text-sm text-orange-300">Total Rewards</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-600/20 to-pink-500/20 border border-pink-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-xl font-bold text-pink-400">{stats.conversionRate}%</div>
                  <div className="text-sm text-pink-300">Conversion</div>
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
                placeholder="Search by user name, code, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`whitespace-nowrap px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedStatus === option.value
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

        {/* Codes List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Referral Codes ({filteredCodes.length})
            </h2>

            <div className="space-y-4">
              {filteredCodes.map((code) => (
                <div 
                  key={code.id} 
                  className="bg-black/30 border border-zinc-700 rounded-xl p-6 hover:bg-black/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{code.userName}</h3>
                        {getStatusBadge(code)}
                        <button
                          onClick={() => copyToClipboard(code.code)}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-500/30 text-sm font-mono"
                        >
                          📋 {code.code}
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">User Details</div>
                          <div className="text-white">
                            <div>📧 {code.userEmail}</div>
                            <div>📅 Created: {new Date(code.createdDate).toLocaleDateString()}</div>
                            <div>⏰ Expires: {new Date(code.expiryDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">Usage Statistics</div>
                          <div className="text-white">
                            <div>🎯 Used: {code.used}/{code.limit}</div>
                            <div>📤 Invites Sent: {code.totalInvites}</div>
                            <div>✅ Successful: {code.successfulInvites}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-zinc-400 mb-1">Reward Details</div>
                          <div className="text-white">
                            <div>💰 Value: {code.value}</div>
                            <div>💸 Total Rewards: ₹{code.totalRewards.toLocaleString()}</div>
                            <div>🛒 Min Order: ₹{code.minOrderValue}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Usage Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-zinc-400 mb-1">
                          <span>Usage Progress</span>
                          <span>{getUsagePercentage(code.used, code.limit).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getUsagePercentage(code.used, code.limit)}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-sm text-zinc-400">
                        📝 {code.description}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(code.id)}
                        className={`px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold ${
                          code.isActive
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400'
                            : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400'
                        }`}
                      >
                        {code.isActive ? '🚫 Disable' : '✅ Enable'}
                      </button>
                      
                      <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold">
                        ✏️ Edit
                      </button>
                      
                      <button
                        onClick={() => handleDeleteCode(code.id)}
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-2 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCodes.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎁</div>
                  <div className="text-zinc-400 text-lg">No referral codes found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your search or create a new code</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Code Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Issue New Referral Code</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter user name..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Referral Code</label>
                  <input
                    type="text"
                    name="codeToIssue"
                    value={formData.codeToIssue}
                    onChange={handleInputChange}
                    placeholder="Enter code..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Usage Limit</label>
                  <input
                    type="number"
                    name="codeLimit"
                    value={formData.codeLimit}
                    onChange={handleInputChange}
                    placeholder="Enter limit..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Reward Type</label>
                  <select
                    name="rewardType"
                    value={formData.rewardType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Reward Value</label>
                  <input
                    type="number"
                    name="codeValue"
                    value={formData.codeValue}
                    onChange={handleInputChange}
                    placeholder={formData.rewardType === 'percentage' ? 'Enter percentage...' : 'Enter amount...'}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Min Order Value (₹)</label>
                  <input
                    type="number"
                    name="minOrderValue"
                    value={formData.minOrderValue}
                    onChange={handleInputChange}
                    placeholder="Enter minimum order value..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter code description..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIssueCode}
                  disabled={!formData.userName.trim() || !formData.codeToIssue.trim() || !formData.codeLimit || !formData.codeValue}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🎁 Issue Code
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteAFriend;
