import React, { useState, useMemo, useCallback } from 'react';

/**
 * BlockUser Component - Modern Black & White Theme
 * 
 * Comprehensive user blocking and management interface featuring:
 * - User blocking/unblocking functionality
 * - Violation reporting and tracking
 * - Communication management
 * - User activity monitoring
 * - Bulk operations
 * - Automated moderation rules
 */
const BlockUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [blockReason, setBlockReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [blockDuration, setBlockDuration] = useState('permanent');

  // Modal states
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Cora Cayetto',
      email: 'cora.cayetto@email.com',
      channel: 'WhatsApp',
      userId: '20231042366',
      phoneNumber: '+629797624012',
      address: '5567 Richmond View Suite 961 Burnaby, 93546-8616',
      isBlocked: false,
      joinDate: '2024-01-15',
      lastActive: '2024-01-18 14:30',
      orderCount: 15,
      totalSpent: 45600,
      violations: 0,
      reportCount: 0,
      accountStatus: 'active',
      verificationStatus: 'verified',
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Marcus Thompson',
      email: 'marcus.t@email.com',
      channel: 'Email',
      userId: '20231042367',
      phoneNumber: '+1234567890',
      address: '123 Main Street, Downtown, 12345',
      isBlocked: true,
      joinDate: '2024-01-10',
      lastActive: '2024-01-16 09:15',
      orderCount: 3,
      totalSpent: 8900,
      violations: 3,
      reportCount: 5,
      accountStatus: 'blocked',
      verificationStatus: 'pending',
      riskLevel: 'high',
      blockReason: 'Multiple policy violations',
      blockedDate: '2024-01-16',
      blockedBy: 'Admin'
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      channel: 'Phone',
      userId: '20231042368',
      phoneNumber: '+1987654321',
      address: '456 Oak Avenue, Suburb, 67890',
      isBlocked: false,
      joinDate: '2024-01-12',
      lastActive: '2024-01-18 16:45',
      orderCount: 28,
      totalSpent: 127800,
      violations: 1,
      reportCount: 0,
      accountStatus: 'active',
      verificationStatus: 'verified',
      riskLevel: 'medium'
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.chen@email.com',
      channel: 'WhatsApp',
      userId: '20231042369',
      phoneNumber: '+86123456789',
      address: '789 Pine Road, Metro, 13579',
      isBlocked: false,
      joinDate: '2024-01-08',
      lastActive: '2024-01-18 11:20',
      orderCount: 42,
      totalSpent: 89500,
      violations: 0,
      reportCount: 0,
      accountStatus: 'active',
      verificationStatus: 'verified',
      riskLevel: 'low'
    }
  ]);

  // Block reasons
  const blockReasons = [
    'Spam or inappropriate content',
    'Fraudulent activity',
    'Multiple policy violations',
    'Abusive behavior',
    'Suspected fake account',
    'Payment issues',
    'Terms of service violation',
    'Security concerns',
    'Custom reason'
  ];

  // Filter users based on status and search
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesFilter = 
        selectedFilter === 'all' ||
        (selectedFilter === 'blocked' && user.isBlocked) ||
        (selectedFilter === 'active' && !user.isBlocked) ||
        (selectedFilter === 'high_risk' && user.riskLevel === 'high') ||
        (selectedFilter === 'violations' && user.violations > 0);
      
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.includes(searchTerm) ||
        user.phoneNumber.includes(searchTerm);
      
      return matchesFilter && matchesSearch;
    });
  }, [users, selectedFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = users.length;
    const blocked = users.filter(u => u.isBlocked).length;
    const active = users.filter(u => !u.isBlocked).length;
    const highRisk = users.filter(u => u.riskLevel === 'high').length;
    const withViolations = users.filter(u => u.violations > 0).length;
    
    return { total, blocked, active, highRisk, withViolations };
  }, [users]);

  const handleBlockUser = useCallback((user) => {
    setSelectedUser(user);
    if (user.isBlocked) {
      setShowUnblockModal(true);
    } else {
      setShowBlockModal(true);
    }
  }, []);

  const confirmBlockUser = useCallback(() => {
    if (!selectedUser) return;
    
    setUsers(prev => 
      prev.map(user => 
        user.id === selectedUser.id 
          ? { 
              ...user, 
              isBlocked: true,
              accountStatus: 'blocked',
              blockReason: blockReason === 'Custom reason' ? customReason : blockReason,
              blockedDate: new Date().toISOString().split('T')[0],
              blockedBy: 'Admin'
            }
          : user
      )
    );
    
    setShowBlockModal(false);
    setSelectedUser(null);
    setBlockReason('');
    setCustomReason('');
  }, [selectedUser, blockReason, customReason]);

  const confirmUnblockUser = useCallback(() => {
    if (!selectedUser) return;
    
    setUsers(prev => 
      prev.map(user => 
        user.id === selectedUser.id 
          ? { 
              ...user, 
              isBlocked: false,
              accountStatus: 'active',
              blockReason: undefined,
              blockedDate: undefined,
              blockedBy: undefined
            }
          : user
      )
    );
    
    setShowUnblockModal(false);
    setSelectedUser(null);
  }, [selectedUser]);

  const handleBulkAction = useCallback((action) => {
    if (selectedUsers.length === 0) return;
    
    if (action === 'block') {
      setShowBulkModal(true);
    } else if (action === 'unblock') {
      setUsers(prev => 
        prev.map(user => 
          selectedUsers.includes(user.id)
            ? { ...user, isBlocked: false, accountStatus: 'active' }
            : user
        )
      );
      setSelectedUsers([]);
    }
  }, [selectedUsers]);

  const getRiskBadge = useCallback((risk) => {
    const styles = {
      low: 'bg-green-100 text-green-800 border border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      high: 'bg-red-100 text-red-800 border border-red-200'
    };
    
    const emojis = {
      low: '🟢',
      medium: '🟡',
      high: '🔴'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${styles[risk]}`}>
        <span>{emojis[risk]}</span>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </span>
    );
  }, []);

  const getStatusBadge = useCallback((isBlocked) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
        isBlocked 
          ? 'bg-red-100 text-red-800 border border-red-200'
          : 'bg-green-100 text-green-800 border border-green-200'
      }`}>
        <span>{isBlocked ? '🚫' : '✅'}</span>
        {isBlocked ? 'Blocked' : 'Active'}
      </span>
    );
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All Users', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'blocked', label: 'Blocked', count: stats.blocked },
    { value: 'high_risk', label: 'High Risk', count: stats.highRisk },
    { value: 'violations', label: 'With Violations', count: stats.withViolations }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                🚫 User Management
              </h1>
              <p className="text-zinc-300 mt-2">Block and manage user accounts and violations</p>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                📊 Moderation Report
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                ⚙️ Auto Rules
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.total}</div>
                  <div className="text-sm text-blue-300">Total Users</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="text-xl font-bold text-green-400">{stats.active}</div>
                  <div className="text-sm text-green-300">Active</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚫</span>
                <div>
                  <div className="text-xl font-bold text-red-400">{stats.blocked}</div>
                  <div className="text-sm text-red-300">Blocked</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <div className="text-xl font-bold text-orange-400">{stats.highRisk}</div>
                  <div className="text-sm text-orange-300">High Risk</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">{stats.withViolations}</div>
                  <div className="text-sm text-yellow-300">Violations</div>
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
                placeholder="Search by name, email, phone, or user ID..."
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

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center gap-4 p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl">
              <span className="text-blue-300">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('block')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors text-sm"
                >
                  🚫 Block Selected
                </button>
                <button
                  onClick={() => handleBulkAction('unblock')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors text-sm"
                >
                  ✅ Unblock Selected
                </button>
                <button
                  onClick={() => setSelectedUsers([])}
                  className="bg-zinc-600 text-white px-4 py-2 rounded-lg hover:bg-zinc-500 transition-colors text-sm"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Users ({filteredUsers.length})
            </h2>

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className={`bg-black/30 border border-zinc-700 rounded-xl p-6 hover:bg-black/40 transition-all duration-300 ${
                    user.isBlocked ? 'border-red-500/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(prev => [...prev, user.id]);
                          } else {
                            setSelectedUsers(prev => prev.filter(id => id !== user.id));
                          }
                        }}
                        className="mt-2 w-4 h-4 accent-blue-500"
                      />
                      
                      {/* User Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {user.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                              <span>📧 {user.email}</span>
                              <span>📱 {user.phoneNumber}</span>
                              <span>🆔 {user.userId}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(user.isBlocked)}
                            {getRiskBadge(user.riskLevel)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Account Info</div>
                            <div className="text-white">
                              <div>📅 Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
                              <div>🕒 Last Active: {user.lastActive}</div>
                              <div>📍 Channel: {user.channel}</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Activity</div>
                            <div className="text-white">
                              <div>🛍️ Orders: {user.orderCount}</div>
                              <div>💰 Spent: ₹{user.totalSpent.toLocaleString()}</div>
                              <div>✅ Status: {user.verificationStatus}</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-zinc-400 mb-1">Moderation</div>
                            <div className="text-white">
                              <div>⚠️ Violations: {user.violations}</div>
                              <div>📢 Reports: {user.reportCount}</div>
                              <div>🔍 Risk: {user.riskLevel}</div>
                            </div>
                          </div>
                        </div>
                        
                        {user.isBlocked && user.blockReason && (
                          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                            <div className="text-red-300 text-sm">
                              <div><strong>Blocked:</strong> {user.blockedDate} by {user.blockedBy}</div>
                              <div><strong>Reason:</strong> {user.blockReason}</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="text-sm text-zinc-400">
                          📍 {user.address}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleBlockUser(user)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold ${
                          user.isBlocked
                            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400'
                            : 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400'
                        }`}
                      >
                        {user.isBlocked ? '✅ Unblock' : '🚫 Block'}
                      </button>
                      
                      <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold">
                        👁️ View Details
                      </button>
                      
                      <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold">
                        📧 Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <div className="text-zinc-400 text-lg">No users found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Block User Modal */}
        {showBlockModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🚫</div>
                <h3 className="text-2xl font-bold text-white mb-2">Block User</h3>
                <p className="text-zinc-400">Are you sure you want to block {selectedUser.name}?</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Block Reason</label>
                  <select
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Select a reason</option>
                    {blockReasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                
                {blockReason === 'Custom reason' && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Custom Reason</label>
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Enter custom block reason..."
                      className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                      rows={3}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Block Duration</label>
                  <select
                    value={blockDuration}
                    onChange={(e) => setBlockDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="permanent">Permanent</option>
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                    <option value="30d">30 Days</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBlockModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBlockUser}
                  disabled={!blockReason}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🚫 Block User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Unblock User Modal */}
        {showUnblockModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-white mb-2">Unblock User</h3>
                <p className="text-zinc-400">Are you sure you want to unblock {selectedUser.name}?</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUnblockModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUnblockUser}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 font-semibold"
                >
                  ✅ Unblock User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockUser;
