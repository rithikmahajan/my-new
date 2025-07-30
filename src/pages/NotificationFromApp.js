import React, { useState, useCallback, useMemo } from 'react';

/**
 * NotificationFromApp Component - Modern Black & White Theme
 * 
 * Comprehensive notification management interface featuring:
 * - Push notification center with real-time updates
 * - Notification categorization and filtering
 * - Bulk notification operations
 * - Notification scheduling and automation
 * - User engagement analytics
 * - Template management system
 * - A/B testing for notifications
 * - Performance tracking and metrics
 */
const NotificationFromApp = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  // Memoized notifications data with comprehensive notification information
  const notifications = useMemo(() => [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #ORD-2024-001 from John Smith for iPhone 15 Pro has been received.',
      type: 'order',
      priority: 'high',
      category: 'orders',
      status: 'sent',
      sentTo: 1250,
      opened: 875,
      clicked: 234,
      timestamp: '2024-01-21T14:30:00Z',
      scheduledFor: null,
      image: '/api/placeholder/60/60',
      targetAudience: 'customers',
      engagement: {
        deliveryRate: 98.5,
        openRate: 70.0,
        clickRate: 18.7,
        conversionRate: 12.3
      },
      isTemplate: false,
      templateId: null,
      campaignId: 'CMP-001',
      abTestId: null,
      author: 'System',
      lastUpdated: '2024-01-21T14:30:00Z'
    },
    {
      id: 2,
      title: 'Special Discount Available',
      message: 'Get 25% off on all electronics! Limited time offer ending soon.',
      type: 'promotion',
      priority: 'medium',
      category: 'marketing',
      status: 'scheduled',
      sentTo: 5600,
      opened: 3920,
      clicked: 1176,
      timestamp: '2024-01-21T16:00:00Z',
      scheduledFor: '2024-01-22T10:00:00Z',
      image: '/api/placeholder/60/60',
      targetAudience: 'all_users',
      engagement: {
        deliveryRate: 96.2,
        openRate: 70.0,
        clickRate: 21.0,
        conversionRate: 15.8
      },
      isTemplate: false,
      templateId: 'TPL-005',
      campaignId: 'CMP-002',
      abTestId: 'AB-001',
      author: 'Marketing Team',
      lastUpdated: '2024-01-21T15:45:00Z'
    },
    {
      id: 3,
      title: 'Your Package Has Shipped',
      message: 'Your order #ORD-2024-002 has been shipped and will arrive in 2-3 business days.',
      type: 'shipping',
      priority: 'high',
      category: 'fulfillment',
      status: 'sent',
      sentTo: 890,
      opened: 712,
      clicked: 356,
      timestamp: '2024-01-21T12:15:00Z',
      scheduledFor: null,
      image: '/api/placeholder/60/60',
      targetAudience: 'customers',
      engagement: {
        deliveryRate: 99.1,
        openRate: 80.0,
        clickRate: 40.0,
        conversionRate: 5.2
      },
      isTemplate: false,
      templateId: 'TPL-002',
      campaignId: 'CMP-003',
      abTestId: null,
      author: 'Fulfillment System',
      lastUpdated: '2024-01-21T12:15:00Z'
    },
    {
      id: 4,
      title: 'Payment Failed - Action Required',
      message: 'Your payment for order #ORD-2024-003 failed. Please update your payment method.',
      type: 'alert',
      priority: 'critical',
      category: 'payments',
      status: 'failed',
      sentTo: 45,
      opened: 18,
      clicked: 12,
      timestamp: '2024-01-21T11:30:00Z',
      scheduledFor: null,
      image: '/api/placeholder/60/60',
      targetAudience: 'customers',
      engagement: {
        deliveryRate: 87.0,
        openRate: 40.0,
        clickRate: 26.7,
        conversionRate: 75.0
      },
      isTemplate: false,
      templateId: 'TPL-008',
      campaignId: 'CMP-004',
      abTestId: null,
      author: 'Payment System',
      lastUpdated: '2024-01-21T11:30:00Z'
    },
    {
      id: 5,
      title: 'Weekly Product Updates',
      message: 'Check out our latest products and featured items this week.',
      type: 'update',
      priority: 'low',
      category: 'newsletter',
      status: 'draft',
      sentTo: 0,
      opened: 0,
      clicked: 0,
      timestamp: '2024-01-21T09:00:00Z',
      scheduledFor: '2024-01-23T08:00:00Z',
      image: '/api/placeholder/60/60',
      targetAudience: 'subscribers',
      engagement: {
        deliveryRate: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0
      },
      isTemplate: false,
      templateId: 'TPL-012',
      campaignId: 'CMP-005',
      abTestId: null,
      author: 'Content Team',
      lastUpdated: '2024-01-21T09:00:00Z'
    },
    {
      id: 6,
      title: 'New Feature: Dark Mode',
      message: 'Experience our app in a whole new way with the new dark mode feature!',
      type: 'feature',
      priority: 'medium',
      category: 'product',
      status: 'sent',
      sentTo: 8900,
      opened: 6230,
      clicked: 1780,
      timestamp: '2024-01-20T16:45:00Z',
      scheduledFor: null,
      image: '/api/placeholder/60/60',
      targetAudience: 'all_users',
      engagement: {
        deliveryRate: 97.8,
        openRate: 70.0,
        clickRate: 20.0,
        conversionRate: 8.5
      },
      isTemplate: false,
      templateId: 'TPL-015',
      campaignId: 'CMP-006',
      abTestId: 'AB-002',
      author: 'Product Team',
      lastUpdated: '2024-01-20T16:45:00Z'
    }
  ], []);

  // Memoized notification categories and types
  const notificationCategories = useMemo(() => [
    { id: 'all', name: 'All Categories', icon: '📱', color: 'text-blue-400' },
    { id: 'orders', name: 'Orders', icon: '🛒', color: 'text-green-400' },
    { id: 'marketing', name: 'Marketing', icon: '📢', color: 'text-purple-400' },
    { id: 'fulfillment', name: 'Fulfillment', icon: '📦', color: 'text-blue-400' },
    { id: 'payments', name: 'Payments', icon: '💳', color: 'text-red-400' },
    { id: 'newsletter', name: 'Newsletter', icon: '📰', color: 'text-yellow-400' },
    { id: 'product', name: 'Product', icon: '🎯', color: 'text-indigo-400' }
  ], []);

  const notificationTypes = useMemo(() => [
    { id: 'order', name: 'Order', icon: '🛍️', color: 'text-green-400' },
    { id: 'promotion', name: 'Promotion', icon: '🎉', color: 'text-purple-400' },
    { id: 'shipping', name: 'Shipping', icon: '🚚', color: 'text-blue-400' },
    { id: 'alert', name: 'Alert', icon: '⚠️', color: 'text-red-400' },
    { id: 'update', name: 'Update', icon: '📢', color: 'text-yellow-400' },
    { id: 'feature', name: 'Feature', icon: '✨', color: 'text-indigo-400' }
  ], []);

  // Filter notifications based on search, status, category, priority, and sorting
  const filteredNotifications = useMemo(() => {
    let filtered = notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
      const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });

    // Sort notifications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'engagement':
          return b.engagement.openRate - a.engagement.openRate;
        case 'date':
          return new Date(b.timestamp) - new Date(a.timestamp);
        default:
          return 0;
      }
    });

    return filtered;
  }, [notifications, searchTerm, statusFilter, categoryFilter, priorityFilter, sortBy]);

  const handleCreateNotification = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCreateTemplate = useCallback(() => {
    setIsTemplateModalOpen(true);
  }, []);

  const handleDeleteNotification = useCallback((notificationId) => {
    console.log('Deleting notification:', notificationId);
    // In real app, would make API call
  }, []);

  const handleBulkAction = useCallback((action) => {
    console.log(`Bulk ${action} for notifications:`, selectedNotifications);
    setSelectedNotifications([]);
    // In real app, would make API call
  }, [selectedNotifications]);

  const toggleNotificationSelection = useCallback((notificationId) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  }, []);

  const selectAllNotifications = useCallback(() => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(notification => notification.id));
    }
  }, [selectedNotifications.length, filteredNotifications]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      sent: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      scheduled: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '⏰' },
      draft: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '📝' },
      failed: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '❌' }
    };
    
    const style = styles[status] || styles.draft;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getPriorityBadge = useCallback((priority) => {
    const styles = {
      critical: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '🚨' },
      high: { bg: 'bg-orange-600/20', text: 'text-orange-400', border: 'border-orange-500/30', icon: '⚡' },
      medium: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '⚠️' },
      low: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '📝' }
    };
    
    const style = styles[priority] || styles.medium;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  }, []);

  const getTypeBadge = useCallback((type) => {
    const typeInfo = notificationTypes.find(t => t.id === type);
    if (!typeInfo) return null;
    
    return (
      <span className={`${typeInfo.color} bg-black/30 border border-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{typeInfo.icon}</span>
        {typeInfo.name}
      </span>
    );
  }, [notificationTypes]);

  const formatTimestamp = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: '📱' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'automation', label: 'Automation', icon: '🤖' },
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
                Notification Center
              </h1>
              <p className="text-zinc-400">Manage push notifications and user engagement</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateTemplate}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📄 New Template
              </button>
              <button
                onClick={handleCreateNotification}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📱 Send Notification
              </button>
              {selectedNotifications.length > 0 && (
                <button
                  onClick={() => handleBulkAction('resend')}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  📤 Bulk Actions ({selectedNotifications.length})
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
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search notifications..."
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
                    <option value="sent" className="bg-black text-white">✅ Sent</option>
                    <option value="scheduled" className="bg-black text-white">⏰ Scheduled</option>
                    <option value="draft" className="bg-black text-white">📝 Draft</option>
                    <option value="failed" className="bg-black text-white">❌ Failed</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {notificationCategories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-black text-white">
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="all" className="bg-black text-white">⚡ All Priority</option>
                    <option value="critical" className="bg-black text-white">🚨 Critical</option>
                    <option value="high" className="bg-black text-white">⚡ High</option>
                    <option value="medium" className="bg-black text-white">⚠️ Medium</option>
                    <option value="low" className="bg-black text-white">📝 Low</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="date" className="bg-black text-white">📅 Date</option>
                    <option value="title" className="bg-black text-white">📝 Title</option>
                    <option value="priority" className="bg-black text-white">⚡ Priority</option>
                    <option value="engagement" className="bg-black text-white">📊 Engagement</option>
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
                    onClick={selectAllNotifications}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                  >
                    {selectedNotifications.length === filteredNotifications.length ? '❌ Deselect All' : '✅ Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{notifications.length}</div>
                  <div className="text-sm text-zinc-400">Total Notifications</div>
                  <div className="text-xs text-zinc-500 mt-1">📱 All notifications</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {notifications.filter(n => n.status === 'sent').length}
                  </div>
                  <div className="text-sm text-zinc-400">Sent Today</div>
                  <div className="text-xs text-zinc-500 mt-1">✅ Successfully delivered</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {(notifications.reduce((sum, n) => sum + n.engagement.openRate, 0) / notifications.length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-zinc-400">Avg. Open Rate</div>
                  <div className="text-xs text-zinc-500 mt-1">👀 User engagement</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {notifications.reduce((sum, n) => sum + n.sentTo, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-zinc-400">Total Reach</div>
                  <div className="text-xs text-zinc-500 mt-1">📤 Users reached</div>
                </div>
              </div>
            </div>

            {/* Notifications Grid/List */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Notifications ({filteredNotifications.length})
                  </h2>
                  
                  {selectedNotifications.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400">{selectedNotifications.length} selected</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBulkAction('resend')}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors"
                        >
                          📤 Resend
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <input
                              type="checkbox"
                              checked={selectedNotifications.includes(notification.id)}
                              onChange={() => toggleNotificationSelection(notification.id)}
                              className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center gap-2">
                              {getStatusBadge(notification.status)}
                              {getPriorityBadge(notification.priority)}
                            </div>
                          </div>

                          {/* Notification Info */}
                          <div className="flex items-start gap-4 mb-4">
                            <img
                              src={notification.image}
                              alt="Notification"
                              className="w-12 h-12 rounded-lg border border-zinc-600 object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-white text-sm mb-1">{notification.title}</h3>
                              <p className="text-xs text-zinc-400 line-clamp-2">{notification.message}</p>
                              <div className="flex items-center gap-2 mt-2">
                                {getTypeBadge(notification.type)}
                              </div>
                            </div>
                          </div>

                          {/* Engagement Metrics */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-blue-400 font-semibold text-sm">{notification.sentTo.toLocaleString()}</div>
                              <div className="text-xs text-zinc-500">📤 Sent To</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-green-400 font-semibold text-sm">{notification.opened.toLocaleString()}</div>
                              <div className="text-xs text-zinc-500">👀 Opened</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-yellow-400 font-semibold text-sm">{notification.clicked.toLocaleString()}</div>
                              <div className="text-xs text-zinc-500">👆 Clicked</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-purple-400 font-semibold text-sm">{notification.engagement.openRate.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">📊 Open Rate</div>
                            </div>
                          </div>

                          {/* Timestamp and Author */}
                          <div className="text-xs text-zinc-500 mb-4">
                            <div>⏰ {formatTimestamp(notification.timestamp)}</div>
                            <div>👤 {notification.author}</div>
                            <div>🎯 {notification.targetAudience.replace('_', ' ')}</div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1">
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center gap-1"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <div key={notification.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(notification.id)}
                            onChange={() => toggleNotificationSelection(notification.id)}
                            className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          
                          <img
                            src={notification.image}
                            alt="Notification"
                            className="w-12 h-12 rounded-lg border border-zinc-600 object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-white">{notification.title}</h3>
                              {getTypeBadge(notification.type)}
                              {getStatusBadge(notification.status)}
                              {getPriorityBadge(notification.priority)}
                            </div>
                            <p className="text-sm text-zinc-400 mb-1">{notification.message}</p>
                            <div className="flex items-center gap-6 text-xs text-zinc-500">
                              <span>📤 {notification.sentTo.toLocaleString()} sent</span>
                              <span>👀 {notification.opened.toLocaleString()} opened</span>
                              <span>👆 {notification.clicked.toLocaleString()} clicked</span>
                              <span>📊 {notification.engagement.openRate.toFixed(1)}% rate</span>
                              <span>⏰ {formatTimestamp(notification.timestamp)}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-1">
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center gap-1"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Notifications Found</h3>
                    <p className="text-zinc-400 mb-6">No notifications match your current filters.</p>
                    <button
                      onClick={handleCreateNotification}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      📱 Send First Notification
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Notification Templates</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📄 Notification templates management would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Notification Analytics</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📊 Notification analytics dashboard would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Notification Automation</h2>
              
              <div className="text-center text-zinc-400 py-8">
                🤖 Notification automation rules would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
              
              <div className="text-center text-zinc-400 py-8">
                ⚙️ Notification system settings would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Create Notification Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Send New Notification</h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📱 Notification creation form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    📤 Send Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Template Modal */}
        {isTemplateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Create New Template</h3>
                  <button
                    onClick={() => setIsTemplateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📄 Template creation form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsTemplateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-semibold">
                    💾 Save Template
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

export default NotificationFromApp;
