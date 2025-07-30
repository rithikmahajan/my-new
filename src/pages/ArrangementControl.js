import React, { useState, useCallback, useMemo } from 'react';

/**
 * ArrangementControl Component - Modern Black & White Theme
 * 
 * Comprehensive arrangement and layout control interface featuring:
 * - Category and subcategory organization
 * - Item arrangement and ordering
 * - Multiple view modes (grid, list, tile)
 * - Drag and drop functionality
 * - Preview capabilities
 * - Bulk operations
 */
const ArrangementControl = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('My');
  const [currentView, setCurrentView] = useState('View 1');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Sample data structure for categories and items
  const categories = useMemo(() => [
    { id: 1, name: 'Category', subcategories: ['sub category', 'Sports Apparel', 'Footwear'] },
    { id: 2, name: 'Sports', subcategories: ['Running', 'Soccer', 'Tennis', 'Golf'] },
    { id: 3, name: 'Accessories', subcategories: ['Bags', 'Watches', 'Equipment'] },
    { id: 4, name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Tablets', 'Audio'] },
    { id: 5, name: 'Home & Garden', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] }
  ], []);

  const [arrangementItems, setArrangementItems] = useState([
    {
      id: 1,
      title: 'Premium Running Shoes Collection',
      description: 'High-performance running shoes for all terrains',
      image: '/api/placeholder/120/120',
      category: 'Sports',
      subcategory: 'Running',
      order: 1,
      visibility: 'visible',
      featured: true
    },
    {
      id: 2,
      title: 'Professional Soccer Equipment',
      description: 'Complete soccer gear for professional players',
      image: '/api/placeholder/120/120',
      category: 'Sports',
      subcategory: 'Soccer',
      order: 2,
      visibility: 'visible',
      featured: false
    },
    {
      id: 3,
      title: 'Tennis Racket Pro Series',
      description: 'Professional grade tennis rackets and accessories',
      image: '/api/placeholder/120/120',
      category: 'Sports',
      subcategory: 'Tennis',
      order: 3,
      visibility: 'visible',
      featured: true
    },
    {
      id: 4,
      title: 'Golf Club Premium Set',
      description: 'Complete golf club set for professionals',
      image: '/api/placeholder/120/120',
      category: 'Sports',
      subcategory: 'Golf',
      order: 4,
      visibility: 'hidden',
      featured: false
    },
    {
      id: 5,
      title: 'Designer Sports Bags',
      description: 'Stylish and functional sports bags collection',
      image: '/api/placeholder/120/120',
      category: 'Accessories',
      subcategory: 'Bags',
      order: 5,
      visibility: 'visible',
      featured: true
    },
    {
      id: 6,
      title: 'Smart Fitness Watches',
      description: 'Advanced fitness tracking smartwatches',
      image: '/api/placeholder/120/120',
      category: 'Accessories',
      subcategory: 'Watches',
      order: 6,
      visibility: 'visible',
      featured: false
    }
  ]);

  // Filter items based on selections and search
  const filteredItems = useMemo(() => {
    return arrangementItems.filter(item => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || item.subcategory === selectedSubcategory;
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSubcategory && matchesSearch;
    }).sort((a, b) => a.order - b.order);
  }, [arrangementItems, selectedCategory, selectedSubcategory, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = arrangementItems.length;
    const visible = arrangementItems.filter(item => item.visibility === 'visible').length;
    const hidden = arrangementItems.filter(item => item.visibility === 'hidden').length;
    const featured = arrangementItems.filter(item => item.featured).length;
    
    return { total, visible, hidden, featured };
  }, [arrangementItems]);

  const handleMoveItem = useCallback((itemId, direction) => {
    setArrangementItems(prev => {
      const items = [...prev];
      const itemIndex = items.findIndex(item => item.id === itemId);
      
      if (direction === 'up' && itemIndex > 0) {
        [items[itemIndex], items[itemIndex - 1]] = [items[itemIndex - 1], items[itemIndex]];
        items[itemIndex].order = itemIndex + 1;
        items[itemIndex - 1].order = itemIndex;
      } else if (direction === 'down' && itemIndex < items.length - 1) {
        [items[itemIndex], items[itemIndex + 1]] = [items[itemIndex + 1], items[itemIndex]];
        items[itemIndex].order = itemIndex + 1;
        items[itemIndex + 1].order = itemIndex + 2;
      }
      
      return items;
    });
  }, []);

  const handleToggleVisibility = useCallback((itemId) => {
    setArrangementItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, visibility: item.visibility === 'visible' ? 'hidden' : 'visible' }
          : item
      )
    );
  }, []);

  const handleToggleFeatured = useCallback((itemId) => {
    setArrangementItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, featured: !item.featured }
          : item
      )
    );
  }, []);

  const getSelectedSubcategories = useCallback(() => {
    if (!selectedCategory) return [];
    const category = categories.find(cat => cat.name === selectedCategory);
    return category ? category.subcategories : [];
  }, [selectedCategory, categories]);

  const ViewModeButton = ({ mode, icon, label }) => (
    <button
      onClick={() => setViewMode(mode)}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
        viewMode === mode
          ? 'bg-white text-black shadow-lg'
          : 'bg-black/30 text-zinc-300 hover:bg-black/40 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );

  const ItemCard = ({ item }) => (
    <div className={`bg-black/30 border border-zinc-700 rounded-xl p-4 hover:bg-black/40 transition-all duration-300 ${
      item.visibility === 'hidden' ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-4">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-16 h-16 rounded-lg object-cover border border-zinc-600"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {item.featured && (
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-500/30">
                  ⭐ Featured
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.visibility === 'visible' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {item.visibility === 'visible' ? '👁️ Visible' : '🚫 Hidden'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-400">
              {item.category} › {item.subcategory} • Order: {item.order}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleMoveItem(item.id, 'up')}
                className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-500/30"
                title="Move Up"
              >
                ⬆️
              </button>
              <button
                onClick={() => handleMoveItem(item.id, 'down')}
                className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-500/30"
                title="Move Down"
              >
                ⬇️
              </button>
              <button
                onClick={() => handleToggleVisibility(item.id)}
                className="p-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors border border-purple-500/30"
                title="Toggle Visibility"
              >
                {item.visibility === 'visible' ? '👁️' : '🚫'}
              </button>
              <button
                onClick={() => handleToggleFeatured(item.id)}
                className="p-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-colors border border-yellow-500/30"
                title="Toggle Featured"
              >
                {item.featured ? '⭐' : '☆'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                ⚙️ Arrangement Control
              </h1>
              <p className="text-zinc-300 mt-2">Organize and manage item layouts and visibility</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm ${
                  isPreviewMode
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400'
                }`}
              >
                {isPreviewMode ? '✅ Preview Mode' : '👁️ Preview'}
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                💾 Save Changes
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.total}</div>
                  <div className="text-sm text-blue-300">Total Items</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👁️</span>
                <div>
                  <div className="text-xl font-bold text-green-400">{stats.visible}</div>
                  <div className="text-sm text-green-300">Visible</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚫</span>
                <div>
                  <div className="text-xl font-bold text-red-400">{stats.hidden}</div>
                  <div className="text-sm text-red-300">Hidden</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">{stats.featured}</div>
                  <div className="text-sm text-yellow-300">Featured</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory('');
                }}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 disabled:opacity-50"
              >
                <option value="">All Subcategories</option>
                {getSelectedSubcategories().map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Search Items</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-zinc-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">View Mode</label>
              <div className="flex gap-2">
                <ViewModeButton mode="grid" icon="📱" label="Grid" />
                <ViewModeButton mode="list" icon="📋" label="List" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2">
            {['My', 'View 1', 'View 2', 'View 3'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-white text-black'
                    : 'bg-black/30 text-zinc-300 hover:bg-black/40 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Items ({filteredItems.length})
              </h2>
              
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                  ➕ Add Item
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                  🔄 Bulk Actions
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <div className="text-zinc-400 text-lg">No items found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your filters or search terms</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangementControl;
