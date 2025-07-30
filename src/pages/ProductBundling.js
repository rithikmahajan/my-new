import React, { useState, useCallback, useMemo } from 'react';

/**
 * ProductBundling Component - Modern Black & White Theme
 * 
 * Comprehensive product bundling management interface featuring:
 * - Advanced bundle creation and configuration
 * - Product catalog integration
 * - Bundle pricing and discount strategies
 * - Inventory synchronization
 * - Bundle performance analytics
 * - Cross-sell and upsell optimization
 * - Bulk bundle operations
 * - A/B testing for bundle effectiveness
 */
const ProductBundling = () => {
  const [activeTab, setActiveTab] = useState('bundles');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState(null);
  const [selectedBundles, setSelectedBundles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('performance');
  const [viewMode, setViewMode] = useState('grid');

  // Memoized bundles data with comprehensive bundle information
  const bundles = useMemo(() => [
    {
      id: 1,
      name: 'Tech Essentials Bundle',
      description: 'Perfect starter pack for tech enthusiasts',
      status: 'active',
      category: 'electronics',
      bundleType: 'fixed',
      mainProduct: {
        id: 'PRD-001',
        name: 'iPhone 15 Pro',
        price: 999,
        image: '/api/placeholder/100/100'
      },
      bundleItems: [
        { id: 'PRD-002', name: 'AirPods Pro', price: 249, discount: 20, image: '/api/placeholder/80/80' },
        { id: 'PRD-003', name: 'MagSafe Charger', price: 39, discount: 15, image: '/api/placeholder/80/80' },
        { id: 'PRD-004', name: 'iPhone Case', price: 29, discount: 25, image: '/api/placeholder/80/80' }
      ],
      pricing: {
        originalPrice: 1316,
        bundlePrice: 1199,
        totalDiscount: 117,
        discountPercentage: 8.9,
        savings: 117
      },
      performance: {
        totalSales: 156,
        revenue: 187044,
        averageRating: 4.7,
        conversionRate: 23.4,
        viewsToSales: 12.8,
        customerSatisfaction: 92
      },
      inventory: {
        inStock: 45,
        reserved: 12,
        lowStockWarning: 10,
        restockDate: '2024-01-25'
      },
      analytics: {
        impressions: 8940,
        clicks: 2156,
        addToCarts: 672,
        checkouts: 345,
        completedPurchases: 156
      },
      seo: {
        slug: 'tech-essentials-bundle',
        metaTitle: 'Tech Essentials Bundle - iPhone 15 Pro + Accessories',
        metaDescription: 'Complete tech bundle with iPhone 15 Pro, AirPods Pro, and essential accessories at discounted price.'
      },
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-20',
      isPromoted: true,
      tags: ['bestseller', 'tech', 'starter-pack']
    },
    {
      id: 2,
      name: 'Home Office Setup',
      description: 'Everything you need for a productive workspace',
      status: 'active',
      category: 'office',
      bundleType: 'flexible',
      mainProduct: {
        id: 'PRD-005',
        name: 'MacBook Pro 14"',
        price: 1999,
        image: '/api/placeholder/100/100'
      },
      bundleItems: [
        { id: 'PRD-006', name: 'Magic Mouse', price: 79, discount: 10, image: '/api/placeholder/80/80' },
        { id: 'PRD-007', name: 'USB-C Hub', price: 69, discount: 15, image: '/api/placeholder/80/80' },
        { id: 'PRD-008', name: 'Laptop Stand', price: 49, discount: 20, image: '/api/placeholder/80/80' },
        { id: 'PRD-009', name: 'Wireless Keyboard', price: 99, discount: 12, image: '/api/placeholder/80/80' }
      ],
      pricing: {
        originalPrice: 2295,
        bundlePrice: 2099,
        totalDiscount: 196,
        discountPercentage: 8.5,
        savings: 196
      },
      performance: {
        totalSales: 89,
        revenue: 186811,
        averageRating: 4.8,
        conversionRate: 18.7,
        viewsToSales: 14.2,
        customerSatisfaction: 95
      },
      inventory: {
        inStock: 23,
        reserved: 8,
        lowStockWarning: 10,
        restockDate: '2024-01-28'
      },
      analytics: {
        impressions: 6720,
        clicks: 1456,
        addToCarts: 456,
        checkouts: 234,
        completedPurchases: 89
      },
      seo: {
        slug: 'home-office-setup-bundle',
        metaTitle: 'Home Office Setup Bundle - MacBook Pro + Accessories',
        metaDescription: 'Complete home office bundle with MacBook Pro and productivity accessories.'
      },
      createdDate: '2024-01-08',
      lastUpdated: '2024-01-19',
      isPromoted: false,
      tags: ['productivity', 'office', 'professional']
    },
    {
      id: 3,
      name: 'Fitness Starter Pack',
      description: 'Get started on your fitness journey',
      status: 'draft',
      category: 'fitness',
      bundleType: 'fixed',
      mainProduct: {
        id: 'PRD-010',
        name: 'Smart Fitness Watch',
        price: 299,
        image: '/api/placeholder/100/100'
      },
      bundleItems: [
        { id: 'PRD-011', name: 'Resistance Bands Set', price: 25, discount: 20, image: '/api/placeholder/80/80' },
        { id: 'PRD-012', name: 'Yoga Mat', price: 35, discount: 15, image: '/api/placeholder/80/80' },
        { id: 'PRD-013', name: 'Water Bottle', price: 15, discount: 25, image: '/api/placeholder/80/80' }
      ],
      pricing: {
        originalPrice: 374,
        bundlePrice: 329,
        totalDiscount: 45,
        discountPercentage: 12.0,
        savings: 45
      },
      performance: {
        totalSales: 0,
        revenue: 0,
        averageRating: 0,
        conversionRate: 0,
        viewsToSales: 0,
        customerSatisfaction: 0
      },
      inventory: {
        inStock: 50,
        reserved: 0,
        lowStockWarning: 10,
        restockDate: null
      },
      analytics: {
        impressions: 0,
        clicks: 0,
        addToCarts: 0,
        checkouts: 0,
        completedPurchases: 0
      },
      seo: {
        slug: 'fitness-starter-pack-bundle',
        metaTitle: 'Fitness Starter Pack - Smart Watch + Equipment',
        metaDescription: 'Complete fitness bundle with smart watch and essential workout equipment.'
      },
      createdDate: '2024-01-15',
      lastUpdated: '2024-01-15',
      isPromoted: false,
      tags: ['fitness', 'health', 'beginner']
    },
    {
      id: 4,
      name: 'Gaming Pro Bundle',
      description: 'Ultimate gaming experience package',
      status: 'active',
      category: 'gaming',
      bundleType: 'tiered',
      mainProduct: {
        id: 'PRD-014',
        name: 'Gaming Console',
        price: 499,
        image: '/api/placeholder/100/100'
      },
      bundleItems: [
        { id: 'PRD-015', name: 'Wireless Controller', price: 69, discount: 15, image: '/api/placeholder/80/80' },
        { id: 'PRD-016', name: 'Gaming Headset', price: 89, discount: 20, image: '/api/placeholder/80/80' },
        { id: 'PRD-017', name: 'Game Title A', price: 59, discount: 10, image: '/api/placeholder/80/80' },
        { id: 'PRD-018', name: 'Game Title B', price: 59, discount: 10, image: '/api/placeholder/80/80' }
      ],
      pricing: {
        originalPrice: 775,
        bundlePrice: 699,
        totalDiscount: 76,
        discountPercentage: 9.8,
        savings: 76
      },
      performance: {
        totalSales: 234,
        revenue: 163566,
        averageRating: 4.6,
        conversionRate: 28.9,
        viewsToSales: 11.2,
        customerSatisfaction: 89
      },
      inventory: {
        inStock: 18,
        reserved: 15,
        lowStockWarning: 20,
        restockDate: '2024-01-30'
      },
      analytics: {
        impressions: 12456,
        clicks: 3234,
        addToCarts: 892,
        checkouts: 456,
        completedPurchases: 234
      },
      seo: {
        slug: 'gaming-pro-bundle',
        metaTitle: 'Gaming Pro Bundle - Console + Accessories + Games',
        metaDescription: 'Ultimate gaming bundle with console, accessories, and popular game titles.'
      },
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-21',
      isPromoted: true,
      tags: ['gaming', 'entertainment', 'popular']
    },
    {
      id: 5,
      name: 'Photography Kit',
      description: 'Professional photography essentials',
      status: 'inactive',
      category: 'photography',
      bundleType: 'fixed',
      mainProduct: {
        id: 'PRD-019',
        name: 'DSLR Camera',
        price: 899,
        image: '/api/placeholder/100/100'
      },
      bundleItems: [
        { id: 'PRD-020', name: 'Telephoto Lens', price: 399, discount: 10, image: '/api/placeholder/80/80' },
        { id: 'PRD-021', name: 'Camera Bag', price: 79, discount: 15, image: '/api/placeholder/80/80' },
        { id: 'PRD-022', name: 'Tripod', price: 129, discount: 20, image: '/api/placeholder/80/80' }
      ],
      pricing: {
        originalPrice: 1506,
        bundlePrice: 1399,
        totalDiscount: 107,
        discountPercentage: 7.1,
        savings: 107
      },
      performance: {
        totalSales: 45,
        revenue: 62955,
        averageRating: 4.9,
        conversionRate: 15.2,
        viewsToSales: 16.8,
        customerSatisfaction: 97
      },
      inventory: {
        inStock: 8,
        reserved: 2,
        lowStockWarning: 5,
        restockDate: '2024-02-05'
      },
      analytics: {
        impressions: 3456,
        clicks: 892,
        addToCarts: 234,
        checkouts: 123,
        completedPurchases: 45
      },
      seo: {
        slug: 'photography-kit-bundle',
        metaTitle: 'Photography Kit Bundle - DSLR + Lenses + Accessories',
        metaDescription: 'Professional photography bundle with DSLR camera and essential equipment.'
      },
      createdDate: '2024-01-12',
      lastUpdated: '2024-01-18',
      isPromoted: false,
      tags: ['photography', 'professional', 'creative']
    }
  ], []);

  // Memoized categories
  const categories = useMemo(() => [
    { id: 'all', name: 'All Categories', icon: '📦' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'office', name: 'Office', icon: '💼' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'photography', name: 'Photography', icon: '📸' }
  ], []);

  // Filter bundles based on search, status, category, and sorting
  const filteredBundles = useMemo(() => {
    let filtered = bundles.filter(bundle => {
      const matchesSearch = bundle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bundle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bundle.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || bundle.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || bundle.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort bundles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'revenue':
          return b.performance.revenue - a.performance.revenue;
        case 'performance':
          return b.performance.conversionRate - a.performance.conversionRate;
        case 'created':
          return new Date(b.createdDate) - new Date(a.createdDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bundles, searchTerm, statusFilter, categoryFilter, sortBy]);

  const handleCreateBundle = useCallback(() => {
    setEditingBundle(null);
    setIsCreateModalOpen(true);
  }, []);

  const handleEditBundle = useCallback((bundle) => {
    setEditingBundle(bundle);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteBundle = useCallback((bundleId) => {
    console.log('Deleting bundle:', bundleId);
    // In real app, would make API call
  }, []);

  const handleBulkAction = useCallback((action) => {
    console.log(`Bulk ${action} for bundles:`, selectedBundles);
    setSelectedBundles([]);
    // In real app, would make API call
  }, [selectedBundles]);

  const toggleBundleSelection = useCallback((bundleId) => {
    setSelectedBundles(prev => 
      prev.includes(bundleId)
        ? prev.filter(id => id !== bundleId)
        : [...prev, bundleId]
    );
  }, []);

  const selectAllBundles = useCallback(() => {
    if (selectedBundles.length === filteredBundles.length) {
      setSelectedBundles([]);
    } else {
      setSelectedBundles(filteredBundles.map(bundle => bundle.id));
    }
  }, [selectedBundles.length, filteredBundles]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      active: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      draft: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '📝' },
      inactive: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '😴' }
    };
    
    const style = styles[status] || styles.draft;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getBundleTypeBadge = useCallback((type) => {
    const styles = {
      fixed: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '📦' },
      flexible: { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-500/30', icon: '🔄' },
      tiered: { bg: 'bg-indigo-600/20', text: 'text-indigo-400', border: 'border-indigo-500/30', icon: '🏆' }
    };
    
    const style = styles[type] || styles.fixed;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  }, []);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);

  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat().format(num);
  }, []);

  const tabs = [
    { id: 'bundles', label: 'Bundles', icon: '📦' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'templates', label: 'Templates', icon: '📄' },
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
                Product Bundling
              </h1>
              <p className="text-zinc-400">Create and manage product bundles to increase sales</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateBundle}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📦 Create Bundle
              </button>
              {selectedBundles.length > 0 && (
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  ✅ Bulk Actions ({selectedBundles.length})
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
        {activeTab === 'bundles' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search bundles..."
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
                    <option value="inactive" className="bg-black text-white">😴 Inactive</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-black text-white">
                        {category.icon} {category.name}
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
                    <option value="performance" className="bg-black text-white">📊 Performance</option>
                    <option value="name" className="bg-black text-white">📝 Name</option>
                    <option value="revenue" className="bg-black text-white">💰 Revenue</option>
                    <option value="created" className="bg-black text-white">📅 Created</option>
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
                    onClick={selectAllBundles}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                  >
                    {selectedBundles.length === filteredBundles.length ? '❌ Deselect All' : '✅ Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{bundles.length}</div>
                  <div className="text-sm text-zinc-400">Total Bundles</div>
                  <div className="text-xs text-zinc-500 mt-1">📦 All bundles</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {bundles.filter(b => b.status === 'active').length}
                  </div>
                  <div className="text-sm text-zinc-400">Active Bundles</div>
                  <div className="text-xs text-zinc-500 mt-1">✅ Currently selling</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {formatCurrency(bundles.reduce((sum, b) => sum + b.performance.revenue, 0))}
                  </div>
                  <div className="text-sm text-zinc-400">Total Revenue</div>
                  <div className="text-xs text-zinc-500 mt-1">💰 From bundles</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {(bundles.reduce((sum, b) => sum + b.performance.conversionRate, 0) / bundles.filter(b => b.performance.conversionRate > 0).length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-zinc-400">Avg. Conversion</div>
                  <div className="text-xs text-zinc-500 mt-1">📈 Bundle performance</div>
                </div>
              </div>
            </div>

            {/* Bundles Grid/List */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Bundles ({filteredBundles.length})
                  </h2>
                  
                  {selectedBundles.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400">{selectedBundles.length} selected</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBulkAction('activate')}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors"
                        >
                          ✅ Activate
                        </button>
                        <button
                          onClick={() => handleBulkAction('deactivate')}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition-colors"
                        >
                          😴 Deactivate
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredBundles.map((bundle) => (
                      <div key={bundle.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <input
                              type="checkbox"
                              checked={selectedBundles.includes(bundle.id)}
                              onChange={() => toggleBundleSelection(bundle.id)}
                              className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex items-center gap-2">
                              {getStatusBadge(bundle.status)}
                              {getBundleTypeBadge(bundle.bundleType)}
                            </div>
                          </div>

                          {/* Bundle Info */}
                          <div className="mb-4">
                            <h3 className="font-bold text-white text-lg mb-2">{bundle.name}</h3>
                            <p className="text-sm text-zinc-400 mb-3">{bundle.description}</p>
                            
                            {/* Main Product */}
                            <div className="flex items-center gap-3 mb-3 p-3 bg-black/50 border border-zinc-700 rounded-lg">
                              <img
                                src={bundle.mainProduct.image}
                                alt={bundle.mainProduct.name}
                                className="w-12 h-12 rounded-lg border border-zinc-600 object-cover"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-white text-sm">{bundle.mainProduct.name}</div>
                                <div className="text-xs text-zinc-400">{formatCurrency(bundle.mainProduct.price)}</div>
                              </div>
                            </div>
                          </div>

                          {/* Bundle Items Preview */}
                          <div className="mb-4">
                            <div className="text-xs text-zinc-400 mb-2">Bundle Items ({bundle.bundleItems.length})</div>
                            <div className="flex gap-1 overflow-x-auto pb-2">
                              {bundle.bundleItems.slice(0, 4).map((item, index) => (
                                <img
                                  key={index}
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg border border-zinc-600 object-cover flex-shrink-0"
                                />
                              ))}
                              {bundle.bundleItems.length > 4 && (
                                <div className="w-10 h-10 bg-black/50 border border-zinc-600 rounded-lg flex items-center justify-center text-xs text-zinc-400">
                                  +{bundle.bundleItems.length - 4}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-green-400 font-semibold text-sm">{formatCurrency(bundle.pricing.bundlePrice)}</div>
                              <div className="text-xs text-zinc-500">💰 Bundle Price</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-red-400 font-semibold text-sm">{bundle.pricing.discountPercentage.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">🎯 Discount</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-blue-400 font-semibold text-sm">{formatNumber(bundle.performance.totalSales)}</div>
                              <div className="text-xs text-zinc-500">📦 Sales</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-purple-400 font-semibold text-sm">{bundle.performance.conversionRate.toFixed(1)}%</div>
                              <div className="text-xs text-zinc-500">📈 Conversion</div>
                            </div>
                          </div>

                          {/* Tags */}
                          {bundle.tags.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1">
                                {bundle.tags.slice(0, 3).map((tag, index) => (
                                  <span key={index} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded-full">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBundle(bundle)}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBundle(bundle.id)}
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
                    {filteredBundles.map((bundle) => (
                      <div key={bundle.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedBundles.includes(bundle.id)}
                            onChange={() => toggleBundleSelection(bundle.id)}
                            className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          
                          <img
                            src={bundle.mainProduct.image}
                            alt={bundle.mainProduct.name}
                            className="w-16 h-16 rounded-lg border border-zinc-600 object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-white text-lg">{bundle.name}</h3>
                              {getBundleTypeBadge(bundle.bundleType)}
                              {getStatusBadge(bundle.status)}
                              {bundle.isPromoted && (
                                <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                                  ⭐ Promoted
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-zinc-400 mb-1">{bundle.description}</p>
                            <div className="flex items-center gap-6 text-sm text-zinc-500">
                              <span>💰 {formatCurrency(bundle.pricing.bundlePrice)}</span>
                              <span>📦 {formatNumber(bundle.performance.totalSales)} sales</span>
                              <span>📈 {bundle.performance.conversionRate.toFixed(1)}% conversion</span>
                              <span>🎯 {bundle.pricing.discountPercentage.toFixed(1)}% discount</span>
                              <span>📅 {new Date(bundle.createdDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBundle(bundle)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-1"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBundle(bundle.id)}
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

                {filteredBundles.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Bundles Found</h3>
                    <p className="text-zinc-400 mb-6">No bundles match your current filters.</p>
                    <button
                      onClick={handleCreateBundle}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      📦 Create First Bundle
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
              <h2 className="text-2xl font-bold text-white mb-6">Bundle Analytics</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📊 Bundle performance analytics would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Bundle Templates</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📄 Bundle templates management would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Bundle Automation</h2>
              
              <div className="text-center text-zinc-400 py-8">
                🤖 Bundle automation rules would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Bundle Settings</h2>
              
              <div className="text-center text-zinc-400 py-8">
                ⚙️ Bundle system settings would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Create Bundle Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Create New Bundle</h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📦 Bundle creation form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    📦 Create Bundle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Bundle Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Edit Bundle</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  ✏️ Bundle editing form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    💾 Update Bundle
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

export default ProductBundling;
