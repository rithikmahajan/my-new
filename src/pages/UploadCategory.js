import React, { useState, useCallback } from 'react';

/**
 * UploadCategory Component - Modern Black & White Theme
 * 
 * Comprehensive category management interface featuring:
 * - Create new categories and subcategories
 * - Upload category images
 * - Edit existing categories
 * - Delete categories with confirmation
 * - Search and filter functionality
 * - Drag and drop image upload
 * - Modern card-based layout
 */
const UploadCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Electronics',
      image: '/api/placeholder/208/208',
      description: 'Smartphones, laptops, and electronic gadgets',
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Audio'],
      productCount: 245,
      status: 'active'
    },
    {
      id: 2,
      name: 'Fashion',
      image: '/api/placeholder/208/208',
      description: 'Clothing, accessories, and fashion items',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Accessories', 'Footwear'],
      productCount: 189,
      status: 'active'
    },
    {
      id: 3,
      name: 'Home & Garden',
      image: '/api/placeholder/208/208',
      description: 'Home decor, furniture, and garden supplies',
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'],
      productCount: 156,
      status: 'active'
    },
    {
      id: 4,
      name: 'Sports',
      image: '/api/placeholder/208/208',
      description: 'Sports equipment and fitness gear',
      subcategories: ['Fitness', 'Outdoor Sports', 'Team Sports'],
      productCount: 98,
      status: 'draft'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    subcategories: [''],
    status: 'active'
  });
  const [dragActive, setDragActive] = useState(false);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubcategoryChange = useCallback((index, value) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories.map((sub, i) => i === index ? value : sub)
    }));
  }, []);

  const addSubcategory = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, '']
    }));
  }, []);

  const removeSubcategory = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }));
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleInputChange('image', e.dataTransfer.files[0]);
    }
  }, [handleInputChange]);

  const handleFileSelect = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('image', e.target.files[0]);
    }
  }, [handleInputChange]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      description: '',
      image: null,
      subcategories: [''],
      status: 'active'
    });
  }, []);

  const handleCreateCategory = useCallback(() => {
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      image: formData.image ? URL.createObjectURL(formData.image) : '/api/placeholder/208/208',
      subcategories: formData.subcategories.filter(sub => sub.trim() !== ''),
      productCount: 0,
      status: formData.status
    };

    setCategories(prev => [newCategory, ...prev]);
    setIsCreateModalOpen(false);
    resetForm();
  }, [formData, resetForm]);

  const handleEditCategory = useCallback((category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: null,
      subcategories: [...category.subcategories, ''],
      status: category.status
    });
    setIsEditModalOpen(true);
  }, []);

  const handleUpdateCategory = useCallback(() => {
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id 
        ? {
            ...cat,
            name: formData.name,
            description: formData.description,
            subcategories: formData.subcategories.filter(sub => sub.trim() !== ''),
            status: formData.status
          }
        : cat
    ));
    
    setIsEditModalOpen(false);
    setEditingCategory(null);
    resetForm();
  }, [formData, editingCategory, resetForm]);

  const handleDeleteCategory = useCallback((categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  }, []);

  const toggleCategoryStatus = useCallback((categoryId) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, status: cat.status === 'active' ? 'draft' : 'active' }
        : cat
    ));
  }, []);

  const getStatusBadge = useCallback((status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-yellow-100 text-yellow-800 border border-yellow-200';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                📁 Category Management
              </h1>
              <p className="text-zinc-300 mt-2">Create and manage product categories and subcategories</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              ➕ Create Category
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-zinc-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📁</span>
              <div>
                <div className="text-2xl font-bold text-blue-400">{categories.length}</div>
                <div className="text-sm text-blue-300">Total Categories</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {categories.filter(cat => cat.status === 'active').length}
                </div>
                <div className="text-sm text-green-300">Active Categories</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏷️</span>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
                </div>
                <div className="text-sm text-purple-300">Subcategories</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </div>
                <div className="text-sm text-yellow-300">Total Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Categories ({filteredCategories.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:bg-black/40 transition-all duration-300 group">
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(category.status)}`}>
                        {category.status === 'active' ? '✅ Active' : '📝 Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{category.description}</p>
                    
                    {/* Subcategories */}
                    <div className="mb-3">
                      <div className="text-xs text-zinc-500 mb-2">Subcategories:</div>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub, index) => (
                          <span key={index} className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-zinc-500 text-xs">+{category.subcategories.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    {/* Product Count */}
                    <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
                      <span>📦 {category.productCount} products</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-3 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => toggleCategoryStatus(category.id)}
                        className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-1 ${
                          category.status === 'active'
                            ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400'
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400'
                        } text-white`}
                      >
                        {category.status === 'active' ? '⏸️ Draft' : '▶️ Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-3 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 text-sm font-medium flex items-center justify-center"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">📁</div>
                  <div className="text-zinc-400 text-lg">No categories found</div>
                  <div className="text-zinc-500 text-sm mt-2">Create your first category to get started</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {(isCreateModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {isCreateModalOpen ? 'Create New Category' : 'Edit Category'}
                </h3>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
                    resetForm();
                  }}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Electronics"
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of this category"
                    className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    rows={3}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Category Image
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-white bg-white/10' 
                        : 'border-zinc-600 hover:border-zinc-500'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.image ? (
                      <div className="space-y-3">
                        <img 
                          src={URL.createObjectURL(formData.image)} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-zinc-300">{formData.image.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-4xl">📷</div>
                        <div>
                          <p className="text-zinc-300">Drag and drop an image here, or</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="text-white hover:text-zinc-300 underline cursor-pointer"
                          >
                            browse files
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcategories */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Subcategories
                  </label>
                  <div className="space-y-2">
                    {formData.subcategories.map((sub, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={sub}
                          onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                          placeholder={`Subcategory ${index + 1}`}
                          className="flex-1 px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        {formData.subcategories.length > 1 && (
                          <button
                            onClick={() => removeSubcategory(index)}
                            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addSubcategory}
                      className="text-zinc-300 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      ➕ Add Subcategory
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={isCreateModalOpen ? handleCreateCategory : handleUpdateCategory}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold"
                >
                  {isCreateModalOpen ? '📁 Create Category' : '💾 Update Category'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCategory;
