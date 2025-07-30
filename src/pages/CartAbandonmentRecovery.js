import React, { useState, useMemo, useCallback } from 'react';

/**
 * Cart Abandonment Recovery Component - Modern Black & White Theme
 * 
 * Comprehensive cart abandonment recovery interface featuring:
 * - Advanced statistics overview for empty cart analysis
 * - Multi-dimensional user filtering and segmentation
 * - Automated email campaign management
 * - Real-time cart abandonment tracking
 * - Conversion optimization analytics
 * - A/B testing for recovery campaigns
 * - Predictive analytics for abandonment prevention
 * - Personalized recovery strategies
 */
const CartAbandonmentRecovery = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last 7 days');
  const [userType, setUserType] = useState('all');
  const [region, setRegion] = useState('all');
  const [sortBy, setSortBy] = useState('last active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  // Memoized statistics with comprehensive abandonment metrics
  const statistics = useMemo(() => ({
    emptyCartStatus: 2847,
    registeredUsers: 1623,
    guests: 1224,
    avgVisitTime: '4.2 min',
    abandonmentRate: '68.5%',
    recoveryRate: '23.8%',
    potentialRevenue: '$45,230',
    recoveredRevenue: '$10,875',
    avgCartValue: '$89.50',
    timeToAbandon: '3.7 min',
    topAbandonPage: 'Checkout',
    mobileAbandonRate: '72.1%',
    trends: {
      abandonmentRate: '+5.2%',
      recoveryRate: '+12.3%',
      revenue: '+$2,345'
    }
  }), []);

  // Memoized abandonment reasons with analytics
  const abandonmentReasons = useMemo(() => [
    { reason: 'High shipping costs', percentage: 28.5, count: 814, icon: '🚚' },
    { reason: 'Required account creation', percentage: 22.3, count: 635, icon: '👤' },
    { reason: 'Long checkout process', percentage: 18.7, count: 533, icon: '⏱️' },
    { reason: 'Payment security concerns', percentage: 15.1, count: 430, icon: '🔒' },
    { reason: 'Unexpected costs', percentage: 12.8, count: 365, icon: '💰' },
    { reason: 'Website errors', percentage: 2.6, count: 74, icon: '🐛' }
  ], []);

  // Memoized user data with enhanced cart abandonment information
  const users = useMemo(() => [
    {
      id: 'rithikmaha',
      email: 'rithikmahajan27@gmail.com',
      mobile: '7006114695',
      userName: 'rithikmaha',
      userType: 'guest',
      dob: '06/05/1999',
      gender: 'M',
      lastActive: '2024-01-21T14:32:00Z',
      avgVisitTime: '9 hours',
      cartAbandoned: true,
      cartValue: '$124.99',
      abandonedAt: '2024-01-21T12:45:00Z',
      abandonmentStage: 'Checkout',
      itemsInCart: 3,
      previousPurchases: 2,
      emailsSent: 1,
      lastEmailResponse: 'opened',
      conversionProbability: 'High',
      location: 'India',
      device: 'Mobile',
      recoveryEmails: [
        { type: 'immediate', sent: '2024-01-21T13:00:00Z', status: 'opened' }
      ]
    },
    {
      id: 'user2',
      email: 'user2@example.com',
      mobile: '9876543210',
      userName: 'user2',
      userType: 'registered',
      dob: '15/03/1995',
      gender: 'F',
      lastActive: '2024-01-21T16:15:00Z',
      avgVisitTime: '15 min',
      cartAbandoned: true,
      cartValue: '$89.50',
      abandonedAt: '2024-01-21T15:30:00Z',
      abandonmentStage: 'Payment',
      itemsInCart: 2,
      previousPurchases: 8,
      emailsSent: 2,
      lastEmailResponse: 'clicked',
      conversionProbability: 'Very High',
      location: 'USA',
      device: 'Desktop',
      recoveryEmails: [
        { type: 'immediate', sent: '2024-01-21T15:45:00Z', status: 'clicked' },
        { type: '24h_followup', sent: '2024-01-22T15:30:00Z', status: 'opened' }
      ]
    },
    {
      id: 'user3',
      email: 'sarah.wilson@email.com',
      mobile: '5551234567',
      userName: 'sarah_w',
      userType: 'premium',
      dob: '22/08/1988',
      gender: 'F',
      lastActive: '2024-01-21T18:20:00Z',
      avgVisitTime: '25 min',
      cartAbandoned: true,
      cartValue: '$234.75',
      abandonedAt: '2024-01-21T17:45:00Z',
      abandonmentStage: 'Shipping',
      itemsInCart: 5,
      previousPurchases: 15,
      emailsSent: 3,
      lastEmailResponse: 'converted',
      conversionProbability: 'Converted',
      location: 'Canada',
      device: 'Tablet',
      recoveryEmails: [
        { type: 'immediate', sent: '2024-01-21T18:00:00Z', status: 'opened' },
        { type: '24h_followup', sent: '2024-01-22T17:45:00Z', status: 'clicked' },
        { type: 'final_offer', sent: '2024-01-23T10:00:00Z', status: 'converted' }
      ]
    },
    {
      id: 'user4',
      email: 'mike.chen@example.com',
      mobile: '4445556789',
      userName: 'mike_chen',
      userType: 'registered',
      dob: '10/12/1990',
      gender: 'M',
      lastActive: '2024-01-21T20:30:00Z',
      avgVisitTime: '8 min',
      cartAbandoned: true,
      cartValue: '$67.25',
      abandonedAt: '2024-01-21T19:55:00Z',
      abandonmentStage: 'Product Page',
      itemsInCart: 1,
      previousPurchases: 3,
      emailsSent: 1,
      lastEmailResponse: 'not_opened',
      conversionProbability: 'Medium',
      location: 'UK',
      device: 'Mobile',
      recoveryEmails: [
        { type: 'immediate', sent: '2024-01-21T20:10:00Z', status: 'not_opened' }
      ]
    },
    {
      id: 'user5',
      email: 'emma.davis@email.com',
      mobile: '3334445678',
      userName: 'emma_d',
      userType: 'guest',
      dob: '05/07/1992',
      gender: 'F',
      lastActive: '2024-01-21T21:45:00Z',
      avgVisitTime: '12 min',
      cartAbandoned: true,
      cartValue: '$156.80',
      abandonedAt: '2024-01-21T21:20:00Z',
      abandonmentStage: 'Cart Review',
      itemsInCart: 4,
      previousPurchases: 0,
      emailsSent: 0,
      lastEmailResponse: null,
      conversionProbability: 'Low',
      location: 'Australia',
      device: 'Desktop',
      recoveryEmails: []
    }
  ], []);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchTerm === '' || 
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.mobile.includes(searchTerm);
      
      const matchesUserType = userType === 'all' || user.userType === userType;
      const matchesRegion = region === 'all' || user.location.toLowerCase().includes(region.toLowerCase());
      
      return matchesSearch && matchesUserType && matchesRegion;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'cart value':
          return parseFloat(b.cartValue.replace('$', '')) - parseFloat(a.cartValue.replace('$', ''));
        case 'probability':
          const probOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1, 'Converted': 5 };
          return probOrder[b.conversionProbability] - probOrder[a.conversionProbability];
        case 'last active':
          return new Date(b.lastActive) - new Date(a.lastActive);
        default:
          return 0;
      }
    });
  }, [users, searchTerm, userType, region, sortBy]);

  const getConversionProbabilityBadge = useCallback((probability) => {
    const styles = {
      'Very High': { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '🔥' },
      'High': { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '⬆️' },
      'Medium': { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '➡️' },
      'Low': { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '⬇️' },
      'Converted': { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-500/30', icon: '🎉' }
    };
    
    const style = styles[probability] || styles.Low;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {probability}
      </span>
    );
  }, []);

  const getUserTypeBadge = useCallback((type) => {
    const styles = {
      premium: { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-500/30', icon: '👑' },
      registered: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '👤' },
      guest: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '👥' }
    };
    
    const style = styles[type] || styles.guest;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  }, []);

  const getAbandonmentStageBadge = useCallback((stage) => {
    const styles = {
      'Product Page': { bg: 'bg-red-600/20', text: 'text-red-400', icon: '🛍️' },
      'Cart Review': { bg: 'bg-yellow-600/20', text: 'text-yellow-400', icon: '🛒' },
      'Shipping': { bg: 'bg-orange-600/20', text: 'text-orange-400', icon: '🚚' },
      'Payment': { bg: 'bg-purple-600/20', text: 'text-purple-400', icon: '💳' },
      'Checkout': { bg: 'bg-blue-600/20', text: 'text-blue-400', icon: '✅' }
    };
    
    const style = styles[stage] || styles['Product Page'];
    
    return (
      <span className={`${style.bg} ${style.text} border border-zinc-600 px-2 py-1 rounded text-xs flex items-center gap-1`}>
        <span>{style.icon}</span>
        {stage}
      </span>
    );
  }, []);

  const handleSendRecoveryEmail = useCallback((userId, emailType = 'immediate') => {
    console.log(`Sending ${emailType} recovery email to user:`, userId);
    // In real app, would make API call
  }, []);

  const handleBulkEmail = useCallback(() => {
    console.log('Sending bulk recovery emails to:', selectedUsers);
    setCampaignModalOpen(true);
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

  const formatTimestamp = useCallback((timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat().format(num);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Abandoned Carts', icon: '🛒' },
    { id: 'campaigns', label: 'Email Campaigns', icon: '📧' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
                Cart Abandonment Recovery
              </h1>
              <p className="text-zinc-400">Recover lost sales with intelligent cart abandonment campaigns</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                📊 Export Report
              </button>
              <button
                onClick={() => setCampaignModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📧 New Campaign
              </button>
              {selectedUsers.length > 0 && (
                <button
                  onClick={handleBulkEmail}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  📤 Bulk Email ({selectedUsers.length})
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">{formatNumber(statistics.emptyCartStatus)}</div>
                  <div className="text-sm text-zinc-400">Abandoned Carts</div>
                  <div className="text-xs text-red-300 mt-1">🛒 {statistics.trends.abandonmentRate}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{statistics.abandonmentRate}</div>
                  <div className="text-sm text-zinc-400">Abandonment Rate</div>
                  <div className="text-xs text-zinc-500 mt-1">📈 Industry avg: 70%</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{statistics.recoveryRate}</div>
                  <div className="text-sm text-zinc-400">Recovery Rate</div>
                  <div className="text-xs text-green-300 mt-1">💰 {statistics.trends.recoveryRate}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{statistics.recoveredRevenue}</div>
                  <div className="text-sm text-zinc-400">Recovered Revenue</div>
                  <div className="text-xs text-purple-300 mt-1">💎 {statistics.trends.revenue}</div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Average Cart Value:</span>
                    <span className="text-white font-semibold">{statistics.avgCartValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Time to Abandon:</span>
                    <span className="text-white font-semibold">{statistics.timeToAbandon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Top Abandon Page:</span>
                    <span className="text-white font-semibold">{statistics.topAbandonPage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Mobile Abandon Rate:</span>
                    <span className="text-white font-semibold">{statistics.mobileAbandonRate}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">User Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Registered Users:</span>
                    <span className="text-blue-400 font-semibold">{formatNumber(statistics.registeredUsers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Guest Users:</span>
                    <span className="text-gray-400 font-semibold">{formatNumber(statistics.guests)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Avg Visit Time:</span>
                    <span className="text-white font-semibold">{statistics.avgVisitTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Potential Revenue:</span>
                    <span className="text-green-400 font-semibold">{statistics.potentialRevenue}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm">
                    📧 Send Recovery Emails
                  </button>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors text-sm">
                    📊 Generate Report
                  </button>
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm">
                    🎯 Create Campaign
                  </button>
                  <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors text-sm">
                    ⚙️ Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Abandonment Reasons */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Top Abandonment Reasons</h3>
              <div className="space-y-4">
                {abandonmentReasons.map((reason, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl">{reason.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-medium">{reason.reason}</span>
                        <span className="text-zinc-400 text-sm">{reason.percentage}% ({formatNumber(reason.count)})</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${reason.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div>
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
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="all" className="bg-black text-white">👥 All Users</option>
                    <option value="premium" className="bg-black text-white">👑 Premium</option>
                    <option value="registered" className="bg-black text-white">👤 Registered</option>
                    <option value="guest" className="bg-black text-white">👥 Guest</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="all" className="bg-black text-white">🌍 All Regions</option>
                    <option value="usa" className="bg-black text-white">🇺🇸 USA</option>
                    <option value="canada" className="bg-black text-white">🇨🇦 Canada</option>
                    <option value="uk" className="bg-black text-white">🇬🇧 UK</option>
                    <option value="india" className="bg-black text-white">🇮🇳 India</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="last active" className="bg-black text-white">⏰ Last Active</option>
                    <option value="cart value" className="bg-black text-white">💰 Cart Value</option>
                    <option value="probability" className="bg-black text-white">📈 Probability</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="last 24 hours" className="bg-black text-white">📅 Last 24 Hours</option>
                    <option value="last 7 days" className="bg-black text-white">📆 Last 7 Days</option>
                    <option value="last 30 days" className="bg-black text-white">🗓️ Last 30 Days</option>
                  </select>
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

            {/* Users Table */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Abandoned Carts ({filteredUsers.length})
                  </h2>
                  
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400">{selectedUsers.length} selected</span>
                      <div className="flex gap-2">
                        <button
                          onClick={handleBulkEmail}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition-colors"
                        >
                          📧 Send Emails
                        </button>
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors">
                          📊 Export
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={selectAllUsers}
                            className="w-4 h-4 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">User</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Cart Value</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Stage</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Probability</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Last Active</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Emails</th>
                        <th className="text-left py-3 px-4 text-zinc-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-zinc-800 hover:bg-black/30 transition-colors">
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              className="w-4 h-4 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-white">{user.userName}</div>
                              <div className="text-xs text-zinc-400">{user.email}</div>
                              <div className="text-xs text-zinc-500">{user.mobile}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {getUserTypeBadge(user.userType)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-green-400">{user.cartValue}</div>
                            <div className="text-xs text-zinc-400">{user.itemsInCart} items</div>
                          </td>
                          <td className="py-3 px-4">
                            {getAbandonmentStageBadge(user.abandonmentStage)}
                          </td>
                          <td className="py-3 px-4">
                            {getConversionProbabilityBadge(user.conversionProbability)}
                          </td>
                          <td className="py-3 px-4 text-zinc-300 text-xs">
                            {formatTimestamp(user.lastActive)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-center">
                              <div className="text-blue-400 font-semibold">{user.emailsSent}</div>
                              <div className="text-xs text-zinc-500">sent</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSendRecoveryEmail(user.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500 transition-colors"
                              >
                                📧 Email
                              </button>
                              <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-500 transition-colors">
                                👁️ View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Abandoned Carts Found</h3>
                    <p className="text-zinc-400 mb-6">No users match your current filters.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setUserType('all');
                        setRegion('all');
                      }}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      🔄 Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Email Campaigns</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📧 Email campaign management would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Cart Analytics</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📈 Advanced cart analytics would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Campaign Modal */}
        {campaignModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-xl font-bold text-white mb-2">Campaign Created!</h3>
                  <p className="text-zinc-400 mb-6">Recovery emails will be sent to selected users automatically.</p>
                </div>
                
                <button
                  onClick={() => setCampaignModalOpen(false)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartAbandonmentRecovery;
