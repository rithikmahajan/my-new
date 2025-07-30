import React, { useState, useCallback, useMemo } from 'react';

/**
 * Filters Component - Modern Black & White Theme
 * 
 * Advanced filter management interface featuring:
 * - Dynamic filter creation and management
 * - Multiple filter types (category, color, size, price, etc.)
 * - Filter options with priority settings
 * - Bulk operations and batch updates
 * - Filter analytics and usage statistics
 * - Import/export functionality
 * - Real-time preview
 */
const Filters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);
  const [newFilterName, setNewFilterName] = useState('');
  const [newFilterType, setNewFilterType] = useState('');
  const [newFilterOptions, setNewFilterOptions] = useState([]);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');
  const [newOptionPriority, setNewOptionPriority] = useState(1);

  const filterTypes = [
    { value: 'category', label: 'Category', icon: '📂' },
    { value: 'color', label: 'Color', icon: '🎨' },
    { value: 'size', label: 'Size', icon: '📏' },
    { value: 'price', label: 'Price Range', icon: '💰' },
    { value: 'brand', label: 'Brand', icon: '🏷️' },
    { value: 'rating', label: 'Rating', icon: '⭐' },
    { value: 'availability', label: 'Availability', icon: '📦' },
    { value: 'material', label: 'Material', icon: '🧵' }
  ];

  const [filters, setFilters] = useState([
    {
      id: 1,
      name: 'Product Categories',
      type: 'category',
      isActive: true,
      usageCount: 2547,
      lastUsed: '2024-01-18',
      options: [
        { id: 1, name: 'Electronics', priority: 1, value: 'electronics', isActive: true },
        { id: 2, name: 'Clothing', priority: 2, value: 'clothing', isActive: true },
        { id: 3, name: 'Sports', priority: 3, value: 'sports', isActive: true },
        { id: 4, name: 'Home & Garden', priority: 4, value: 'home-garden', isActive: false }
      ]
    },
    {
      id: 2,
      name: 'Color Options',
      type: 'color',
      isActive: true,
      usageCount: 1832,
      lastUsed: '2024-01-17',
      options: [
        { id: 5, name: 'Red', priority: 1, value: '#ff0000', isActive: true },
        { id: 6, name: 'Blue', priority: 2, value: '#0000ff', isActive: true },
        { id: 7, name: 'Green', priority: 3, value: '#00ff00', isActive: true },
        { id: 8, name: 'Black', priority: 4, value: '#000000', isActive: true },
        { id: 9, name: 'White', priority: 5, value: '#ffffff', isActive: true }
      ]
    },
    {
      id: 3,
      name: 'Size Chart',
      type: 'size',
      isActive: true,
      usageCount: 1456,
      lastUsed: '2024-01-16',
      options: [
        { id: 10, name: 'Extra Small', priority: 1, value: 'xs', isActive: true },
        { id: 11, name: 'Small', priority: 2, value: 's', isActive: true },
        { id: 12, name: 'Medium', priority: 3, value: 'm', isActive: true },
        { id: 13, name: 'Large', priority: 4, value: 'l', isActive: true },
        { id: 14, name: 'Extra Large', priority: 5, value: 'xl', isActive: true }
      ]
    },
    {
      id: 4,
      name: 'Price Ranges',
      type: 'price',
      isActive: true,
      usageCount: 3621,
      lastUsed: '2024-01-18',
      options: [
        { id: 15, name: 'Under ₹500', priority: 1, value: '0-500', isActive: true },
        { id: 16, name: '₹500 - ₹1000', priority: 2, value: '500-1000', isActive: true },
        { id: 17, name: '₹1000 - ₹2500', priority: 3, value: '1000-2500', isActive: true },
        { id: 18, name: '₹2500 - ₹5000', priority: 4, value: '2500-5000', isActive: true },
        { id: 19, name: 'Above ₹5000', priority: 5, value: '5000+', isActive: true }
      ]
    },
    {
      id: 5,
      name: 'Customer Ratings',
      type: 'rating',
      isActive: true,
      usageCount: 987,
      lastUsed: '2024-01-15',
      options: [
        { id: 20, name: '5 Stars', priority: 1, value: '5', isActive: true },
        { id: 21, name: '4 Stars & Up', priority: 2, value: '4+', isActive: true },
        { id: 22, name: '3 Stars & Up', priority: 3, value: '3+', isActive: true },
        { id: 23, name: '2 Stars & Up', priority: 4, value: '2+', isActive: false }
      ]
    }
  ]);

  // Filter filters based on search and type
  const filteredFilters = useMemo(() => {
    return filters.filter(filter => {
      const matchesSearch = filter.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedFilterType === 'all' || filter.type === selectedFilterType;
      return matchesSearch && matchesType;
    });
  }, [filters, searchTerm, selectedFilterType]);

  // Statistics
  const stats = useMemo(() => {
    const total = filters.length;
    const active = filters.filter(f => f.isActive).length;
    const totalOptions = filters.reduce((sum, f) => sum + f.options.length, 0);
    const totalUsage = filters.reduce((sum, f) => sum + f.usageCount, 0);
    
    return { total, active, totalOptions, totalUsage };
  }, [filters]);

  const handleCreateFilter = useCallback(() => {
    if (!newFilterName.trim() || !newFilterType || newFilterOptions.length === 0) return;
    
    const newFilter = {
      id: Date.now(),
      name: newFilterName.trim(),
      type: newFilterType,
      isActive: true,
      usageCount: 0,
      lastUsed: new Date().toISOString().split('T')[0],
      options: newFilterOptions.map((option, index) => ({
        ...option,
        id: Date.now() + index,
        isActive: true
      }))
    };
    
    setFilters(prev => [newFilter, ...prev]);
    setNewFilterName('');
    setNewFilterType('');
    setNewFilterOptions([]);
    setShowCreateModal(false);
  }, [newFilterName, newFilterType, newFilterOptions]);

  const handleAddOption = useCallback(() => {
    if (!newOptionName.trim() || !newOptionValue.trim()) return;
    
    const newOption = {
      name: newOptionName.trim(),
      value: newOptionValue.trim(),
      priority: newOptionPriority
    };
    
    setNewFilterOptions(prev => [...prev, newOption]);
    setNewOptionName('');
    setNewOptionValue('');
    setNewOptionPriority(prev => prev + 1);
  }, [newOptionName, newOptionValue, newOptionPriority]);

  const handleDeleteFilter = useCallback((filterId) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
  }, []);

  const handleToggleFilterStatus = useCallback((filterId) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, isActive: !filter.isActive }
          : filter
      )
    );
  }, []);

  const handleToggleOptionStatus = useCallback((filterId, optionId) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? {
              ...filter,
              options: filter.options.map(option =>
                option.id === optionId 
                  ? { ...option, isActive: !option.isActive }
                  : option
              )
            }
          : filter
      )
    );
  }, []);

  const getFilterTypeIcon = useCallback((type) => {
    const filterType = filterTypes.find(ft => ft.value === type);
    return filterType ? filterType.icon : '🔧';
  }, []);

  const getFilterTypeLabel = useCallback((type) => {
    const filterType = filterTypes.find(ft => ft.value === type);
    return filterType ? filterType.label : type;
  }, []);

  const filterTypeOptions = [
    { value: 'all', label: 'All Types', count: stats.total }
  ].concat(
    filterTypes.map(type => ({
      value: type.value,
      label: type.label,
      count: filters.filter(f => f.type === type.value).length
    }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                🔧 Filter Management
              </h1>
              <p className="text-zinc-300 mt-2">Create and manage product filters and search options</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm"
              >
                ➕ Add Filter
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm">
                📊 Analytics
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.total}</div>
                  <div className="text-sm text-blue-300">Total Filters</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="text-xl font-bold text-green-400">{stats.active}</div>
                  <div className="text-sm text-green-300">Active Filters</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <div className="text-xl font-bold text-purple-400">{stats.totalOptions}</div>
                  <div className="text-sm text-purple-300">Filter Options</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">{stats.totalUsage.toLocaleString()}</div>
                  <div className="text-sm text-yellow-300">Total Usage</div>
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
                placeholder="Search filters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Type Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilterType(option.value)}
                  className={`whitespace-nowrap px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedFilterType === option.value
                      ? 'bg-white text-black'
                      : 'bg-black/30 text-zinc-300 hover:bg-black/40 hover:text-white'
                  }`}
                >
                  <span>{option.value !== 'all' ? getFilterTypeIcon(option.value) : '🗂️'}</span>
                  <span>{option.label}</span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-xs">{option.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Filters ({filteredFilters.length})
            </h2>

            <div className="space-y-6">
              {filteredFilters.map((filter) => (
                <div 
                  key={filter.id} 
                  className={`bg-black/30 border border-zinc-700 rounded-xl p-6 hover:bg-black/40 transition-all duration-300 ${
                    !filter.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{getFilterTypeIcon(filter.type)}</span>
                        <h3 className="text-lg font-semibold text-white">{filter.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          filter.isActive 
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {filter.isActive ? '✅ Active' : '🚫 Inactive'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                        <span>📂 {getFilterTypeLabel(filter.type)}</span>
                        <span>📋 {filter.options.length} options</span>
                        <span>📈 {filter.usageCount.toLocaleString()} uses</span>
                        <span>📅 Last used: {new Date(filter.lastUsed).toLocaleDateString()}</span>
                      </div>

                      {/* Filter Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filter.options.map((option) => (
                          <div 
                            key={option.id}
                            className={`bg-black/20 border border-zinc-600 rounded-lg p-3 flex items-center justify-between ${
                              !option.isActive ? 'opacity-50' : ''
                            }`}
                          >
                            <div className="flex-1">
                              <div className="text-white font-medium">{option.name}</div>
                              <div className="text-zinc-400 text-xs">
                                Value: {option.value} • Priority: {option.priority}
                              </div>
                            </div>
                            <button
                              onClick={() => handleToggleOptionStatus(filter.id, option.id)}
                              className={`ml-2 p-1 rounded transition-colors ${
                                option.isActive
                                  ? 'text-green-400 hover:text-green-300'
                                  : 'text-red-400 hover:text-red-300'
                              }`}
                            >
                              {option.isActive ? '✅' : '🚫'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleToggleFilterStatus(filter.id)}
                        className={`px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold ${
                          filter.isActive
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400'
                            : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400'
                        }`}
                      >
                        {filter.isActive ? '🚫 Disable' : '✅ Enable'}
                      </button>
                      
                      <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold">
                        ✏️ Edit
                      </button>
                      
                      <button
                        onClick={() => handleDeleteFilter(filter.id)}
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-2 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm font-semibold"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredFilters.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔧</div>
                  <div className="text-zinc-400 text-lg">No filters found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your search or create a new filter</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Filter Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Create New Filter</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Filter Name</label>
                  <input
                    type="text"
                    value={newFilterName}
                    onChange={(e) => setNewFilterName(e.target.value)}
                    placeholder="Enter filter name..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Filter Type</label>
                  <select
                    value={newFilterType}
                    onChange={(e) => setNewFilterType(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Select filter type</option>
                    {filterTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Add Options Section */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Filter Options</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      value={newOptionName}
                      onChange={(e) => setNewOptionName(e.target.value)}
                      placeholder="Option name..."
                      className="px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <input
                      type="text"
                      value={newOptionValue}
                      onChange={(e) => setNewOptionValue(e.target.value)}
                      placeholder="Option value..."
                      className="px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      onClick={handleAddOption}
                      disabled={!newOptionName.trim() || !newOptionValue.trim()}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ➕ Add Option
                    </button>
                  </div>
                  
                  {/* Preview Options */}
                  {newFilterOptions.length > 0 && (
                    <div className="bg-black/20 border border-zinc-600 rounded-lg p-3">
                      <div className="text-sm text-zinc-400 mb-2">Preview Options:</div>
                      <div className="space-y-2">
                        {newFilterOptions.map((option, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-white">{option.name} ({option.value})</span>
                            <button
                              onClick={() => setNewFilterOptions(prev => prev.filter((_, i) => i !== index))}
                              className="text-red-400 hover:text-red-300"
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFilter}
                  disabled={!newFilterName.trim() || !newFilterType || newFilterOptions.length === 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➕ Create Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
