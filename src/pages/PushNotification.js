import React, { useState, useCallback, useMemo } from 'react';

/**
 * PushNotification Component - Modern Black & White Theme
 * 
 * Comprehensive push notification management interface featuring:
 * - Advanced notification composer with rich content
 * - Multi-platform targeting and scheduling
 * - Audience segmentation and targeting
 * - A/B testing for notification optimization
 * - Deep link management and tracking
 * - Image and media asset management
 * - Notification performance analytics
 * - Automation and trigger-based sending
 */
const PushNotification = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  // Notification composer state
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    image: null,
    deepLink: '',
    platforms: ['android', 'ios'],
    audience: 'all_users',
    scheduledFor: null,
    priority: 'normal',
    category: 'general',
    actions: [],
    customData: {}
  });

  // Memoized notifications data with comprehensive notification information
  const notifications = useMemo(() => [
    {
      id: 1,
      title: 'Flash Sale Alert!',
      message: 'Don\'t miss out on our biggest sale of the year. Up to 70% off selected items!',
      image: '/api/placeholder/100/60',
      deepLink: '/sale/flash-sale-2024',
      platforms: ['android', 'ios'],
      status: 'sent',
      priority: 'high',
      category: 'promotional',
      audience: 'all_users',
      sentAt: '2024-01-21T10:00:00Z',
      scheduledFor: null,
      performance: {
        sent: 15420,
        delivered: 15186,
        opened: 8934,
        clicked: 2456,
        deliveryRate: 98.5,
        openRate: 58.8,
        clickRate: 16.2,
        conversionRate: 12.3
      },
      targeting: {
        countries: ['US', 'CA', 'UK'],
        ageRange: [18, 65],
        interests: ['shopping', 'fashion'],
        lastActivity: '7_days'
      },
      abTest: {
        enabled: true,
        variant: 'A',
        testId: 'AB-001',
        winningVariant: 'A'
      },
      author: 'Marketing Team',
      createdAt: '2024-01-21T09:30:00Z'
    },
    {
      id: 2,
      title: 'Your Order Has Shipped',
      message: 'Great news! Your order #12345 has been shipped and is on its way to you.',
      image: '/api/placeholder/100/60',
      deepLink: '/orders/12345/tracking',
      platforms: ['android', 'ios'],
      status: 'sent',
      priority: 'normal',
      category: 'transactional',
      audience: 'customers',
      sentAt: '2024-01-21T14:30:00Z',
      scheduledFor: null,
      performance: {
        sent: 892,
        delivered: 889,
        opened: 756,
        clicked: 623,
        deliveryRate: 99.7,
        openRate: 85.0,
        clickRate: 69.8,
        conversionRate: 45.2
      },
      targeting: {
        countries: ['US'],
        userSegment: 'recent_buyers',
        orderStatus: 'shipped'
      },
      abTest: {
        enabled: false
      },
      author: 'System',
      createdAt: '2024-01-21T14:30:00Z'
    },
    {
      id: 3,
      title: 'New Features Available',
      message: 'Check out the latest app updates including dark mode and improved search!',
      image: '/api/placeholder/100/60',
      deepLink: '/app/features/latest',
      platforms: ['android', 'ios'],
      status: 'scheduled',
      priority: 'low',
      category: 'product_update',
      audience: 'active_users',
      sentAt: null,
      scheduledFor: '2024-01-22T09:00:00Z',
      performance: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        deliveryRate: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0
      },
      targeting: {
        countries: ['US', 'CA', 'UK', 'AU'],
        userSegment: 'active_users',
        appVersion: '>=2.1.0'
      },
      abTest: {
        enabled: true,
        variant: 'B',
        testId: 'AB-002'
      },
      author: 'Product Team',
      createdAt: '2024-01-21T16:45:00Z'
    },
    {
      id: 4,
      title: 'Payment Reminder',
      message: 'Your subscription payment failed. Please update your payment method to continue.',
      image: null,
      deepLink: '/account/billing',
      platforms: ['android', 'ios'],
      status: 'draft',
      priority: 'high',
      category: 'billing',
      audience: 'failed_payments',
      sentAt: null,
      scheduledFor: null,
      performance: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        deliveryRate: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0
      },
      targeting: {
        userSegment: 'failed_payment_users',
        paymentStatus: 'failed',
        subscriptionTier: 'premium'
      },
      abTest: {
        enabled: false
      },
      author: 'Billing System',
      createdAt: '2024-01-21T11:20:00Z'
    },
    {
      id: 5,
      title: 'Welcome to Our App!',
      message: 'Thanks for joining! Here\'s a quick guide to get you started.',
      image: '/api/placeholder/100/60',
      deepLink: '/onboarding/welcome',
      platforms: ['android', 'ios'],
      status: 'sent',
      priority: 'normal',
      category: 'onboarding',
      audience: 'new_users',
      sentAt: '2024-01-20T08:00:00Z',
      scheduledFor: null,
      performance: {
        sent: 2345,
        delivered: 2298,
        opened: 1834,
        clicked: 1289,
        deliveryRate: 98.0,
        openRate: 79.8,
        clickRate: 56.1,
        conversionRate: 34.5
      },
      targeting: {
        userSegment: 'new_registrations',
        registrationDate: 'today',
        onboardingStep: 'welcome'
      },
      abTest: {
        enabled: true,
        variant: 'A',
        testId: 'AB-003',
        winningVariant: 'A'
      },
      author: 'Onboarding Team',
      createdAt: '2024-01-20T07:30:00Z'
    }
  ], []);

  // Memoized notification categories
  const notificationCategories = useMemo(() => [
    { id: 'general', name: 'General', icon: '📱', color: 'text-blue-400' },
    { id: 'promotional', name: 'Promotional', icon: '🎉', color: 'text-purple-400' },
    { id: 'transactional', name: 'Transactional', icon: '📦', color: 'text-green-400' },
    { id: 'product_update', name: 'Product Update', icon: '🆕', color: 'text-indigo-400' },
    { id: 'billing', name: 'Billing', icon: '💳', color: 'text-red-400' },
    { id: 'onboarding', name: 'Onboarding', icon: '👋', color: 'text-yellow-400' }
  ], []);

  const platforms = useMemo(() => [
    { id: 'all', name: 'All Platforms', icon: '📱' },
    { id: 'android', name: 'Android', icon: '🤖' },
    { id: 'ios', name: 'iOS', icon: '🍎' },
    { id: 'web', name: 'Web', icon: '🌐' }
  ], []);

  // Filter notifications based on search, status, platform, and sorting
  const filteredNotifications = useMemo(() => {
    let filtered = notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
      const matchesPlatform = platformFilter === 'all' || 
                             notification.platforms.includes(platformFilter);
      
      return matchesSearch && matchesStatus && matchesPlatform;
    });

    // Sort notifications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'performance':
          return b.performance.openRate - a.performance.openRate;
        case 'sent':
          return b.performance.sent - a.performance.sent;
        case 'date':
          const aDate = new Date(a.sentAt || a.scheduledFor || a.createdAt);
          const bDate = new Date(b.sentAt || b.scheduledFor || b.createdAt);
          return bDate - aDate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [notifications, searchTerm, statusFilter, platformFilter, sortBy]);

  const handleSendNotification = useCallback(() => {
    console.log('Sending notification:', notificationData);
    setIsSendModalOpen(true);
    // In real app, would make API call
  }, [notificationData]);

  const handleScheduleNotification = useCallback(() => {
    console.log('Scheduling notification:', notificationData);
    setIsScheduleModalOpen(true);
    // In real app, would make API call
  }, [notificationData]);

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
      high: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '🚨' },
      normal: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '📢' },
      low: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '📝' }
    };
    
    const style = styles[priority] || styles.normal;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  }, []);

  const getCategoryBadge = useCallback((category) => {
    const categoryInfo = notificationCategories.find(c => c.id === category);
    if (!categoryInfo) return null;
    
    return (
      <span className={`${categoryInfo.color} bg-black/30 border border-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{categoryInfo.icon}</span>
        {categoryInfo.name}
      </span>
    );
  }, [notificationCategories]);

  const formatTimestamp = useCallback((timestamp) => {
    if (!timestamp) return 'Not scheduled';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat().format(num);
  }, []);

  const tabs = [
    { id: 'compose', label: 'Compose', icon: '✏️' },
    { id: 'notifications', label: 'Notifications', icon: '📱' },
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
                Push Notifications
              </h1>
              <p className="text-zinc-400">Send targeted notifications to engage your users</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleScheduleNotification}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ⏰ Schedule
              </button>
              <button
                onClick={handleSendNotification}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📤 Send Now
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
        {activeTab === 'compose' && (
          <div className="space-y-6">
            {/* Notification Composer */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Compose Notification</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={notificationData.title}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter notification title..."
                      className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                    <textarea
                      value={notificationData.message}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Enter your notification message..."
                      rows="4"
                      className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Deep Link (Optional)</label>
                    <input
                      type="text"
                      value={notificationData.deepLink}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, deepLink: e.target.value }))}
                      placeholder="/path/to/content"
                      className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Priority</label>
                      <select
                        value={notificationData.priority}
                        onChange={(e) => setNotificationData(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        <option value="low" className="bg-black text-white">📝 Low</option>
                        <option value="normal" className="bg-black text-white">📢 Normal</option>
                        <option value="high" className="bg-black text-white">🚨 High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                      <select
                        value={notificationData.category}
                        onChange={(e) => setNotificationData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        {notificationCategories.map((category) => (
                          <option key={category.id} value={category.id} className="bg-black text-white">
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Target Platforms</label>
                    <div className="flex gap-3">
                      {platforms.slice(1).map((platform) => (
                        <label key={platform.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationData.platforms.includes(platform.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNotificationData(prev => ({
                                  ...prev,
                                  platforms: [...prev.platforms, platform.id]
                                }));
                              } else {
                                setNotificationData(prev => ({
                                  ...prev,
                                  platforms: prev.platforms.filter(p => p !== platform.id)
                                }));
                              }
                            }}
                            className="w-4 h-4 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-zinc-300">{platform.icon} {platform.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Target Audience</label>
                    <select
                      value={notificationData.audience}
                      onChange={(e) => setNotificationData(prev => ({ ...prev, audience: e.target.value }))}
                      className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="all_users" className="bg-black text-white">👥 All Users</option>
                      <option value="active_users" className="bg-black text-white">⚡ Active Users</option>
                      <option value="new_users" className="bg-black text-white">🆕 New Users</option>
                      <option value="customers" className="bg-black text-white">💼 Customers</option>
                      <option value="custom" className="bg-black text-white">🎯 Custom Segment</option>
                    </select>
                  </div>
                </div>
                
                {/* Preview */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Preview</h3>
                  
                  {/* Mobile Preview */}
                  <div className="bg-black/50 border border-zinc-700 rounded-2xl p-6">
                    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-600">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          A
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm mb-1">
                            {notificationData.title || 'Notification Title'}
                          </div>
                          <div className="text-zinc-300 text-xs leading-relaxed">
                            {notificationData.message || 'Your notification message will appear here...'}
                          </div>
                          {notificationData.image && (
                            <div className="mt-2">
                              <img
                                src={notificationData.image}
                                alt="Notification"
                                className="w-full h-20 object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-zinc-500">now</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Settings Summary */}
                  <div className="bg-black/50 border border-zinc-700 rounded-xl p-4">
                    <h4 className="font-medium text-white mb-3">Settings Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Priority:</span>
                        <span className="text-white">{notificationData.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Category:</span>
                        <span className="text-white">{notificationData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Platforms:</span>
                        <span className="text-white">{notificationData.platforms.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Audience:</span>
                        <span className="text-white">{notificationData.audience.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Character Count */}
                  <div className="bg-black/50 border border-zinc-700 rounded-xl p-4">
                    <h4 className="font-medium text-white mb-3">Character Count</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Title:</span>
                        <span className={`${notificationData.title.length > 50 ? 'text-red-400' : 'text-green-400'}`}>
                          {notificationData.title.length}/50
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Message:</span>
                        <span className={`${notificationData.message.length > 120 ? 'text-red-400' : 'text-green-400'}`}>
                          {notificationData.message.length}/120
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
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
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {platforms.map((platform) => (
                      <option key={platform.id} value={platform.id} className="bg-black text-white">
                        {platform.icon} {platform.name}
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
                    <option value="date" className="bg-black text-white">📅 Date</option>
                    <option value="title" className="bg-black text-white">📝 Title</option>
                    <option value="performance" className="bg-black text-white">📊 Performance</option>
                    <option value="sent" className="bg-black text-white">📤 Sent Count</option>
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
                  <div className="text-xs text-zinc-500 mt-1">📱 All time</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {formatNumber(notifications.reduce((sum, n) => sum + n.performance.sent, 0))}
                  </div>
                  <div className="text-sm text-zinc-400">Total Sent</div>
                  <div className="text-xs text-zinc-500 mt-1">📤 All notifications</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {(notifications.reduce((sum, n) => sum + n.performance.openRate, 0) / notifications.filter(n => n.performance.openRate > 0).length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-zinc-400">Avg. Open Rate</div>
                  <div className="text-xs text-zinc-500 mt-1">👀 User engagement</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {(notifications.reduce((sum, n) => sum + n.performance.clickRate, 0) / notifications.filter(n => n.performance.clickRate > 0).length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-zinc-400">Avg. Click Rate</div>
                  <div className="text-xs text-zinc-500 mt-1">👆 User actions</div>
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

                          {/* Notification Content */}
                          <div className="mb-4">
                            <h3 className="font-bold text-white text-sm mb-2">{notification.title}</h3>
                            <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{notification.message}</p>
                            
                            {notification.image && (
                              <img
                                src={notification.image}
                                alt="Notification"
                                className="w-full h-20 object-cover rounded-lg mb-3"
                              />
                            )}
                            
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryBadge(notification.category)}
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-blue-400 font-semibold text-sm">{formatNumber(notification.performance.sent)}</div>
                              <div className="text-xs text-zinc-500">📤 Sent</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-green-400 font-semibold text-sm">{notification.performance.openRate.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">👀 Open Rate</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-yellow-400 font-semibold text-sm">{notification.performance.clickRate.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">👆 Click Rate</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-purple-400 font-semibold text-sm">{notification.performance.conversionRate.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">💰 Conversion</div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="text-xs text-zinc-500 mb-4">
                            <div>📱 Platforms: {notification.platforms.join(', ')}</div>
                            <div>⏰ {notification.sentAt ? `Sent: ${formatTimestamp(notification.sentAt)}` : `Scheduled: ${formatTimestamp(notification.scheduledFor)}`}</div>
                            <div>👤 Author: {notification.author}</div>
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
                          
                          {notification.image && (
                            <img
                              src={notification.image}
                              alt="Notification"
                              className="w-16 h-12 rounded-lg border border-zinc-600 object-cover"
                            />
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-white">{notification.title}</h3>
                              {getCategoryBadge(notification.category)}
                              {getStatusBadge(notification.status)}
                              {getPriorityBadge(notification.priority)}
                            </div>
                            <p className="text-sm text-zinc-400 mb-1">{notification.message}</p>
                            <div className="flex items-center gap-6 text-xs text-zinc-500">
                              <span>📤 {formatNumber(notification.performance.sent)} sent</span>
                              <span>👀 {notification.performance.openRate.toFixed(1)}% opened</span>
                              <span>👆 {notification.performance.clickRate.toFixed(1)}% clicked</span>
                              <span>📱 {notification.platforms.join(', ')}</span>
                              <span>⏰ {formatTimestamp(notification.sentAt || notification.scheduledFor)}</span>
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
                      onClick={() => setActiveTab('compose')}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      ✏️ Compose First Notification
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Notification Analytics</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📊 Notification performance analytics would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Notification Automation</h2>
              
              <div className="text-center text-zinc-400 py-8">
                🤖 Automated notification rules would be implemented here
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

        {/* Send Notification Modal */}
        {isSendModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Notification Sent!</h3>
                  <p className="text-zinc-400 mb-6">Your notification has been sent successfully to all targeted users.</p>
                </div>
                
                <button
                  onClick={() => setIsSendModalOpen(false)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Notification Modal */}
        {isScheduleModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">⏰</div>
                  <h3 className="text-xl font-bold text-white mb-2">Notification Scheduled!</h3>
                  <p className="text-zinc-400 mb-6">Your notification has been scheduled and will be sent automatically.</p>
                </div>
                
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-semibold"
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

export default PushNotification;
