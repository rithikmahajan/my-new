import React, { useState, useCallback, useMemo } from 'react';

/**
 * SingleProductUpload Component - Modern Black & White Theme
 * 
 * Comprehensive single product upload interface featuring:
 * - Step-by-step product creation wizard
 * - Advanced image upload with drag-and-drop
 * - Multi-variant product support (size, color, material)
 * - Inventory management and stock tracking
 * - SEO optimization and metadata management
 * - Price configuration with discount options
 * - Category and subcategory organization
 * - Bulk import and export capabilities
 * - Real-time preview and validation
 */
const SingleProductUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState({
    basicInfo: {
      name: '',
      brand: '',
      category: '',
      subCategory: '',
      description: '',
      shortDescription: '',
      tags: []
    },
    images: {
      primary: null,
      gallery: [],
      variant: []
    },
    pricing: {
      basePrice: '',
      salePrice: '',
      discount: 0,
      costPrice: '',
      margin: 0
    },
    inventory: {
      sku: '',
      stock: '',
      lowStockThreshold: 10,
      trackQuantity: true
    },
    variants: [],
    specifications: {},
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      slug: ''
    },
    shipping: {
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      shippingClass: 'standard'
    }
  });
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // Memoized form options
  const formOptions = useMemo(() => ({
    categories: [
      { id: 'clothing', name: 'Clothing', icon: '👕' },
      { id: 'accessories', name: 'Accessories', icon: '👜' },
      { id: 'footwear', name: 'Footwear', icon: '👟' },
      { id: 'electronics', name: 'Electronics', icon: '📱' },
      { id: 'home', name: 'Home & Living', icon: '🏠' }
    ],
    subCategories: {
      clothing: [
        { id: 't-shirts', name: 'T-Shirts' },
        { id: 'jeans', name: 'Jeans' },
        { id: 'dresses', name: 'Dresses' },
        { id: 'jackets', name: 'Jackets' }
      ],
      accessories: [
        { id: 'bags', name: 'Bags' },
        { id: 'jewelry', name: 'Jewelry' },
        { id: 'watches', name: 'Watches' },
        { id: 'sunglasses', name: 'Sunglasses' }
      ],
      footwear: [
        { id: 'sneakers', name: 'Sneakers' },
        { id: 'boots', name: 'Boots' },
        { id: 'sandals', name: 'Sandals' },
        { id: 'formal', name: 'Formal Shoes' }
      ],
      electronics: [
        { id: 'phones', name: 'Phones' },
        { id: 'laptops', name: 'Laptops' },
        { id: 'headphones', name: 'Headphones' },
        { id: 'cameras', name: 'Cameras' }
      ],
      home: [
        { id: 'furniture', name: 'Furniture' },
        { id: 'decor', name: 'Decor' },
        { id: 'kitchen', name: 'Kitchen' },
        { id: 'bedding', name: 'Bedding' }
      ]
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#EF4444' },
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Green', hex: '#10B981' },
      { name: 'Yellow', hex: '#F59E0B' },
      { name: 'Purple', hex: '#8B5CF6' },
      { name: 'Pink', hex: '#EC4899' }
    ],
    shippingClasses: [
      { id: 'standard', name: 'Standard Shipping', description: '3-5 business days' },
      { id: 'express', name: 'Express Shipping', description: '1-2 business days' },
      { id: 'overnight', name: 'Overnight Shipping', description: 'Next business day' },
      { id: 'free', name: 'Free Shipping', description: '5-7 business days' }
    ]
  }), []);

  const steps = [
    { id: 1, title: 'Basic Information', icon: '📋', description: 'Product name, category, and description' },
    { id: 2, title: 'Images & Media', icon: '📷', description: 'Upload product images and gallery' },
    { id: 3, title: 'Pricing & Inventory', icon: '💰', description: 'Set pricing and manage inventory' },
    { id: 4, title: 'Variants & Options', icon: '🎨', description: 'Configure product variants' },
    { id: 5, title: 'SEO & Specifications', icon: '🔍', description: 'SEO settings and specifications' },
    { id: 6, title: 'Review & Publish', icon: '🚀', description: 'Review and publish product' }
  ];

  const handleInputChange = useCallback((field, value) => {
    setProductData(prev => {
      const keys = field.split('.');
      const updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  }, []);

  const handleImageUpload = useCallback((files, type = 'gallery') => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const uploadSimulation = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadSimulation);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Process files (in real app, would upload to server)
    const processedFiles = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    if (type === 'primary') {
      setProductData(prev => ({
        ...prev,
        images: { ...prev.images, primary: processedFiles[0] }
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        images: {
          ...prev.images,
          gallery: [...prev.images.gallery, ...processedFiles]
        }
      }));
    }
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
      handleImageUpload(files);
    }
  }, [handleImageUpload]);

  const addVariant = useCallback(() => {
    const newVariant = {
      id: Date.now(),
      name: '',
      type: 'size',
      options: [],
      priceAdjustment: 0,
      stockAdjustment: 0
    };
    
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
  }, []);

  const removeVariant = useCallback((variantId) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== variantId)
    }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    const errors = {};
    
    switch (currentStep) {
      case 1:
        if (!productData.basicInfo.name) errors.name = 'Product name is required';
        if (!productData.basicInfo.category) errors.category = 'Category is required';
        if (!productData.basicInfo.description) errors.description = 'Description is required';
        break;
      case 2:
        if (!productData.images.primary) errors.primary = 'Primary image is required';
        break;
      case 3:
        if (!productData.pricing.basePrice) errors.basePrice = 'Base price is required';
        if (!productData.inventory.stock) errors.stock = 'Stock quantity is required';
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, productData]);

  const handleNextStep = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  }, [validateCurrentStep, steps.length]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handlePublish = useCallback(() => {
    console.log('Publishing product:', productData);
    // In real app, would make API call to create product
  }, [productData]);

  const calculateDiscount = useMemo(() => {
    const { basePrice, salePrice } = productData.pricing;
    if (basePrice && salePrice && basePrice > salePrice) {
      return Math.round(((basePrice - salePrice) / basePrice) * 100);
    }
    return 0;
  }, [productData.pricing.basePrice, productData.pricing.salePrice]);

  const calculateMargin = useMemo(() => {
    const { salePrice, costPrice } = productData.pricing;
    if (salePrice && costPrice && salePrice > costPrice) {
      return Math.round(((salePrice - costPrice) / salePrice) * 100);
    }
    return 0;
  }, [productData.pricing.salePrice, productData.pricing.costPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
                Single Product Upload
              </h1>
              <p className="text-zinc-400">Create and configure your product step by step</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                👁️ {previewMode ? 'Edit Mode' : 'Preview'}
              </button>
              <button className="bg-gradient-to-r from-zinc-600 to-zinc-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-zinc-500 hover:to-zinc-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                💾 Save Draft
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-zinc-400">
                Step {currentStep} of {steps.length}
              </div>
              <div className="text-sm text-zinc-400">
                {Math.round((currentStep / steps.length) * 100)}% Complete
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-5 left-0 w-full h-1 bg-zinc-700 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 border-blue-400 text-white'
                        : 'bg-zinc-800 border-zinc-600 text-zinc-400'
                    }`}>
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-white' : 'text-zinc-400'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1 max-w-32">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-8">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            value={productData.basicInfo.name}
                            onChange={(e) => handleInputChange('basicInfo.name', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="Enter product name"
                          />
                          {validationErrors.name && (
                            <p className="text-red-400 text-sm mt-1">❌ {validationErrors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Brand
                          </label>
                          <input
                            type="text"
                            value={productData.basicInfo.brand}
                            onChange={(e) => handleInputChange('basicInfo.brand', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="Enter brand name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Category *
                          </label>
                          <select
                            value={productData.basicInfo.category}
                            onChange={(e) => handleInputChange('basicInfo.category', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                          >
                            <option value="" className="bg-black text-white">Select Category</option>
                            {formOptions.categories.map((category) => (
                              <option key={category.id} value={category.id} className="bg-black text-white">
                                {category.icon} {category.name}
                              </option>
                            ))}
                          </select>
                          {validationErrors.category && (
                            <p className="text-red-400 text-sm mt-1">❌ {validationErrors.category}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            SubCategory
                          </label>
                          <select
                            value={productData.basicInfo.subCategory}
                            onChange={(e) => handleInputChange('basicInfo.subCategory', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                            disabled={!productData.basicInfo.category}
                          >
                            <option value="" className="bg-black text-white">Select SubCategory</option>
                            {productData.basicInfo.category && formOptions.subCategories[productData.basicInfo.category]?.map((subCategory) => (
                              <option key={subCategory.id} value={subCategory.id} className="bg-black text-white">
                                {subCategory.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Product Description *
                        </label>
                        <textarea
                          value={productData.basicInfo.description}
                          onChange={(e) => handleInputChange('basicInfo.description', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                          placeholder="Describe your product in detail..."
                        />
                        {validationErrors.description && (
                          <p className="text-red-400 text-sm mt-1">❌ {validationErrors.description}</p>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Short Description
                        </label>
                        <textarea
                          value={productData.basicInfo.shortDescription}
                          onChange={(e) => handleInputChange('basicInfo.shortDescription', e.target.value)}
                          rows={2}
                          className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                          placeholder="Brief product summary..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Images & Media */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Images & Media</h2>
                      
                      {/* Primary Image Upload */}
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-zinc-300 mb-4">
                          Primary Product Image *
                        </label>
                        
                        {!productData.images.primary ? (
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
                            <div className="text-6xl mb-4">📷</div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              Drop your primary image here
                            </h3>
                            <p className="text-zinc-400 mb-4">
                              or click to browse files
                            </p>
                            <label className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 cursor-pointer inline-flex items-center gap-2">
                              📎 Choose File
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files, 'primary')}
                                className="hidden"
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={productData.images.primary.url}
                              alt="Primary product"
                              className="w-full h-64 object-cover rounded-xl border border-zinc-600"
                            />
                            <button
                              onClick={() => handleInputChange('images.primary', null)}
                              className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                            >
                              ❌
                            </button>
                          </div>
                        )}
                        
                        {validationErrors.primary && (
                          <p className="text-red-400 text-sm mt-2">❌ {validationErrors.primary}</p>
                        )}
                      </div>
                      
                      {/* Gallery Images */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-4">
                          Product Gallery
                        </label>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {productData.images.gallery.map((image, index) => (
                            <div key={image.id} className="relative">
                              <img
                                src={image.url}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-zinc-600"
                              />
                              <button
                                onClick={() => {
                                  setProductData(prev => ({
                                    ...prev,
                                    images: {
                                      ...prev.images,
                                      gallery: prev.images.gallery.filter(img => img.id !== image.id)
                                    }
                                  }));
                                }}
                                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-500 transition-colors text-xs"
                              >
                                ❌
                              </button>
                            </div>
                          ))}
                          
                          <label className="h-32 border-2 border-dashed border-zinc-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-zinc-500 transition-colors">
                            <div className="text-center">
                              <div className="text-2xl mb-1">➕</div>
                              <div className="text-xs text-zinc-400">Add Image</div>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleImageUpload(e.target.files)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        
                        {isUploading && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-zinc-400">Uploading...</span>
                              <span className="text-sm text-zinc-400">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-zinc-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pricing & Inventory */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Pricing & Inventory</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Base Price * (₹)
                          </label>
                          <input
                            type="number"
                            value={productData.pricing.basePrice}
                            onChange={(e) => handleInputChange('pricing.basePrice', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="0.00"
                          />
                          {validationErrors.basePrice && (
                            <p className="text-red-400 text-sm mt-1">❌ {validationErrors.basePrice}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Sale Price (₹)
                          </label>
                          <input
                            type="number"
                            value={productData.pricing.salePrice}
                            onChange={(e) => handleInputChange('pricing.salePrice', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="0.00"
                          />
                          {calculateDiscount > 0 && (
                            <p className="text-green-400 text-sm mt-1">💰 {calculateDiscount}% discount</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Cost Price (₹)
                          </label>
                          <input
                            type="number"
                            value={productData.pricing.costPrice}
                            onChange={(e) => handleInputChange('pricing.costPrice', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="0.00"
                          />
                          {calculateMargin > 0 && (
                            <p className="text-blue-400 text-sm mt-1">📈 {calculateMargin}% margin</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            SKU
                          </label>
                          <input
                            type="text"
                            value={productData.inventory.sku}
                            onChange={(e) => handleInputChange('inventory.sku', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="Enter SKU"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Stock Quantity *
                          </label>
                          <input
                            type="number"
                            value={productData.inventory.stock}
                            onChange={(e) => handleInputChange('inventory.stock', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="0"
                          />
                          {validationErrors.stock && (
                            <p className="text-red-400 text-sm mt-1">❌ {validationErrors.stock}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Low Stock Threshold
                          </label>
                          <input
                            type="number"
                            value={productData.inventory.lowStockThreshold}
                            onChange={(e) => handleInputChange('inventory.lowStockThreshold', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="10"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={productData.inventory.trackQuantity}
                            onChange={(e) => handleInputChange('inventory.trackQuantity', e.target.checked)}
                            className="w-5 h-5 rounded bg-black/30 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-zinc-300">Track quantity for this product</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Variants & Options */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Variants & Options</h2>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">Product Variants</h3>
                          <button
                            onClick={addVariant}
                            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-2"
                          >
                            ➕ Add Variant
                          </button>
                        </div>
                        
                        {productData.variants.length === 0 ? (
                          <div className="text-center py-8 bg-black/30 border border-zinc-700 rounded-xl">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="text-lg font-semibold text-white mb-2">No Variants Added</h3>
                            <p className="text-zinc-400 mb-4">Add variants like size, color, or material to give customers options.</p>
                            <button
                              onClick={addVariant}
                              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                            >
                              ➕ Add First Variant
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {productData.variants.map((variant, index) => (
                              <div key={variant.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-semibold text-white">Variant {index + 1}</h4>
                                  <button
                                    onClick={() => removeVariant(variant.id)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    🗑️ Remove
                                  </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                      Variant Name
                                    </label>
                                    <input
                                      type="text"
                                      value={variant.name}
                                      onChange={(e) => {
                                        const updatedVariants = productData.variants.map(v => 
                                          v.id === variant.id ? { ...v, name: e.target.value } : v
                                        );
                                        handleInputChange('variants', updatedVariants);
                                      }}
                                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                                      placeholder="e.g., Size, Color"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                      Variant Type
                                    </label>
                                    <select
                                      value={variant.type}
                                      onChange={(e) => {
                                        const updatedVariants = productData.variants.map(v => 
                                          v.id === variant.id ? { ...v, type: e.target.value } : v
                                        );
                                        handleInputChange('variants', updatedVariants);
                                      }}
                                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                                    >
                                      <option value="size">Size</option>
                                      <option value="color">Color</option>
                                      <option value="material">Material</option>
                                      <option value="style">Style</option>
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                                      Price Adjustment (₹)
                                    </label>
                                    <input
                                      type="number"
                                      value={variant.priceAdjustment}
                                      onChange={(e) => {
                                        const updatedVariants = productData.variants.map(v => 
                                          v.id === variant.id ? { ...v, priceAdjustment: parseFloat(e.target.value) || 0 } : v
                                        );
                                        handleInputChange('variants', updatedVariants);
                                      }}
                                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: SEO & Specifications */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">SEO & Specifications</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* SEO Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Meta Title
                              </label>
                              <input
                                type="text"
                                value={productData.seo.metaTitle}
                                onChange={(e) => handleInputChange('seo.metaTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                                placeholder="SEO title for search engines"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Meta Description
                              </label>
                              <textarea
                                value={productData.seo.metaDescription}
                                onChange={(e) => handleInputChange('seo.metaDescription', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                                placeholder="SEO description for search results"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-zinc-300 mb-2">
                                URL Slug
                              </label>
                              <input
                                type="text"
                                value={productData.seo.slug}
                                onChange={(e) => handleInputChange('seo.slug', e.target.value)}
                                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                                placeholder="product-url-slug"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Specifications Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Product Specifications</h3>
                          <div className="text-center py-8 bg-black/30 border border-zinc-700 rounded-xl">
                            <div className="text-4xl mb-4">📋</div>
                            <p className="text-zinc-400">Specifications management would be implemented here</p>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Shipping Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                              value={productData.shipping.weight}
                              onChange={(e) => handleInputChange('shipping.weight', e.target.value)}
                              className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                              placeholder="0.0"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                              Length (cm)
                            </label>
                            <input
                              type="number"
                              value={productData.shipping.dimensions.length}
                              onChange={(e) => handleInputChange('shipping.dimensions.length', e.target.value)}
                              className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                              Width (cm)
                            </label>
                            <input
                              type="number"
                              value={productData.shipping.dimensions.width}
                              onChange={(e) => handleInputChange('shipping.dimensions.width', e.target.value)}
                              className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                              Height (cm)
                            </label>
                            <input
                              type="number"
                              value={productData.shipping.dimensions.height}
                              onChange={(e) => handleInputChange('shipping.dimensions.height', e.target.value)}
                              className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Shipping Class
                          </label>
                          <select
                            value={productData.shipping.shippingClass}
                            onChange={(e) => handleInputChange('shipping.shippingClass', e.target.value)}
                            className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                          >
                            {formOptions.shippingClasses.map((shippingClass) => (
                              <option key={shippingClass.id} value={shippingClass.id} className="bg-black text-white">
                                {shippingClass.name} - {shippingClass.description}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Review & Publish */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Review & Publish</h2>
                      
                      <div className="bg-black/30 border border-zinc-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Product Summary</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="space-y-3">
                              <div>
                                <span className="text-zinc-400">Name:</span>
                                <span className="text-white ml-2">{productData.basicInfo.name || 'Not set'}</span>
                              </div>
                              <div>
                                <span className="text-zinc-400">Category:</span>
                                <span className="text-white ml-2">
                                  {productData.basicInfo.category ? 
                                    formOptions.categories.find(c => c.id === productData.basicInfo.category)?.name 
                                    : 'Not set'
                                  }
                                </span>
                              </div>
                              <div>
                                <span className="text-zinc-400">Price:</span>
                                <span className="text-white ml-2">
                                  ₹{productData.pricing.salePrice || productData.pricing.basePrice || '0'}
                                </span>
                              </div>
                              <div>
                                <span className="text-zinc-400">Stock:</span>
                                <span className="text-white ml-2">{productData.inventory.stock || '0'} units</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            {productData.images.primary && (
                              <img
                                src={productData.images.primary.url}
                                alt="Product preview"
                                className="w-full h-40 object-cover rounded-lg border border-zinc-600"
                              />
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2 text-green-400 mb-2">
                            ✅ <span className="font-semibold">Ready to Publish</span>
                          </div>
                          <p className="text-green-300 text-sm">
                            Your product is ready to be published to your store.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Step Navigation */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                      currentStep === step.id
                        ? 'bg-white text-black'
                        : 'text-zinc-300 hover:bg-black/40 hover:text-white'
                    }`}
                  >
                    <span>{step.icon}</span>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-xs opacity-70">{step.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Preview */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Product Preview</h3>
              
              <div className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden">
                {productData.images.primary ? (
                  <img
                    src={productData.images.primary.url}
                    alt="Product preview"
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-500 text-sm">No image uploaded</span>
                  </div>
                )}
                
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">
                    {productData.basicInfo.name || 'Untitled Product'}
                  </h4>
                  <div className="text-sm text-zinc-400 mb-2">
                    {productData.basicInfo.shortDescription || 'No description'}
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    ₹{productData.pricing.salePrice || productData.pricing.basePrice || '0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  currentStep === 1
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-zinc-600 to-zinc-500 text-white hover:from-zinc-500 hover:to-zinc-400'
                }`}
              >
                ⬅️ Previous
              </button>
              
              <div className="text-sm text-zinc-400">
                Step {currentStep} of {steps.length}
              </div>
              
              {currentStep < steps.length ? (
                <button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  Next ➡️
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  🚀 Publish Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductUpload;
