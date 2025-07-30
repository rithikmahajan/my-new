import React, { useState, useCallback, useMemo } from 'react';

/**
 * JoinUsControl Component - Modern Black & White Theme
 * 
 * Comprehensive social media and community management interface featuring:
 * - Social media post creation and scheduling
 * - Community content management
 * - Join us banner and promotional content
 * - Social media analytics and engagement tracking
 * - Multi-platform posting (Instagram, Facebook, Twitter, LinkedIn)
 * - Content calendar and scheduling
 * - User-generated content moderation
 * - Campaign performance tracking
 */
const JoinUsControl = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Memoized social media posts data
  const socialPosts = useMemo(() => [
    {
      id: 1,
      title: 'Summer Collection Launch',
      content: 'Discover our exciting new summer collection! 🌞 Premium cotton t-shirts with sustainable materials. Perfect for your everyday comfort. #SummerFashion #SustainableClothing',
      platform: 'instagram',
      status: 'published',
      scheduledDate: '2024-01-20T10:00:00',
      publishedDate: '2024-01-20T10:00:00',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
      engagement: {
        likes: 1250,
        comments: 89,
        shares: 45,
        views: 8920
      },
      hashtags: ['#SummerFashion', '#SustainableClothing', '#YORAA', '#OrganicCotton'],
      campaign: 'Summer 2024 Launch'
    },
    {
      id: 2,
      title: 'Customer Testimonial Feature',
      content: 'Amazing feedback from our customers! ⭐⭐⭐⭐⭐ "Best quality t-shirts I\'ve ever owned. The fabric is so soft and comfortable!" - Sarah M. Join thousands of happy customers! #CustomerLove',
      platform: 'facebook',
      status: 'scheduled',
      scheduledDate: '2024-01-22T14:30:00',
      publishedDate: null,
      images: ['/api/placeholder/400/300'],
      engagement: null,
      hashtags: ['#CustomerLove', '#Testimonial', '#Quality'],
      campaign: 'Social Proof Campaign'
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      content: 'Take a look behind the scenes at our sustainable manufacturing process! 🏭✨ From organic cotton fields to your wardrobe. #BehindTheScenes #Sustainability',
      platform: 'linkedin',
      status: 'draft',
      scheduledDate: '2024-01-25T09:00:00',
      publishedDate: null,
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      engagement: null,
      hashtags: ['#BehindTheScenes', '#Sustainability', '#Manufacturing'],
      campaign: 'Brand Transparency'
    },
    {
      id: 4,
      title: 'Flash Sale Alert',
      content: '🚨 FLASH SALE ALERT! 40% OFF on all premium cotton t-shirts for the next 24 hours! Use code: FLASH40. Limited time offer! ⏰ #FlashSale #LimitedOffer',
      platform: 'twitter',
      status: 'published',
      scheduledDate: '2024-01-18T16:00:00',
      publishedDate: '2024-01-18T16:00:00',
      images: ['/api/placeholder/500/300'],
      engagement: {
        likes: 892,
        comments: 156,
        shares: 234,
        views: 12450
      },
      hashtags: ['#FlashSale', '#LimitedOffer', '#YORAA'],
      campaign: 'Flash Sale Jan 2024'
    },
    {
      id: 5,
      title: 'Eco-Friendly Initiative',
      content: '🌱 Proud to announce our new eco-friendly packaging! Made from 100% recycled materials. Every small step counts towards a sustainable future. #EcoFriendly #Sustainability',
      platform: 'instagram',
      status: 'published',
      scheduledDate: '2024-01-15T12:00:00',
      publishedDate: '2024-01-15T12:00:00',
      images: ['/api/placeholder/400/400'],
      engagement: {
        likes: 2140,
        comments: 298,
        shares: 87,
        views: 15620
      },
      hashtags: ['#EcoFriendly', '#Sustainability', '#GreenInitiative'],
      campaign: 'Sustainability Awareness'
    }
  ], []);

  // Memoized join us banners data
  const joinUsBanners = useMemo(() => [
    {
      id: 1,
      title: 'Join Our Community',
      subtitle: 'Connect with fashion lovers worldwide',
      description: 'Be part of our growing community of fashion enthusiasts. Get exclusive access to new collections, special discounts, and styling tips.',
      image: '/api/placeholder/800/400',
      ctaText: 'Join Now',
      ctaLink: '/signup',
      isActive: true,
      placement: 'homepage_hero',
      clicks: 1250,
      conversions: 89
    },
    {
      id: 2,
      title: 'Newsletter Signup',
      subtitle: 'Stay updated with latest trends',
      description: 'Subscribe to our newsletter and never miss out on the latest fashion trends, exclusive offers, and styling inspiration.',
      image: '/api/placeholder/600/300',
      ctaText: 'Subscribe',
      ctaLink: '/newsletter',
      isActive: true,
      placement: 'footer',
      clicks: 892,
      conversions: 156
    },
    {
      id: 3,
      title: 'Referral Program',
      subtitle: 'Invite friends and earn rewards',
      description: 'Refer your friends and earn exclusive rewards! Both you and your friend get 20% off on your next purchase.',
      image: '/api/placeholder/700/350',
      ctaText: 'Refer Now',
      ctaLink: '/referral',
      isActive: false,
      placement: 'product_page',
      clicks: 567,
      conversions: 78
    }
  ], []);

  // Filter posts based on search, platform, and status
  const filteredPosts = useMemo(() => {
    return socialPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatform === 'all' || post.platform === selectedPlatform;
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [socialPosts, searchTerm, selectedPlatform, statusFilter]);

  const handleCreatePost = useCallback(() => {
    setSelectedPost(null);
    setIsEditMode(false);
    setIsCreateModalOpen(true);
  }, []);

  const handleEditPost = useCallback((post) => {
    setSelectedPost(post);
    setIsEditMode(true);
    setIsCreateModalOpen(true);
  }, []);

  const handleDeletePost = useCallback((postId) => {
    console.log('Deleting post:', postId);
    // In real app, would make API call
  }, []);

  const getPlatformIcon = useCallback((platform) => {
    const icons = {
      instagram: '📷',
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼'
    };
    return icons[platform] || '📱';
  }, []);

  const getPlatformColor = useCallback((platform) => {
    const colors = {
      instagram: 'from-pink-600 to-purple-600',
      facebook: 'from-blue-600 to-blue-700',
      twitter: 'from-sky-500 to-blue-600',
      linkedin: 'from-blue-700 to-blue-800'
    };
    return colors[platform] || 'from-gray-600 to-gray-700';
  }, []);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      published: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      scheduled: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '⏰' },
      draft: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '📝' }
    };
    
    const style = styles[status] || styles.draft;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const tabs = [
    { id: 'posts', label: 'Social Posts', icon: '📱' },
    { id: 'banners', label: 'Join Us Banners', icon: '🎯' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const platforms = [
    { id: 'all', label: 'All Platforms', icon: '🌐' },
    { id: 'instagram', label: 'Instagram', icon: '📷' },
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'twitter', label: 'Twitter', icon: '🐦' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
                Join Us Control
              </h1>
              <p className="text-zinc-400">Manage social media posts and community engagement</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ➕ Create Post
              </button>
              <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                📊 Analytics
              </button>
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
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="🔍 Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {platforms.map((platform) => (
                      <option key={platform.id} value={platform.id} className="bg-black text-white">
                        {platform.icon} {platform.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="all" className="bg-black text-white">📋 All Status</option>
                    <option value="published" className="bg-black text-white">✅ Published</option>
                    <option value="scheduled" className="bg-black text-white">⏰ Scheduled</option>
                    <option value="draft" className="bg-black text-white">📝 Draft</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300">
                    📅 Calendar
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:from-green-500 hover:to-green-400 transition-all duration-300">
                    📤 Bulk Actions
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getPlatformColor(post.platform)} rounded-full flex items-center justify-center text-white text-lg`}>
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{post.title}</h3>
                          <div className="text-sm text-zinc-400 capitalize">{post.platform}</div>
                        </div>
                      </div>
                      {getStatusBadge(post.status)}
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mb-4">
                        <div className="grid grid-cols-2 gap-2">
                          {post.images.slice(0, 2).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Post image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-zinc-600"
                            />
                          ))}
                          {post.images.length > 2 && (
                            <div className="bg-black/50 rounded-lg flex items-center justify-center text-zinc-400 text-sm">
                              +{post.images.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Hashtags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.slice(0, 3).map((hashtag, index) => (
                          <span key={index} className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/30">
                            {hashtag}
                          </span>
                        ))}
                        {post.hashtags.length > 3 && (
                          <span className="bg-zinc-600/20 text-zinc-400 px-2 py-1 rounded text-xs border border-zinc-500/30">
                            +{post.hashtags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Engagement Stats */}
                    {post.engagement && (
                      <div className="mb-4 grid grid-cols-4 gap-3">
                        <div className="bg-black/30 border border-zinc-700 rounded-lg p-2 text-center">
                          <div className="text-pink-400 font-semibold text-sm">{post.engagement.likes}</div>
                          <div className="text-xs text-zinc-500">❤️ Likes</div>
                        </div>
                        <div className="bg-black/30 border border-zinc-700 rounded-lg p-2 text-center">
                          <div className="text-blue-400 font-semibold text-sm">{post.engagement.comments}</div>
                          <div className="text-xs text-zinc-500">💬 Comments</div>
                        </div>
                        <div className="bg-black/30 border border-zinc-700 rounded-lg p-2 text-center">
                          <div className="text-green-400 font-semibold text-sm">{post.engagement.shares}</div>
                          <div className="text-xs text-zinc-500">📤 Shares</div>
                        </div>
                        <div className="bg-black/30 border border-zinc-700 rounded-lg p-2 text-center">
                          <div className="text-purple-400 font-semibold text-sm">{post.engagement.views}</div>
                          <div className="text-xs text-zinc-500">👁️ Views</div>
                        </div>
                      </div>
                    )}

                    {/* Scheduled Date */}
                    <div className="mb-4">
                      <div className="text-xs text-zinc-500">
                        {post.status === 'scheduled' && (
                          <>⏰ Scheduled: {new Date(post.scheduledDate).toLocaleString()}</>
                        )}
                        {post.status === 'published' && (
                          <>📅 Published: {new Date(post.publishedDate).toLocaleString()}</>
                        )}
                        {post.status === 'draft' && (
                          <>📝 Draft created: {new Date(post.scheduledDate).toLocaleDateString()}</>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        🗑️ Delete
                      </button>
                      {post.status === 'draft' && (
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-500 hover:to-green-400 transition-all duration-300 flex items-center justify-center gap-1">
                          📤 Publish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banners' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Join Us Banners</h2>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-2">
                  ➕ Add Banner
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {joinUsBanners.map((banner) => (
                  <div key={banner.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-white">{banner.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          banner.isActive 
                            ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-600/20 text-red-400 border border-red-500/30'
                        }`}>
                          {banner.isActive ? '✅ Active' : '❌ Inactive'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-zinc-400 mb-2">{banner.subtitle}</p>
                      <p className="text-xs text-zinc-500 mb-4">{banner.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                          <div className="text-blue-400 font-semibold text-sm">{banner.clicks}</div>
                          <div className="text-xs text-zinc-500">👆 Clicks</div>
                        </div>
                        <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                          <div className="text-green-400 font-semibold text-sm">{banner.conversions}</div>
                          <div className="text-xs text-zinc-500">✅ Conversions</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300">
                          ✏️ Edit
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300">
                          🗑️ Delete
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
              <h2 className="text-2xl font-bold text-white mb-6">Social Media Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Total Posts</div>
                  <div className="text-2xl font-bold text-blue-400">{socialPosts.length}</div>
                  <div className="text-xs text-zinc-500">📱 All platforms</div>
                </div>
                
                <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Total Engagement</div>
                  <div className="text-2xl font-bold text-green-400">
                    {socialPosts.reduce((sum, post) => sum + (post.engagement?.likes || 0), 0)}
                  </div>
                  <div className="text-xs text-zinc-500">❤️ Likes across all posts</div>
                </div>
                
                <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Scheduled Posts</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {socialPosts.filter(post => post.status === 'scheduled').length}
                  </div>
                  <div className="text-xs text-zinc-500">⏰ Upcoming posts</div>
                </div>
                
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Draft Posts</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {socialPosts.filter(post => post.status === 'draft').length}
                  </div>
                  <div className="text-xs text-zinc-500">📝 Drafts ready</div>
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
              <h2 className="text-2xl font-bold text-white mb-6">Social Media Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Platform Connections</h3>
                  <div className="space-y-3">
                    {platforms.slice(1).map((platform) => (
                      <div key={platform.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{platform.icon}</span>
                          <div>
                            <div className="font-medium text-white">{platform.label}</div>
                            <div className="text-sm text-zinc-400">Connected</div>
                          </div>
                        </div>
                        <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300">
                          Disconnect
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Auto-Posting Settings</h3>
                  <div className="space-y-3">
                    <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Enable Auto-Posting</span>
                        <button className="bg-green-600 w-12 h-6 rounded-full relative">
                          <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Cross-Platform Posting</span>
                        <button className="bg-zinc-600 w-12 h-6 rounded-full relative">
                          <div className="bg-white w-5 h-5 rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Post Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {isEditMode ? 'Edit Post' : 'Create New Post'}
                  </h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📝 Post creation/editing form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    {isEditMode ? '💾 Update' : '📤 Create'}
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

export default JoinUsControl;
