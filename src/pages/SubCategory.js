import React, { useState, useCallback, useMemo } from 'react';

/**
 * SubCategory Component - Modern Black & White Theme
 * 
 * Comprehensive subcategory management interface featuring:
 * - Hierarchical category and subcategory organization
 * - Advanced filtering and search capabilities
 * - Drag-and-drop subcategory reordering
 * - Bulk operations and mass management
 * - Image gallery management for subcategories
 * - SEO-friendly URL management
 * - Performance analytics and insights
 * - Product count tracking per subcategory
 */
const SubCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Memoized categories data
  const categories = useMemo(() => [
    { id: 'all', name: 'All Categories', icon: '📁' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'accessories', name: 'Accessories', icon: '👜' },
    { id: 'footwear', name: 'Footwear', icon: '👟' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'home', name: 'Home & Living', icon: '🏠' }
  ], []);

  // Memoized subcategories data with comprehensive information
  const subCategories = useMemo(() => [
    {
      id: 1,
      name: 'Premium T-Shirts',
      slug: 'premium-t-shirts',
      category: 'clothing',
      description: 'High-quality premium cotton t-shirts for everyday comfort',
      image: '/api/placeholder/300/300',
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
      productCount: 45,
      status: 'active',
      featured: true,
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      seoTitle: 'Premium Cotton T-Shirts | YORAA',
      seoDescription: 'Shop our collection of premium cotton t-shirts',
      tags: ['premium', 'cotton', 'comfort'],
      sortOrder: 1,
      revenue: 125000,
      viewCount: 5420,
      conversionRate: 3.2
    },
    {
      id: 2,
      name: 'Casual Jeans',
      slug: 'casual-jeans',
      category: 'clothing',
      description: 'Comfortable and stylish casual jeans for all occasions',
      image: '/api/placeholder/300/300',
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      productCount: 32,
      status: 'active',
      featured: false,
      createdDate: '2024-01-12',
      lastModified: '2024-01-16',
      seoTitle: 'Casual Jeans Collection | YORAA',
      seoDescription: 'Discover our comfortable casual jeans collection',
      tags: ['casual', 'denim', 'comfort'],
      sortOrder: 2,
      revenue: 98000,
      viewCount: 3240,
      conversionRate: 2.8
    },
    {
      id: 3,
      name: 'Designer Handbags',
      slug: 'designer-handbags',
      category: 'accessories',
      description: 'Elegant designer handbags for the modern woman',
      image: '/api/placeholder/300/300',
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
      productCount: 28,
      status: 'active',
      featured: true,
      createdDate: '2024-01-08',
      lastModified: '2024-01-19',
      seoTitle: 'Designer Handbags | YORAA',
      seoDescription: 'Luxury designer handbags and purses',
      tags: ['designer', 'luxury', 'handbags'],
      sortOrder: 1,
      revenue: 245000,
      viewCount: 7890,
      conversionRate: 4.1
    },
    {
      id: 4,
      name: 'Sports Shoes',
      slug: 'sports-shoes',
      category: 'footwear',
      description: 'High-performance sports shoes for athletes',
      image: '/api/placeholder/300/300',
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
      productCount: 56,
      status: 'active',
      featured: false,
      createdDate: '2024-01-05',
      lastModified: '2024-01-15',
      seoTitle: 'Sports Shoes & Athletic Footwear | YORAA',
      seoDescription: 'Professional sports shoes for all activities',
      tags: ['sports', 'athletic', 'performance'],
      sortOrder: 1,
      revenue: 187000,
      viewCount: 6234,
      conversionRate: 3.5
    },
    {
      id: 5,
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      category: 'electronics',
      description: 'Premium wireless headphones with noise cancellation',
      image: '/api/placeholder/300/300',
      images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
      productCount: 19,
      status: 'draft',
      featured: true,
      createdDate: '2024-01-20',
      lastModified: '2024-01-20',
      seoTitle: 'Wireless Headphones | YORAA',
      seoDescription: 'High-quality wireless headphones and earbuds',
      tags: ['wireless', 'audio', 'premium'],
      sortOrder: 1,
      revenue: 156000,
      viewCount: 4567,
      conversionRate: 2.9
    },
    {
      id: 6,
      name: 'Home Decor',
      slug: 'home-decor',
      category: 'home',
      description: 'Beautiful home decoration items and accessories',
      image: '/api/placeholder/300/300',
      images: ['/api/placeholder/300/300'],
      productCount: 73,
      status: 'active',
      featured: false,
      createdDate: '2024-01-14',
      lastModified: '2024-01-17',
      seoTitle: 'Home Decor & Accessories | YORAA',
      seoDescription: 'Stylish home decoration items and accessories',
      tags: ['home', 'decor', 'accessories'],
      sortOrder: 2,
      revenue: 89000,
      viewCount: 2890,
      conversionRate: 2.1
    }
  ], []);

  // Filter and sort subcategories
  const filteredSubCategories = useMemo(() => {
    let filtered = subCategories.filter(sub => {
      const matchesCategory = selectedCategory === 'all' || sub.category === selectedCategory;
      const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sub.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort subcategories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'products':
          return b.productCount - a.productCount;
        case 'revenue':
          return b.revenue - a.revenue;
        case 'date':
          return new Date(b.createdDate) - new Date(a.createdDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [subCategories, selectedCategory, searchTerm, sortBy]);

  const handleCreateSubCategory = useCallback(() => {
    setEditingSubCategory(null);
    setIsCreateModalOpen(true);
  }, []);

  const handleEditSubCategory = useCallback((subCategory) => {
    setEditingSubCategory(subCategory);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteSubCategory = useCallback((subCategoryId) => {
    console.log('Deleting subcategory:', subCategoryId);
    setIsDeleteModalOpen(false);
    // In real app, would make API call
  }, []);

  const handleBulkDelete = useCallback(() => {
    console.log('Bulk deleting subcategories:', selectedSubCategories);
    setSelectedSubCategories([]);
    // In real app, would make API call
  }, [selectedSubCategories]);

  const toggleSubCategorySelection = useCallback((subCategoryId) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategoryId)
        ? prev.filter(id => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  }, []);

  const selectAllSubCategories = useCallback(() => {
    if (selectedSubCategories.length === filteredSubCategories.length) {
      setSelectedSubCategories([]);
    } else {
      setSelectedSubCategories(filteredSubCategories.map(sub => sub.id));
    }
  }, [selectedSubCategories.length, filteredSubCategories]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      active: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      draft: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '📝' },
      inactive: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '❌' }
    };
    
    const style = styles[status] || styles.draft;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getCategoryName = useCallback((categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }, [categories]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
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
                SubCategory Management
              </h1>
              <p className="text-zinc-400">Organize and manage product subcategories</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateSubCategory}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ➕ Add SubCategory
              </button>
              {selectedSubCategories.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  🗑️ Delete ({selectedSubCategories.length})
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
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search subcategories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                    <option value="name" className="bg-black text-white">📝 Name</option>
                    <option value="products" className="bg-black text-white">📦 Products</option>
                    <option value="revenue" className="bg-black text-white">💰 Revenue</option>
                    <option value="date" className="bg-black text-white">📅 Date</option>
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
                    onClick={selectAllSubCategories}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                  >
                    {selectedSubCategories.length === filteredSubCategories.length ? '❌ Deselect All' : '✅ Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{subCategories.length}</div>
                  <div className="text-sm text-zinc-400">Total SubCategories</div>
                  <div className="text-xs text-zinc-500 mt-1">📁 All categories</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {subCategories.filter(sub => sub.status === 'active').length}
                  </div>
                  <div className="text-sm text-zinc-400">Active SubCategories</div>
                  <div className="text-xs text-zinc-500 mt-1">✅ Live categories</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {subCategories.reduce((sum, sub) => sum + sub.productCount, 0)}
                  </div>
                  <div className="text-sm text-zinc-400">Total Products</div>
                  <div className="text-xs text-zinc-500 mt-1">📦 All subcategories</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    ₹{(subCategories.reduce((sum, sub) => sum + sub.revenue, 0) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-zinc-400">Total Revenue</div>
                  <div className="text-xs text-zinc-500 mt-1">💰 All subcategories</div>
                </div>
              </div>
            </div>

            {/* SubCategories Grid/List */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    SubCategories ({filteredSubCategories.length})
                  </h2>
                  
                  {selectedSubCategories.length > 0 && (
                    <div className="text-sm text-blue-400">
                      {selectedSubCategories.length} selected
                    </div>
                  )}
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubCategories.map((subCategory) => (
                      <div key={subCategory.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                        <div className="relative">
                          <img
                            src={subCategory.image}
                            alt={subCategory.name}
                            className="w-full h-48 object-cover"
                          />
                          
                          {/* Selection Checkbox */}
                          <div className="absolute top-3 left-3">
                            <input
                              type="checkbox"
                              checked={selectedSubCategories.includes(subCategory.id)}
                              onChange={() => toggleSubCategorySelection(subCategory.id)}
                              className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          
                          {/* Featured Badge */}
                          {subCategory.featured && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                ⭐ Featured
                              </span>
                            </div>
                          )}
                          
                          {/* Status Badge */}
                          <div className="absolute bottom-3 left-3">
                            {getStatusBadge(subCategory.status)}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-white">{subCategory.name}</h3>
                            <span className="text-sm text-zinc-400">
                              {getCategoryName(subCategory.category)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                            {subCategory.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                              <div className="text-blue-400 font-semibold text-sm">{subCategory.productCount}</div>
                              <div className="text-xs text-zinc-500">📦 Products</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-2">
                              <div className="text-green-400 font-semibold text-sm">₹{(subCategory.revenue / 1000).toFixed(0)}K</div>
                              <div className="text-xs text-zinc-500">💰 Revenue</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSubCategory(subCategory)}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setIsDeleteModalOpen(true)}
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
                    {filteredSubCategories.map((subCategory) => (
                      <div key={subCategory.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedSubCategories.includes(subCategory.id)}
                            onChange={() => toggleSubCategorySelection(subCategory.id)}
                            className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          
                          <img
                            src={subCategory.image}
                            alt={subCategory.name}
                            className="w-16 h-16 object-cover rounded-lg border border-zinc-600"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-white">{subCategory.name}</h3>
                              {subCategory.featured && (
                                <span className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full text-xs font-medium">
                                  ⭐ Featured
                                </span>
                              )}
                              {getStatusBadge(subCategory.status)}
                            </div>
                            <p className="text-sm text-zinc-400 mb-2">{subCategory.description}</p>
                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                              <span>📁 {getCategoryName(subCategory.category)}</span>
                              <span>📦 {subCategory.productCount} products</span>
                              <span>💰 ₹{(subCategory.revenue / 1000).toFixed(0)}K revenue</span>
                              <span>👁️ {subCategory.viewCount} views</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSubCategory(subCategory)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-1"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => setIsDeleteModalOpen(true)}
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

                {filteredSubCategories.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📁</div>
                    <h3 className="text-xl font-bold text-white mb-2">No SubCategories Found</h3>
                    <p className="text-zinc-400 mb-6">No subcategories match your current filters.</p>
                    <button
                      onClick={handleCreateSubCategory}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      ➕ Create First SubCategory
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
              <h2 className="text-2xl font-bold text-white mb-6">SubCategory Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Top Performing</div>
                  <div className="text-2xl font-bold text-green-400 mb-1">Designer Handbags</div>
                  <div className="text-xs text-zinc-500">₹2.45L revenue</div>
                </div>
                
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Most Products</div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">Home Decor</div>
                  <div className="text-xs text-zinc-500">73 products</div>
                </div>
                
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                  <div className="text-sm text-zinc-400 mb-2">Best Conversion</div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">Designer Handbags</div>
                  <div className="text-xs text-zinc-500">4.1% conversion rate</div>
                </div>
              </div>
              
              <div className="text-center text-zinc-400 py-8">
                📊 Detailed analytics charts would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">SEO Management</h2>
              
              <div className="text-center text-zinc-400 py-8">
                🔍 SEO configuration interface would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">SubCategory Settings</h2>
              
              <div className="text-center text-zinc-400 py-8">
                ⚙️ Settings configuration would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Create New SubCategory</h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📝 SubCategory creation form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    ➕ Create SubCategory
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Edit SubCategory</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  ✏️ SubCategory editing form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    💾 Update SubCategory
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🗑️</div>
                <h3 className="text-2xl font-bold text-white mb-2">Delete SubCategory</h3>
                <p className="text-zinc-400">Are you sure you want to delete this subcategory?</p>
                <p className="text-zinc-500 text-sm mt-2">This action cannot be undone.</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteSubCategory(1)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 font-semibold"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategory;
