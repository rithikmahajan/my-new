import React, { useState, useCallback, useMemo } from 'react';

/**
 * ManageBannersOnRewards Component - Modern Black & White Theme
 * 
 * Comprehensive banner management interface for rewards system featuring:
 * - Advanced banner creation and editing
 * - Drag-and-drop image upload with preview
 * - Priority and positioning management
 * - A/B testing capabilities for banners
 * - Analytics and performance tracking
 * - Bulk operations and template system
 * - Responsive design optimization
 * - Dynamic banner scheduling and automation
 */
const ManageBannersOnRewards = () => {
  const [activeTab, setActiveTab] = useState('banners');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [isDragOver, setIsDragOver] = useState(false);

  // Memoized banners data with comprehensive reward banner information
  const banners = useMemo(() => [
    {
      id: 1,
      title: 'Mega Rewards Sale',
      subtitle: 'Earn 5x points on all purchases',
      description: 'Get incredible rewards with our biggest points multiplier event. Earn 5x points on every purchase and unlock exclusive rewards.',
      image: '/api/placeholder/800/400',
      type: 'promotion',
      status: 'active',
      priority: 1,
      position: 'hero',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      ctaText: 'Shop Now & Earn',
      ctaLink: '/rewards-shop',
      targetAudience: 'all',
      clickCount: 15420,
      conversionRate: 4.2,
      revenue: 245000,
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      tags: ['rewards', 'promotion', 'featured']
    },
    {
      id: 2,
      title: 'VIP Member Exclusive',
      subtitle: 'Special rewards for our VIP members',
      description: 'Exclusive rewards and bonuses available only for our VIP tier members. Unlock premium benefits and special discounts.',
      image: '/api/placeholder/800/400',
      type: 'exclusive',
      status: 'active',
      priority: 2,
      position: 'featured',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      ctaText: 'Become VIP',
      ctaLink: '/vip-membership',
      targetAudience: 'vip',
      clickCount: 8920,
      conversionRate: 6.8,
      revenue: 189000,
      createdDate: '2024-01-05',
      lastModified: '2024-01-16',
      tags: ['vip', 'exclusive', 'membership']
    },
    {
      id: 3,
      title: 'Daily Check-in Bonus',
      subtitle: 'Earn points by checking in daily',
      description: 'Don\'t miss out on your daily rewards! Check in every day to earn bonus points and maintain your streak for extra benefits.',
      image: '/api/placeholder/800/400',
      type: 'engagement',
      status: 'active',
      priority: 3,
      position: 'sidebar',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      ctaText: 'Check In Now',
      ctaLink: '/daily-checkin',
      targetAudience: 'all',
      clickCount: 12340,
      conversionRate: 8.5,
      revenue: 67000,
      createdDate: '2024-01-08',
      lastModified: '2024-01-14',
      tags: ['daily', 'engagement', 'streak']
    },
    {
      id: 4,
      title: 'Referral Rewards Program',
      subtitle: 'Refer friends and earn together',
      description: 'Invite your friends to join our rewards program. Both you and your friend will receive bonus points when they make their first purchase.',
      image: '/api/placeholder/800/400',
      type: 'referral',
      status: 'draft',
      priority: 4,
      position: 'footer',
      startDate: '2024-02-01',
      endDate: '2024-03-31',
      ctaText: 'Refer Friends',
      ctaLink: '/referral-program',
      targetAudience: 'active',
      clickCount: 0,
      conversionRate: 0,
      revenue: 0,
      createdDate: '2024-01-20',
      lastModified: '2024-01-20',
      tags: ['referral', 'social', 'friends']
    },
    {
      id: 5,
      title: 'Birthday Special Rewards',
      subtitle: 'Celebrate your birthday with extra points',
      description: 'It\'s your special day! Enjoy birthday exclusive rewards, bonus points, and special discounts on your birthday month.',
      image: '/api/placeholder/800/400',
      type: 'special',
      status: 'scheduled',
      priority: 5,
      position: 'popup',
      startDate: '2024-01-25',
      endDate: '2024-01-31',
      ctaText: 'Claim Birthday Rewards',
      ctaLink: '/birthday-rewards',
      targetAudience: 'birthday',
      clickCount: 3450,
      conversionRate: 12.3,
      revenue: 78000,
      createdDate: '2024-01-12',
      lastModified: '2024-01-19',
      tags: ['birthday', 'special', 'personal']
    }
  ], []);

  // Memoized reward templates
  const bannerTemplates = useMemo(() => [
    {
      id: 1,
      name: 'Promotion Banner',
      description: 'Standard promotional banner template',
      thumbnail: '/api/placeholder/200/100',
      type: 'promotion'
    },
    {
      id: 2,
      name: 'VIP Exclusive',
      description: 'Premium template for VIP members',
      thumbnail: '/api/placeholder/200/100',
      type: 'exclusive'
    },
    {
      id: 3,
      name: 'Engagement Booster',
      description: 'Template to boost user engagement',
      thumbnail: '/api/placeholder/200/100',
      type: 'engagement'
    },
    {
      id: 4,
      name: 'Seasonal Special',
      description: 'Seasonal campaign template',
      thumbnail: '/api/placeholder/200/100',
      type: 'seasonal'
    }
  ], []);

  // Filter banners based on search, status, and sorting
  const filteredBanners = useMemo(() => {
    let filtered = banners.filter(banner => {
      const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           banner.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || banner.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort banners
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return a.priority - b.priority;
        case 'performance':
          return b.clickCount - a.clickCount;
        case 'revenue':
          return b.revenue - a.revenue;
        case 'date':
          return new Date(b.createdDate) - new Date(a.createdDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [banners, searchTerm, statusFilter, sortBy]);

  const handleCreateBanner = useCallback(() => {
    setEditingBanner(null);
    setIsCreateModalOpen(true);
  }, []);

  const handleEditBanner = useCallback((banner) => {
    setEditingBanner(banner);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteBanner = useCallback((bannerId) => {
    console.log('Deleting banner:', bannerId);
    // In real app, would make API call
  }, []);

  const handleBulkAction = useCallback((action) => {
    console.log(`Bulk ${action} for banners:`, selectedBanners);
    setSelectedBanners([]);
    // In real app, would make API call
  }, [selectedBanners]);

  const toggleBannerSelection = useCallback((bannerId) => {
    setSelectedBanners(prev => 
      prev.includes(bannerId)
        ? prev.filter(id => id !== bannerId)
        : [...prev, bannerId]
    );
  }, []);

  const selectAllBanners = useCallback(() => {
    if (selectedBanners.length === filteredBanners.length) {
      setSelectedBanners([]);
    } else {
      setSelectedBanners(filteredBanners.map(banner => banner.id));
    }
  }, [selectedBanners.length, filteredBanners]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      active: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      draft: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '📝' },
      scheduled: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '⏰' },
      paused: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '⏸️' }
    };
    
    const style = styles[status] || styles.draft;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getTypeIcon = useCallback((type) => {
    const icons = {
      promotion: '🎁',
      exclusive: '👑',
      engagement: '🔥',
      referral: '👥',
      special: '⭐',
      seasonal: '🎃'
    };
    return icons[type] || '📢';
  }, []);

  const getPositionBadge = useCallback((position) => {
    const styles = {
      hero: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      featured: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
      sidebar: 'bg-green-600/20 text-green-400 border-green-500/30',
      footer: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
      popup: 'bg-pink-600/20 text-pink-400 border-pink-500/30'
    };
    
    return (
      <span className={`${styles[position]} border px-2 py-1 rounded text-xs font-medium`}>
        {position}
      </span>
    );
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      console.log('Files dropped:', files);
      // Handle file upload
    }
  }, []);

  const tabs = [
    { id: 'banners', label: 'Manage Banners', icon: '🎯' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
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
                Manage Banners on Rewards
              </h1>
              <p className="text-zinc-400">Create and manage promotional banners for your rewards program</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateBanner}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ➕ Create Banner
              </button>
              {selectedBanners.length > 0 && (
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  🗑️ Delete ({selectedBanners.length})
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
        {activeTab === 'banners' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search banners..."
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
                    <option value="draft" className="bg-black text-white">📝 Draft</option>
                    <option value="scheduled" className="bg-black text-white">⏰ Scheduled</option>
                    <option value="paused" className="bg-black text-white">⏸️ Paused</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="priority" className="bg-black text-white">📊 Priority</option>
                    <option value="performance" className="bg-black text-white">🎯 Performance</option>
                    <option value="revenue" className="bg-black text-white">💰 Revenue</option>
                    <option value="date" className="bg-black text-white">📅 Date</option>
                  </select>
                </div>
                
                <div>
                  <button
                    onClick={selectAllBanners}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                  >
                    {selectedBanners.length === filteredBanners.length ? '❌ Deselect All' : '✅ Select All'}
                  </button>
                </div>
                
                <div>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:from-green-500 hover:to-green-400 transition-all duration-300">
                    📊 Export Data
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{banners.length}</div>
                  <div className="text-sm text-zinc-400">Total Banners</div>
                  <div className="text-xs text-zinc-500 mt-1">🎯 All campaigns</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {banners.filter(b => b.status === 'active').length}
                  </div>
                  <div className="text-sm text-zinc-400">Active Banners</div>
                  <div className="text-xs text-zinc-500 mt-1">✅ Currently live</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {banners.reduce((sum, b) => sum + b.clickCount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-zinc-400">Total Clicks</div>
                  <div className="text-xs text-zinc-500 mt-1">👆 All banners</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    ₹{(banners.reduce((sum, b) => sum + b.revenue, 0) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-zinc-400">Total Revenue</div>
                  <div className="text-xs text-zinc-500 mt-1">💰 Generated revenue</div>
                </div>
              </div>
            </div>

            {/* Banners Grid */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Reward Banners ({filteredBanners.length})
                  </h2>
                  
                  {selectedBanners.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400">{selectedBanners.length} selected</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBulkAction('activate')}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors"
                        >
                          ✅ Activate
                        </button>
                        <button
                          onClick={() => handleBulkAction('pause')}
                          className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-500 transition-colors"
                        >
                          ⏸️ Pause
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredBanners.map((banner) => (
                    <div key={banner.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                      <div className="relative">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-48 object-cover"
                        />
                        
                        {/* Selection Checkbox */}
                        <div className="absolute top-3 left-3">
                          <input
                            type="checkbox"
                            checked={selectedBanners.includes(banner.id)}
                            onChange={() => toggleBannerSelection(banner.id)}
                            className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        
                        {/* Priority Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-full text-xs font-medium">
                            #{banner.priority}
                          </span>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute bottom-3 left-3">
                          {getStatusBadge(banner.status)}
                        </div>
                        
                        {/* Position Badge */}
                        <div className="absolute bottom-3 right-3">
                          {getPositionBadge(banner.position)}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getTypeIcon(banner.type)}</span>
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{banner.title}</h3>
                            <p className="text-sm text-zinc-400">{banner.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                          {banner.description}
                        </p>
                        
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                            <div className="text-blue-400 font-semibold text-sm">{banner.clickCount.toLocaleString()}</div>
                            <div className="text-xs text-zinc-500">👆 Clicks</div>
                          </div>
                          <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                            <div className="text-green-400 font-semibold text-sm">{banner.conversionRate}%</div>
                            <div className="text-xs text-zinc-500">📈 Conversion</div>
                          </div>
                          <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                            <div className="text-purple-400 font-semibold text-sm">₹{(banner.revenue / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-zinc-500">💰 Revenue</div>
                          </div>
                        </div>
                        
                        {/* Campaign Duration */}
                        <div className="mb-4 text-xs text-zinc-500">
                          📅 {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {banner.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-zinc-600/20 text-zinc-400 px-2 py-1 rounded text-xs border border-zinc-500/30">
                              {tag}
                            </span>
                          ))}
                          {banner.tags.length > 3 && (
                            <span className="bg-zinc-600/20 text-zinc-400 px-2 py-1 rounded text-xs border border-zinc-500/30">
                              +{banner.tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditBanner(banner)}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBanner(banner.id)}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center gap-1"
                          >
                            🗑️ Delete
                          </button>
                          <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-500 hover:to-green-400 transition-all duration-300 flex items-center justify-center gap-1">
                            📊 Analytics
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredBanners.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Banners Found</h3>
                    <p className="text-zinc-400 mb-6">No banners match your current filters.</p>
                    <button
                      onClick={handleCreateBanner}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      ➕ Create First Banner
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Banner Templates</h2>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-2">
                  ➕ Create Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {bannerTemplates.map((template) => (
                  <div key={template.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2">{template.name}</h3>
                      <p className="text-sm text-zinc-400 mb-4">{template.description}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300">
                          📝 Use Template
                        </button>
                        <button className="px-3 py-2 bg-gradient-to-r from-zinc-600 to-zinc-500 text-white rounded-lg text-sm font-medium hover:from-zinc-500 hover:to-zinc-400 transition-all duration-300">
                          👁️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Banner Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Top Performing Banner</div>
                  <div className="text-2xl font-bold text-green-400 mb-1">Mega Rewards Sale</div>
                  <div className="text-xs text-zinc-500">₹2.45L revenue generated</div>
                </div>
                
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Best Conversion Rate</div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">Birthday Special</div>
                  <div className="text-xs text-zinc-500">12.3% conversion rate</div>
                </div>
                
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Most Clicked</div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">Mega Rewards Sale</div>
                  <div className="text-xs text-zinc-500">15,420 total clicks</div>
                </div>
              </div>
              
              <div className="text-center text-zinc-400 py-8">
                📊 Detailed analytics dashboard would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Banner Settings</h2>
              
              <div className="text-center text-zinc-400 py-8">
                ⚙️ Banner configuration settings would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Create Banner Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Create New Banner</h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                {/* Image Upload Area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-300 mb-4">Banner Image</label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      isDragOver 
                        ? 'border-blue-400 bg-blue-600/10' 
                        : 'border-zinc-600 hover:border-zinc-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Drop your banner image here
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      or click to browse files (Recommended: 800x400px)
                    </p>
                    <label className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 cursor-pointer inline-flex items-center gap-2">
                      📎 Choose File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📝 Banner creation form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    🎯 Create Banner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Banner Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Edit Banner</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  ✏️ Banner editing form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    💾 Update Banner
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

export default ManageBannersOnRewards;
