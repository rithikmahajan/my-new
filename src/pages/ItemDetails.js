import React, { useState, useCallback, useMemo } from 'react';

/**
 * ItemDetails Component - Modern Black & White Theme
 * 
 * Comprehensive product details management interface featuring:
 * - Detailed product information display
 * - Product image gallery management
 * - Inventory tracking and stock alerts
 * - Price and discount management
 * - Review and rating analytics
 * - SEO and metadata configuration
 * - Related products management
 * - Sales performance insights
 */
const ItemDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  // Memoized item data with comprehensive product information
  const item = useMemo(() => ({
    id: 1,
    name: 'Premium Cotton T-Shirt Collection',
    brand: 'YORAA Essentials',
    category: 'Clothing',
    subCategory: 'T-Shirts',
    description: 'High-quality premium cotton t-shirt with comfortable fit and durable fabric. Perfect for casual wear and everyday comfort. Made with 100% organic cotton, eco-friendly dyes, and sustainable manufacturing processes.',
    fullDescription: 'Experience ultimate comfort with our Premium Cotton T-Shirt Collection. Crafted from 100% organic cotton with a soft, breathable fabric that gets better with every wash. The classic fit design ensures comfort throughout the day while maintaining a stylish appearance. Available in multiple colors and sizes to suit every preference.',
    price: 4566,
    salePrice: 3999,
    discount: 12,
    sku: 'YORAA-CT-001',
    barcodeNo: '420000123456',
    productCode: 'YE-COTTON-TS-2024',
    status: 'live',
    stock: 150,
    lowStockThreshold: 10,
    sizes: [
      { size: 'XS', stock: 15, price: 3999 },
      { size: 'S', stock: 25, price: 3999 },
      { size: 'M', stock: 40, price: 3999 },
      { size: 'L', stock: 35, price: 3999 },
      { size: 'XL', stock: 20, price: 3999 },
      { size: 'XXL', stock: 15, price: 4299 }
    ],
    colors: [
      { name: 'Midnight Black', code: '#000000', stock: 45 },
      { name: 'Pure White', code: '#FFFFFF', stock: 35 },
      { name: 'Navy Blue', code: '#1e3a8a', stock: 30 },
      { name: 'Charcoal Grey', code: '#374151', stock: 25 },
      { name: 'Forest Green', code: '#059669', stock: 15 }
    ],
    rating: 4.5,
    reviews: 128,
    totalSales: 1250,
    revenue: 4987500,
    views: 15420,
    wishlistCount: 89,
    returnRate: 2.1,
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    specifications: {
      material: '100% Organic Cotton',
      weight: '180 GSM',
      care: 'Machine wash cold, tumble dry low',
      origin: 'Made in India',
      sustainability: 'GOTS Certified Organic',
      fit: 'Regular Fit'
    },
    seo: {
      metaTitle: 'Premium Cotton T-Shirt - Organic & Sustainable | YORAA',
      metaDescription: 'Shop our premium organic cotton t-shirts. Comfortable, durable, and eco-friendly. Available in multiple colors and sizes.',
      keywords: ['organic cotton t-shirt', 'premium t-shirt', 'sustainable clothing', 'comfortable t-shirt']
    },
    createdDate: '2024-01-10',
    lastModified: '2024-01-18',
    supplier: 'EcoTextiles India Pvt Ltd',
    tags: ['bestseller', 'organic', 'eco-friendly', 'comfort']
  }), []);

  const handleDeleteItem = useCallback(() => {
    console.log('Deleting item:', item.id);
    setIsDeleteModalOpen(false);
    // In real app, would make API call and redirect
  }, [item.id]);

  const handleEditToggle = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode]);

  const getStockStatus = useCallback((stock, threshold = 10) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
    if (stock <= threshold) return { status: 'Low Stock', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    return { status: 'In Stock', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
  }, []);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      live: 'bg-green-100 text-green-800 border border-green-200',
      draft: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      discontinued: 'bg-red-100 text-red-800 border border-red-200'
    };
    
    const emojis = {
      live: '🟢',
      draft: '🟡',
      discontinued: '🔴'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${styles[status]}`}>
        <span>{emojis[status]}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const stockStatus = getStockStatus(item.stock, item.lowStockThreshold);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'seo', label: 'SEO', icon: '🔍' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <button className="bg-black/30 border border-zinc-600 rounded-lg p-2 hover:bg-black/40 transition-colors">
              ⬅️
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                {item.name}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                <span>SKU: {item.sku}</span>
                <span>•</span>
                <span>Brand: {item.brand}</span>
                <span>•</span>
                <span>Category: {item.category} › {item.subCategory}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {getStatusBadge(item.status)}
              <button
                onClick={handleEditToggle}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm ${
                  isEditMode
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400'
                }`}
              >
                {isEditMode ? '💾 Save' : '✏️ Edit'}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className={`${stockStatus.bg} border ${stockStatus.border} rounded-xl p-3`}>
              <div className="text-sm text-zinc-400 mb-1">Stock Status</div>
              <div className={`font-semibold ${stockStatus.color}`}>{stockStatus.status}</div>
              <div className="text-xs text-zinc-500">{item.stock} units</div>
            </div>
            
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-3">
              <div className="text-sm text-zinc-400 mb-1">Price</div>
              <div className="font-semibold text-blue-400">₹{item.salePrice.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">-{item.discount}% off</div>
            </div>
            
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-3">
              <div className="text-sm text-zinc-400 mb-1">Rating</div>
              <div className="font-semibold text-yellow-400">⭐ {item.rating}</div>
              <div className="text-xs text-zinc-500">{item.reviews} reviews</div>
            </div>
            
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-3">
              <div className="text-sm text-zinc-400 mb-1">Sales</div>
              <div className="font-semibold text-green-400">{item.totalSales}</div>
              <div className="text-xs text-zinc-500">units sold</div>
            </div>
            
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-3">
              <div className="text-sm text-zinc-400 mb-1">Revenue</div>
              <div className="font-semibold text-purple-400">₹{(item.revenue / 100000).toFixed(1)}L</div>
              <div className="text-xs text-zinc-500">total earnings</div>
            </div>
            
            <div className="bg-pink-600/20 border border-pink-500/30 rounded-xl p-3">
              <div className="text-sm text-zinc-400 mb-1">Views</div>
              <div className="font-semibold text-pink-400">{item.views.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">page views</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Product Images</h3>
              
              {/* Main Image */}
              <div className="mb-4">
                <img 
                  src={item.images[selectedImageIndex]} 
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-xl border border-zinc-600 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowImageModal(true)}
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {item.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${item.name} ${index + 1}`}
                    className={`h-16 object-cover rounded-lg border cursor-pointer transition-all ${
                      selectedImageIndex === index 
                        ? 'border-white opacity-100' 
                        : 'border-zinc-600 opacity-60 hover:opacity-80'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Product Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Basic Details</div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-zinc-400">Product Code:</span> <span className="text-white">{item.productCode}</span></div>
                            <div><span className="text-zinc-400">Barcode:</span> <span className="text-white">{item.barcodeNo}</span></div>
                            <div><span className="text-zinc-400">Supplier:</span> <span className="text-white">{item.supplier}</span></div>
                            <div><span className="text-zinc-400">Created:</span> <span className="text-white">{new Date(item.createdDate).toLocaleDateString()}</span></div>
                          </div>
                        </div>
                        
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Pricing</div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-zinc-400">Original Price:</span> <span className="text-white">₹{item.price.toLocaleString()}</span></div>
                            <div><span className="text-zinc-400">Sale Price:</span> <span className="text-green-400">₹{item.salePrice.toLocaleString()}</span></div>
                            <div><span className="text-zinc-400">Discount:</span> <span className="text-yellow-400">{item.discount}%</span></div>
                            <div><span className="text-zinc-400">Profit Margin:</span> <span className="text-blue-400">32%</span></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="text-sm text-zinc-400 mb-2">Description</div>
                        <p className="text-zinc-300 leading-relaxed">{item.fullDescription}</p>
                      </div>
                      
                      <div className="mt-6">
                        <div className="text-sm text-zinc-400 mb-2">Specifications</div>
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {Object.entries(item.specifications).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-zinc-400 capitalize">{key}:</span>
                                <span className="text-white ml-2">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Inventory Management</h3>
                      
                      {/* Size Inventory */}
                      <div className="mb-6">
                        <div className="text-sm text-zinc-400 mb-3">Size Inventory</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {item.sizes.map((sizeData) => (
                            <div key={sizeData.size} className="bg-black/30 border border-zinc-700 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-white">{sizeData.size}</span>
                                <span className={`text-sm ${getStockStatus(sizeData.stock).color}`}>
                                  {sizeData.stock} units
                                </span>
                              </div>
                              <div className="text-xs text-zinc-400 mt-1">₹{sizeData.price.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Color Inventory */}
                      <div>
                        <div className="text-sm text-zinc-400 mb-3">Color Inventory</div>
                        <div className="space-y-3">
                          {item.colors.map((colorData) => (
                            <div key={colorData.name} className="bg-black/30 border border-zinc-700 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-6 h-6 rounded-full border border-zinc-600"
                                    style={{ backgroundColor: colorData.code }}
                                  />
                                  <span className="text-white font-medium">{colorData.name}</span>
                                </div>
                                <span className={`text-sm ${getStockStatus(colorData.stock).color}`}>
                                  {colorData.stock} units
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Performance Analytics</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Sales Performance</div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-zinc-400">Units Sold:</span> <span className="text-white">{item.totalSales}</span></div>
                            <div><span className="text-zinc-400">Revenue:</span> <span className="text-green-400">₹{item.revenue.toLocaleString()}</span></div>
                            <div><span className="text-zinc-400">Avg. Order Value:</span> <span className="text-blue-400">₹{(item.revenue / item.totalSales).toFixed(0)}</span></div>
                            <div><span className="text-zinc-400">Return Rate:</span> <span className="text-yellow-400">{item.returnRate}%</span></div>
                          </div>
                        </div>
                        
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Engagement Metrics</div>
                          <div className="space-y-2 text-sm">
                            <div><span className="text-zinc-400">Page Views:</span> <span className="text-white">{item.views.toLocaleString()}</span></div>
                            <div><span className="text-zinc-400">Wishlist Adds:</span> <span className="text-pink-400">{item.wishlistCount}</span></div>
                            <div><span className="text-zinc-400">Conversion Rate:</span> <span className="text-purple-400">{((item.totalSales / item.views) * 100).toFixed(2)}%</span></div>
                            <div><span className="text-zinc-400">Avg. Rating:</span> <span className="text-yellow-400">⭐ {item.rating}</span></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                        <div className="text-sm text-zinc-400 mb-3">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs border border-blue-500/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Customer Reviews</h3>
                      
                      <div className="bg-black/30 border border-zinc-700 rounded-xl p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-center">
                              <div className="text-4xl font-bold text-yellow-400 mb-2">{item.rating}</div>
                              <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
                              <div className="text-sm text-zinc-400">{item.reviews} reviews</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((stars) => (
                              <div key={stars} className="flex items-center gap-3">
                                <span className="text-sm text-zinc-400 w-8">{stars}★</span>
                                <div className="flex-1 bg-zinc-700 rounded-full h-2">
                                  <div 
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{ width: `${Math.random() * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm text-zinc-400 w-8">{Math.floor(Math.random() * 50)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center text-zinc-400">
                        📝 Review management interface would be implemented here
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">SEO Configuration</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Meta Title</div>
                          <input
                            type="text"
                            value={item.seo.metaTitle}
                            className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                            readOnly={!isEditMode}
                          />
                        </div>
                        
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Meta Description</div>
                          <textarea
                            value={item.seo.metaDescription}
                            className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                            rows={3}
                            readOnly={!isEditMode}
                          />
                        </div>
                        
                        <div className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                          <div className="text-sm text-zinc-400 mb-2">Keywords</div>
                          <div className="flex flex-wrap gap-2">
                            {item.seo.keywords.map((keyword, index) => (
                              <span key={index} className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs border border-green-500/30">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🗑️</div>
                <h3 className="text-2xl font-bold text-white mb-2">Delete Product</h3>
                <p className="text-zinc-400">Are you sure you want to delete this product?</p>
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
                  onClick={handleDeleteItem}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 font-semibold"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              >
                ❌
              </button>
              <img 
                src={item.images[selectedImageIndex]} 
                alt={item.name}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
