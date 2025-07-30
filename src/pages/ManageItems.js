import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_OPTIONS, SUBCATEGORY_OPTIONS, STATUS_STYLES } from '../constants';
import { useDebounce } from '../hooks';

/**
 * ManageItems Component - Modernized with Black & White Theme
 * 
 * Main product management interface providing:
 * - Product listing with search and filtering
 * - Bulk operations and single item actions
 * - Navigation to product upload forms
 * - Edit modal with detailed product information
 * 
 * Performance Optimizations:
 * - useMemo for filtered items to prevent unnecessary recalculations
 * - useCallback for event handlers to prevent child re-renders
 * - Efficient state management with minimal re-renders
 * - Optimized table rendering with proper key props
 */

const ManageItems = React.memo(() => {
  const navigate = useNavigate();
  
  // State management - grouped by functionality for better organization
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All subcategories');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Modal state management
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newDetails, setNewDetails] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Debounced search term for performance optimization
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Sample items data
  const items = useMemo(() => [
    {
      id: 1,
      image: '/api/placeholder/80/80',
      productName: 'Premium T-Shirt',
      category: 'Clothing',
      subCategories: 'T-Shirts',
      size: ['S', 'M', 'L', 'XL'],
      quantity: 150,
      price: 4566,
      salePrice: 3999,
      sku: 'PST001',
      barcodeNo: '420000000001',
      status: 'live',
      metaData: 'High-quality cotton blend'
    },
    {
      id: 2,
      image: '/api/placeholder/80/80',
      productName: 'Designer Jeans',
      category: 'Clothing',
      subCategories: 'Jeans',
      size: ['28', '30', '32', '34'],
      quantity: 85,
      price: 8999,
      salePrice: 7999,
      sku: 'DJ002',
      barcodeNo: '420000000002',
      status: 'Scheduled',
      metaData: 'Premium denim fabric'
    },
    {
      id: 3,
      image: '/api/placeholder/80/80',
      productName: 'Wireless Headphones',
      category: 'Electronics',
      subCategories: 'Audio',
      size: ['One Size'],
      quantity: 45,
      price: 12999,
      salePrice: 9999,
      sku: 'WH003',
      barcodeNo: '420000000003',
      status: 'draft',
      metaData: 'Noise-cancelling technology'
    },
    {
      id: 4,
      image: '/api/placeholder/80/80',
      productName: 'Running Shoes',
      category: 'Footwear',
      subCategories: 'Sports',
      size: ['7', '8', '9', '10', '11'],
      quantity: 120,
      price: 7499,
      salePrice: 6499,
      sku: 'RS004',
      barcodeNo: '420000000004',
      status: 'live',
      metaData: 'Breathable mesh upper'
    }
  ], []);

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           item.subCategories.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All categories' || 
                             item.category === selectedCategory;
      
      const matchesSubCategory = selectedSubCategory === 'All subcategories' || 
                                item.subCategories === selectedSubCategory;
      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [items, debouncedSearchTerm, selectedCategory, selectedSubCategory]);

  // Memoized handlers
  const handleSelectItem = useCallback((itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  }, [selectedItems.length, filteredItems]);

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
    setNewDetails(item.metaData);
    setIsEditModalOpen(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    setIsEditModalOpen(false);
    setIsSuccessModalOpen(true);
    setTimeout(() => setIsSuccessModalOpen(false), 2000);
  }, []);

  const handleDelete = useCallback((itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting item:', itemId);
    }
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedItems.length > 0 && window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      console.log('Bulk deleting items:', selectedItems);
      setSelectedItems([]);
    }
  }, [selectedItems]);

  const getStatusStyle = useCallback((status) => {
    const styles = {
      live: 'bg-green-100 text-green-800 border border-green-200',
      draft: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      Scheduled: 'bg-blue-100 text-blue-800 border border-blue-200',
      archived: 'bg-gray-100 text-gray-800 border border-gray-200'
    };
    return styles[status] || styles.draft;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                📦 Manage Items
              </h1>
              <p className="text-zinc-300 mt-2">Manage your product inventory and details</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/single-product-upload')}
                className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ➕ Add Single Product
              </button>
              <button 
                onClick={() => navigate('/upload-category')}
                className="bg-gradient-to-r from-zinc-700 to-zinc-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-zinc-600 hover:to-zinc-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📁 Bulk Upload
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-zinc-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="All categories">All Categories</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-zinc-400">▼</span>
              </div>
            </div>

            {/* Sub-Category Filter */}
            <div className="relative">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="All subcategories">All Subcategories</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Audio">Audio</option>
                <option value="Sports">Sports</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-zinc-400">▼</span>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex gap-2">
              {selectedItems.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  🗑️ Delete ({selectedItems.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Products ({filteredItems.length})
              </h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-zinc-300">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-zinc-600 text-white focus:ring-white/50"
                  />
                  Select All
                </label>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30 border-b border-zinc-600">
                  <tr>
                    <th className="text-left p-4 font-semibold text-zinc-300">Select</th>
                    <th className="text-left p-4 font-semibold text-zinc-300">Product</th>
                    <th className="text-left p-4 font-semibold text-zinc-300">Category</th>
                    <th className="text-left p-4 font-semibold text-zinc-300">Inventory</th>
                    <th className="text-left p-4 font-semibold text-zinc-300">Price</th>
                    <th className="text-left p-4 font-semibold text-zinc-300">Status</th>
                    <th className="text-left p-4 font-semibold text-zinc-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-700 hover:bg-white/5 transition-colors duration-200">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="rounded border-zinc-600 text-white focus:ring-white/50"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.productName}
                            className="w-12 h-12 rounded-lg object-cover border border-zinc-600"
                          />
                          <div>
                            <div className="font-semibold text-white">{item.productName}</div>
                            <div className="text-sm text-zinc-400">SKU: {item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{item.category}</div>
                        <div className="text-sm text-zinc-400">{item.subCategories}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{item.quantity} units</div>
                        <div className="text-sm text-zinc-400">Sizes: {item.size.join(', ')}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">₹{item.salePrice.toLocaleString()}</div>
                        {item.price !== item.salePrice && (
                          <div className="text-sm text-zinc-400 line-through">₹{item.price.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <div className="text-zinc-400 text-lg">No products found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Edit Product</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={editingItem?.productName || ''}
                    className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Meta Data
                  </label>
                  <textarea
                    value={newDetails}
                    onChange={(e) => setNewDetails(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    rows={4}
                    placeholder="Enter product details..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-green-500/50 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
              <p className="text-zinc-300">Product updated successfully</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ManageItems.displayName = 'ManageItems';

export default ManageItems;
