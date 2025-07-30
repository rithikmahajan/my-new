import React, { useState, useCallback, useMemo } from 'react';

/**
 * PointsManagement Component - Modern Black & White Theme
 * 
 * Comprehensive points management interface featuring:
 * - Advanced points system configuration
 * - User points allocation and tracking
 * - Points redemption management
 * - Rewards catalog integration
 * - Bulk points operations
 * - Points history and analytics
 * - Automated rules and triggers
 * - User engagement metrics
 */
const PointsManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isIssuePointsModalOpen, setIsIssuePointsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const [viewMode, setViewMode] = useState('grid');
  const [pointSystemEnabled, setPointSystemEnabled] = useState(true);

  // Memoized users data with comprehensive points information
  const users = useMemo(() => [
    {
      id: 1,
      name: 'John Smith',
      userId: 'USR-001',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      avatar: '/api/placeholder/50/50',
      status: 'active',
      tier: 'gold',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-21',
      totalPointsEarned: 12500,
      totalPointsRedeemed: 3200,
      currentBalance: 9300,
      lifetimeValue: 45000,
      pendingPoints: 250,
      pointsThisMonth: 1850,
      redeemedThisMonth: 800,
      averageMonthlyEarning: 2100,
      redemptionRate: 25.6,
      engagement: 'high',
      preferredRewards: ['discounts', 'gift_cards'],
      pointsHistory: {
        earned: [
          { date: '2024-01-21', amount: 100, source: 'purchase', orderId: 'ORD-001' },
          { date: '2024-01-20', amount: 50, source: 'review', productId: 'PRD-001' },
          { date: '2024-01-19', amount: 25, source: 'referral', referralId: 'REF-001' }
        ],
        redeemed: [
          { date: '2024-01-18', amount: -200, reward: '10% Discount', rewardId: 'RWD-001' },
          { date: '2024-01-15', amount: -500, reward: 'Gift Card', rewardId: 'RWD-002' }
        ]
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      userId: 'USR-002',
      email: 'sarah.j@email.com',
      phone: '+1-555-0456',
      avatar: '/api/placeholder/50/50',
      status: 'active',
      tier: 'platinum',
      joinDate: '2024-01-08',
      lastActivity: '2024-01-21',
      totalPointsEarned: 18750,
      totalPointsRedeemed: 5600,
      currentBalance: 13150,
      lifetimeValue: 67000,
      pendingPoints: 450,
      pointsThisMonth: 2650,
      redeemedThisMonth: 1200,
      averageMonthlyEarning: 3100,
      redemptionRate: 29.9,
      engagement: 'high',
      preferredRewards: ['free_shipping', 'exclusive_access'],
      pointsHistory: {
        earned: [
          { date: '2024-01-21', amount: 150, source: 'purchase', orderId: 'ORD-002' },
          { date: '2024-01-20', amount: 75, source: 'bonus', campaignId: 'CMP-001' },
          { date: '2024-01-19', amount: 100, source: 'milestone', achievement: 'loyal_customer' }
        ],
        redeemed: [
          { date: '2024-01-17', amount: -300, reward: 'Free Shipping', rewardId: 'RWD-003' },
          { date: '2024-01-14', amount: -800, reward: 'Premium Access', rewardId: 'RWD-004' }
        ]
      }
    },
    {
      id: 3,
      name: 'Mike Chen',
      userId: 'USR-003',
      email: 'mike.chen@email.com',
      phone: '+1-555-0789',
      avatar: '/api/placeholder/50/50',
      status: 'active',
      tier: 'silver',
      joinDate: '2024-01-12',
      lastActivity: '2024-01-20',
      totalPointsEarned: 8200,
      totalPointsRedeemed: 2100,
      currentBalance: 6100,
      lifetimeValue: 28000,
      pendingPoints: 150,
      pointsThisMonth: 980,
      redeemedThisMonth: 400,
      averageMonthlyEarning: 1400,
      redemptionRate: 25.6,
      engagement: 'medium',
      preferredRewards: ['discounts', 'vouchers'],
      pointsHistory: {
        earned: [
          { date: '2024-01-20', amount: 80, source: 'purchase', orderId: 'ORD-003' },
          { date: '2024-01-19', amount: 30, source: 'social_share', platform: 'facebook' },
          { date: '2024-01-18', amount: 40, source: 'survey', surveyId: 'SUR-001' }
        ],
        redeemed: [
          { date: '2024-01-16', amount: -150, reward: '5% Discount', rewardId: 'RWD-005' },
          { date: '2024-01-12', amount: -250, reward: 'Store Credit', rewardId: 'RWD-006' }
        ]
      }
    },
    {
      id: 4,
      name: 'Lisa Park',
      userId: 'USR-004',
      email: 'lisa.park@email.com',
      phone: '+1-555-0321',
      avatar: '/api/placeholder/50/50',
      status: 'inactive',
      tier: 'bronze',
      joinDate: '2024-01-15',
      lastActivity: '2024-01-18',
      totalPointsEarned: 3400,
      totalPointsRedeemed: 800,
      currentBalance: 2600,
      lifetimeValue: 12000,
      pendingPoints: 50,
      pointsThisMonth: 320,
      redeemedThisMonth: 100,
      averageMonthlyEarning: 850,
      redemptionRate: 23.5,
      engagement: 'low',
      preferredRewards: ['discounts'],
      pointsHistory: {
        earned: [
          { date: '2024-01-18', amount: 50, source: 'purchase', orderId: 'ORD-004' },
          { date: '2024-01-17', amount: 20, source: 'login_bonus', streak: 7 },
          { date: '2024-01-16', amount: 25, source: 'referral', referralId: 'REF-002' }
        ],
        redeemed: [
          { date: '2024-01-15', amount: -100, reward: 'Small Discount', rewardId: 'RWD-007' }
        ]
      }
    },
    {
      id: 5,
      name: 'David Wilson',
      userId: 'USR-005',
      email: 'david.w@email.com',
      phone: '+1-555-0654',
      avatar: '/api/placeholder/50/50',
      status: 'suspended',
      tier: 'bronze',
      joinDate: '2024-01-05',
      lastActivity: '2024-01-10',
      totalPointsEarned: 1200,
      totalPointsRedeemed: 200,
      currentBalance: 1000,
      lifetimeValue: 8000,
      pendingPoints: 0,
      pointsThisMonth: 120,
      redeemedThisMonth: 0,
      averageMonthlyEarning: 400,
      redemptionRate: 16.7,
      engagement: 'low',
      preferredRewards: ['vouchers'],
      pointsHistory: {
        earned: [
          { date: '2024-01-10', amount: 40, source: 'purchase', orderId: 'ORD-005' },
          { date: '2024-01-08', amount: 15, source: 'newsletter_signup', campaignId: 'CMP-002' }
        ],
        redeemed: [
          { date: '2024-01-07', amount: -200, reward: 'Voucher', rewardId: 'RWD-008' }
        ]
      }
    }
  ], []);

  // Memoized user tiers
  const userTiers = useMemo(() => [
    { id: 'all', name: 'All Tiers', icon: '🏷️' },
    { id: 'bronze', name: 'Bronze', icon: '🥉', minPoints: 0, multiplier: 1.0, color: 'text-amber-600' },
    { id: 'silver', name: 'Silver', icon: '🥈', minPoints: 5000, multiplier: 1.2, color: 'text-gray-400' },
    { id: 'gold', name: 'Gold', icon: '🥇', minPoints: 10000, multiplier: 1.5, color: 'text-yellow-400' },
    { id: 'platinum', name: 'Platinum', icon: '💎', minPoints: 20000, multiplier: 2.0, color: 'text-purple-400' }
  ], []);

  // Points configuration
  const pointsConfig = useMemo(() => ({
    purchaseMultiplier: 1, // 1 point per $1 spent
    reviewBonus: 50,
    referralBonus: 100,
    socialShareBonus: 25,
    loginStreakBonus: 10,
    birthdayBonus: 500,
    milestoneRewards: true,
    expirationEnabled: true,
    expirationMonths: 12,
    minimumRedemption: 100,
    tierBonuses: true
  }), []);

  // Filter users based on search, status, tier, and sorting
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.userId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesTier = tierFilter === 'all' || user.tier === tierFilter;
      
      return matchesSearch && matchesStatus && matchesTier;
    });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'points':
          return b.currentBalance - a.currentBalance;
        case 'activity':
          return new Date(b.lastActivity) - new Date(a.lastActivity);
        case 'tier':
          const tierOrder = { bronze: 0, silver: 1, gold: 2, platinum: 3 };
          return tierOrder[b.tier] - tierOrder[a.tier];
        default:
          return 0;
      }
    });

    return filtered;
  }, [users, searchTerm, statusFilter, tierFilter, sortBy]);

  const handleIssuePoints = useCallback((userId, amount, reason) => {
    console.log('Issuing points:', { userId, amount, reason });
    // In real app, would make API call
  }, []);

  const handleRedeemPoints = useCallback((userId, amount, reward) => {
    console.log('Redeeming points:', { userId, amount, reward });
    // In real app, would make API call
  }, []);

  const handleBulkIssuePoints = useCallback((amount, reason) => {
    console.log('Bulk issuing points to users:', selectedUsers, { amount, reason });
    setSelectedUsers([]);
    // In real app, would make API call
  }, [selectedUsers]);

  const toggleUserSelection = useCallback((userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const selectAllUsers = useCallback(() => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  }, [selectedUsers.length, filteredUsers]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      active: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      inactive: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '😴' },
      suspended: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '⏸️' }
    };
    
    const style = styles[status] || styles.active;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getTierBadge = useCallback((tier) => {
    const tierInfo = userTiers.find(t => t.id === tier);
    if (!tierInfo) return null;
    
    return (
      <span className={`${tierInfo.color} bg-black/30 border border-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{tierInfo.icon}</span>
        {tierInfo.name}
      </span>
    );
  }, [userTiers]);

  const getEngagementBadge = useCallback((engagement) => {
    const styles = {
      high: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '🔥' },
      medium: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '⚡' },
      low: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '📉' }
    };
    
    const style = styles[engagement] || styles.medium;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {engagement.charAt(0).toUpperCase() + engagement.slice(1)}
      </span>
    );
  }, []);

  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat().format(num);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Points', icon: '👥' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'rules', label: 'Rules', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
                Points Management
              </h1>
              <p className="text-zinc-400">Manage user points, rewards, and loyalty programs</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-400">Points System:</span>
                <button
                  onClick={() => setPointSystemEnabled(!pointSystemEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    pointSystemEnabled 
                      ? 'bg-gradient-to-r from-green-600 to-green-500' 
                      : 'bg-zinc-600'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    pointSystemEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
                <span className={`text-sm font-medium ${pointSystemEnabled ? 'text-green-400' : 'text-zinc-400'}`}>
                  {pointSystemEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              
              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ⚙️ Configure
              </button>
              <button
                onClick={() => setIsIssuePointsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                💰 Issue Points
              </button>
              {selectedUsers.length > 0 && (
                <button
                  onClick={() => handleBulkIssuePoints(100, 'Bulk reward')}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  🎁 Bulk Reward ({selectedUsers.length})
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-black/30 text-zinc-300 hover:bg-black/40 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {formatNumber(users.reduce((sum, user) => sum + user.totalPointsEarned, 0))}
                  </div>
                  <div className="text-sm text-zinc-400">Total Points Issued</div>
                  <div className="text-xs text-zinc-500 mt-1">💰 All time</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {formatNumber(users.reduce((sum, user) => sum + user.currentBalance, 0))}
                  </div>
                  <div className="text-sm text-zinc-400">Active Points</div>
                  <div className="text-xs text-zinc-500 mt-1">🏦 Current balance</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {formatNumber(users.reduce((sum, user) => sum + user.totalPointsRedeemed, 0))}
                  </div>
                  <div className="text-sm text-zinc-400">Points Redeemed</div>
                  <div className="text-xs text-zinc-500 mt-1">🎁 Total redemptions</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {users.filter(u => u.status === 'active').length}
                  </div>
                  <div className="text-sm text-zinc-400">Active Users</div>
                  <div className="text-xs text-zinc-500 mt-1">👥 Participating</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="bg-black/30 border border-zinc-700 rounded-xl p-6 hover:border-zinc-500 transition-all duration-300 text-left">
                  <div className="text-3xl mb-3">🎁</div>
                  <h3 className="font-bold text-white mb-2">Bulk Reward</h3>
                  <p className="text-sm text-zinc-400">Issue points to multiple users at once</p>
                </button>
                
                <button className="bg-black/30 border border-zinc-700 rounded-xl p-6 hover:border-zinc-500 transition-all duration-300 text-left">
                  <div className="text-3xl mb-3">📋</div>
                  <h3 className="font-bold text-white mb-2">Create Rule</h3>
                  <p className="text-sm text-zinc-400">Set up automated point earning rules</p>
                </button>
                
                <button className="bg-black/30 border border-zinc-700 rounded-xl p-6 hover:border-zinc-500 transition-all duration-300 text-left">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-bold text-white mb-2">View Analytics</h3>
                  <p className="text-sm text-zinc-400">Check points program performance</p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-600/20 border border-green-500/30 rounded-full flex items-center justify-center">
                      <span className="text-green-400">💰</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">John Smith earned 100 points</div>
                      <div className="text-sm text-zinc-400">From purchase #ORD-001 • 2 hours ago</div>
                    </div>
                    <div className="text-green-400 font-bold">+100</div>
                  </div>
                </div>
                
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-full flex items-center justify-center">
                      <span className="text-red-400">🎁</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Sarah Johnson redeemed 500 points</div>
                      <div className="text-sm text-zinc-400">For 10% discount coupon • 5 hours ago</div>
                    </div>
                    <div className="text-red-400 font-bold">-500</div>
                  </div>
                </div>
                
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-400">⭐</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Mike Chen earned 50 points</div>
                      <div className="text-sm text-zinc-400">From product review • 1 day ago</div>
                    </div>
                    <div className="text-blue-400 font-bold">+50</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="all" className="bg-black text-white">📋 All Status</option>
                    <option value="active" className="bg-black text-white">✅ Active</option>
                    <option value="inactive" className="bg-black text-white">😴 Inactive</option>
                    <option value="suspended" className="bg-black text-white">⏸️ Suspended</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {userTiers.map((tier) => (
                      <option key={tier.id} value={tier.id} className="bg-black text-white">
                        {tier.icon} {tier.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="points" className="bg-black text-white">💰 Points</option>
                    <option value="name" className="bg-black text-white">📝 Name</option>
                    <option value="activity" className="bg-black text-white">⚡ Activity</option>
                    <option value="tier" className="bg-black text-white">🏆 Tier</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-black' 
                        : 'bg-black/30 text-zinc-400 hover:bg-black/40 hover:text-white'
                    }`}
                  >
                    ⊞ Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white text-black' 
                        : 'bg-black/30 text-zinc-400 hover:bg-black/40 hover:text-white'
                    }`}
                  >
                    ☰ List
                  </button>
                </div>
                
                <div>
                  <button
                    onClick={selectAllUsers}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                  >
                    {selectedUsers.length === filteredUsers.length ? '❌ Deselect All' : '✅ Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Users Grid/List */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Users ({filteredUsers.length})
                  </h2>
                  
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400">{selectedUsers.length} selected</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBulkIssuePoints(100, 'Bulk reward')}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors"
                        >
                          💰 Issue Points
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center gap-2">
                              {getStatusBadge(user.status)}
                              {getTierBadge(user.tier)}
                            </div>
                          </div>

                          {/* User Info */}
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-16 h-16 rounded-full border border-zinc-600 object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-white">{user.name}</h3>
                              <p className="text-sm text-zinc-400">{user.userId}</p>
                              <p className="text-xs text-zinc-500">{user.email}</p>
                            </div>
                          </div>

                          {/* Points Info */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-green-400 font-semibold text-sm">{formatNumber(user.currentBalance)}</div>
                              <div className="text-xs text-zinc-500">💰 Current Balance</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-blue-400 font-semibold text-sm">{formatNumber(user.totalPointsEarned)}</div>
                              <div className="text-xs text-zinc-500">📈 Total Earned</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-red-400 font-semibold text-sm">{formatNumber(user.totalPointsRedeemed)}</div>
                              <div className="text-xs text-zinc-500">🎁 Redeemed</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-purple-400 font-semibold text-sm">{user.redemptionRate.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">📊 Redemption Rate</div>
                            </div>
                          </div>

                          {/* Engagement Badge */}
                          <div className="mb-4 flex justify-center">
                            {getEngagementBadge(user.engagement)}
                          </div>

                          {/* Additional Info */}
                          <div className="text-xs text-zinc-500 mb-4">
                            <div>📞 {user.phone}</div>
                            <div>📅 Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
                            <div>⚡ Last: {new Date(user.lastActivity).toLocaleDateString()}</div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleIssuePoints(user.id, 100, 'Manual reward')}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-500 hover:to-green-400 transition-all duration-300 flex items-center justify-center gap-1"
                            >
                              💰 Reward
                            </button>
                            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1">
                              👁️ View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                            className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border border-zinc-600 object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-white">{user.name}</h3>
                              {getTierBadge(user.tier)}
                              {getStatusBadge(user.status)}
                              {getEngagementBadge(user.engagement)}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-zinc-400">
                              <span>👤 {user.userId}</span>
                              <span>📧 {user.email}</span>
                              <span>💰 {formatNumber(user.currentBalance)} pts</span>
                              <span>📈 {formatNumber(user.totalPointsEarned)} earned</span>
                              <span>📊 {user.redemptionRate.toFixed(1)}% redemption</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleIssuePoints(user.id, 100, 'Manual reward')}
                              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-500 hover:to-green-400 transition-all duration-300 flex items-center gap-1"
                            >
                              💰 Reward
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-1">
                              👁️ View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Users Found</h3>
                    <p className="text-zinc-400 mb-6">No users match your current filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Rewards Catalog</h2>
              
              <div className="text-center text-zinc-400 py-8">
                🎁 Rewards catalog management would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Points Rules</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📋 Points earning rules configuration would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Points Analytics</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📈 Points program analytics would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Points Settings</h2>
              
              <div className="text-center text-zinc-400 py-8">
                ⚙️ Points system settings would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Configuration Modal */}
        {isConfigModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Points Configuration</h3>
                  <button
                    onClick={() => setIsConfigModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  ⚙️ Points system configuration form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsConfigModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-semibold">
                    💾 Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Issue Points Modal */}
        {isIssuePointsModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Issue Points</h3>
                  <button
                    onClick={() => setIsIssuePointsModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  💰 Points issuance form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsIssuePointsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    💰 Issue Points
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsManagement;
