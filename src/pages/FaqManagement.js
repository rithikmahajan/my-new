import React, { useState, useMemo, useCallback } from 'react';

/**
 * FaqManagement Component - Modern Black & White Theme
 * 
 * Comprehensive FAQ management interface featuring:
 * - Create, edit, and delete FAQs
 * - Advanced search and filtering
 * - Category organization
 * - FAQ analytics and statistics
 * - Bulk operations
 * - Priority management
 * - Multi-language support
 */
const FaqManagement = () => {
  const [faqTitle, setFaqTitle] = useState('');
  const [faqDetail, setFaqDetail] = useState('');
  const [faqCategory, setFaqCategory] = useState('');
  const [faqPriority, setFaqPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedFaqs, setExpandedFaqs] = useState(new Set());
  const [selectedFaqs, setSelectedFaqs] = useState([]);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // FAQ categories
  const categories = [
    'General',
    'Account & Membership',
    'Orders & Shipping',
    'Returns & Refunds',
    'Payments',
    'Technical Support',
    'Privacy & Security',
    'Promotions & Rewards'
  ];

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      title: 'What do I need to know before signing up to the YORAA membership?',
      detail: 'All your purchases in store and online are rewarded with points. To collect points in store, always remember to scan your membership ID via the H&M app. You can also earn points by completing your profile, earning you 20 points, by recycling your garments earning you 20 points, by bringing your own bag when you shop in-store earning you 5 points, and by inviting your friends to become members.',
      category: 'Account & Membership',
      priority: 'high',
      views: 1250,
      helpful: 45,
      notHelpful: 3,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-18',
      isActive: true,
      language: 'en'
    },
    {
      id: 2,
      title: 'How do I earn points with my YORAA membership?',
      detail: 'You earn points through various activities: 1 point for every ₹10 spent, 20 points for completing your profile, 20 points for recycling garments, 5 points for bringing your own bag, and 50 points for successful referrals. Points are updated within 24 hours.',
      category: 'Promotions & Rewards',
      priority: 'high',
      views: 980,
      helpful: 38,
      notHelpful: 2,
      createdAt: '2024-01-14',
      updatedAt: '2024-01-17',
      isActive: true,
      language: 'en'
    },
    {
      id: 3,
      title: 'How can I track my order?',
      detail: 'Once your order is confirmed, you will receive a tracking number via email and SMS. You can track your order status in real-time through our website or mobile app. Enter your order number and email address on the tracking page.',
      category: 'Orders & Shipping',
      priority: 'medium',
      views: 750,
      helpful: 32,
      notHelpful: 1,
      createdAt: '2024-01-13',
      updatedAt: '2024-01-16',
      isActive: true,
      language: 'en'
    },
    {
      id: 4,
      title: 'What is your return policy?',
      detail: 'You can return items within 30 days of purchase. Items must be in original condition with tags attached. Return shipping is free for defective items. For other returns, shipping charges may apply. Refunds are processed within 5-7 business days.',
      category: 'Returns & Refunds',
      priority: 'high',
      views: 1100,
      helpful: 41,
      notHelpful: 4,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-15',
      isActive: true,
      language: 'en'
    },
    {
      id: 5,
      title: 'What payment methods do you accept?',
      detail: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI payments, net banking, and digital wallets like PayPal, Google Pay, and Apple Pay. All transactions are secured with 256-bit SSL encryption.',
      category: 'Payments',
      priority: 'medium',
      views: 650,
      helpful: 28,
      notHelpful: 2,
      createdAt: '2024-01-11',
      updatedAt: '2024-01-14',
      isActive: true,
      language: 'en'
    }
  ]);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = 
        faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.detail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory && faq.isActive;
    });
  }, [faqs, searchTerm, selectedCategory]);

  // Statistics
  const stats = useMemo(() => {
    const total = faqs.filter(faq => faq.isActive).length;
    const totalViews = faqs.reduce((sum, faq) => sum + faq.views, 0);
    const totalHelpful = faqs.reduce((sum, faq) => sum + faq.helpful, 0);
    const totalNotHelpful = faqs.reduce((sum, faq) => sum + faq.notHelpful, 0);
    const helpfulRate = totalHelpful + totalNotHelpful > 0 
      ? ((totalHelpful / (totalHelpful + totalNotHelpful)) * 100).toFixed(1)
      : 0;
    
    return { total, totalViews, totalHelpful, helpfulRate };
  }, [faqs]);

  const handleCreateFaq = useCallback(() => {
    if (!faqTitle.trim() || !faqDetail.trim() || !faqCategory) return;
    
    const newFaq = {
      id: Date.now(),
      title: faqTitle.trim(),
      detail: faqDetail.trim(),
      category: faqCategory,
      priority: faqPriority,
      views: 0,
      helpful: 0,
      notHelpful: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      isActive: true,
      language: 'en'
    };
    
    setFaqs(prev => [newFaq, ...prev]);
    setFaqTitle('');
    setFaqDetail('');
    setFaqCategory('');
    setFaqPriority('medium');
    setShowCreateModal(false);
  }, [faqTitle, faqDetail, faqCategory, faqPriority]);

  const handleEditFaq = useCallback(() => {
    if (!editingFaq || !faqTitle.trim() || !faqDetail.trim() || !faqCategory) return;
    
    setFaqs(prev => prev.map(faq => 
      faq.id === editingFaq.id 
        ? {
            ...faq,
            title: faqTitle.trim(),
            detail: faqDetail.trim(),
            category: faqCategory,
            priority: faqPriority,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : faq
    ));
    
    setEditingFaq(null);
    setFaqTitle('');
    setFaqDetail('');
    setFaqCategory('');
    setFaqPriority('medium');
    setShowEditModal(false);
  }, [editingFaq, faqTitle, faqDetail, faqCategory, faqPriority]);

  const handleDeleteFaq = useCallback(() => {
    if (!faqToDelete) return;
    
    setFaqs(prev => prev.map(faq => 
      faq.id === faqToDelete.id 
        ? { ...faq, isActive: false }
        : faq
    ));
    
    setFaqToDelete(null);
    setShowDeleteModal(false);
  }, [faqToDelete]);

  const toggleExpanded = useCallback((faqId) => {
    setExpandedFaqs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  }, []);

  const openEditModal = useCallback((faq) => {
    setEditingFaq(faq);
    setFaqTitle(faq.title);
    setFaqDetail(faq.detail);
    setFaqCategory(faq.category);
    setFaqPriority(faq.priority);
    setShowEditModal(true);
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      low: 'bg-green-100 text-green-800 border border-green-200'
    };
    return colors[priority] || colors.medium;
  }, []);

  const getPriorityIcon = useCallback((priority) => {
    const icons = {
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    };
    return icons[priority] || icons.medium;
  }, []);

  const getCategoryIcon = useCallback((category) => {
    const icons = {
      'General': '📋',
      'Account & Membership': '👤',
      'Orders & Shipping': '📦',
      'Returns & Refunds': '🔄',
      'Payments': '💳',
      'Technical Support': '🔧',
      'Privacy & Security': '🔒',
      'Promotions & Rewards': '🎁'
    };
    return icons[category] || '❓';
  }, []);

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: faqs.filter(f => f.isActive).length }
  ].concat(
    categories.map(cat => ({
      value: cat,
      label: cat,
      count: faqs.filter(f => f.category === cat && f.isActive).length
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
                ❓ FAQ Management
              </h1>
              <p className="text-zinc-300 mt-2">Create and manage frequently asked questions</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm"
              >
                ➕ Add FAQ
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
                <span className="text-2xl">❓</span>
                <div>
                  <div className="text-xl font-bold text-blue-400">{stats.total}</div>
                  <div className="text-sm text-blue-300">Total FAQs</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👁️</span>
                <div>
                  <div className="text-xl font-bold text-purple-400">{stats.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-purple-300">Total Views</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👍</span>
                <div>
                  <div className="text-xl font-bold text-green-400">{stats.totalHelpful}</div>
                  <div className="text-sm text-green-300">Helpful Votes</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-xl font-bold text-yellow-400">{stats.helpfulRate}%</div>
                  <div className="text-sm text-yellow-300">Helpful Rate</div>
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
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCategory(option.value)}
                  className={`whitespace-nowrap px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === option.value
                      ? 'bg-white text-black'
                      : 'bg-black/30 text-zinc-300 hover:bg-black/40 hover:text-white'
                  }`}
                >
                  <span>{option.value !== 'all' ? getCategoryIcon(option.value) : '📂'}</span>
                  <span>{option.label}</span>
                  <span className="bg-zinc-700 px-2 py-1 rounded-full text-xs">{option.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs List */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              FAQs ({filteredFaqs.length})
            </h2>

            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className="bg-black/30 border border-zinc-700 rounded-xl p-6 hover:bg-black/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{getCategoryIcon(faq.category)}</span>
                        <h3 
                          className="text-lg font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors"
                          onClick={() => toggleExpanded(faq.id)}
                        >
                          {faq.title}
                        </h3>
                        <button
                          onClick={() => toggleExpanded(faq.id)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          {expandedFaqs.has(faq.id) ? '➖' : '➕'}
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-zinc-400 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(faq.priority)}`}>
                          {getPriorityIcon(faq.priority)} {faq.priority.charAt(0).toUpperCase() + faq.priority.slice(1)}
                        </span>
                        <span>📂 {faq.category}</span>
                        <span>👁️ {faq.views} views</span>
                        <span>👍 {faq.helpful}</span>
                        <span>📅 {new Date(faq.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(faq)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => {
                          setFaqToDelete(faq);
                          setShowDeleteModal(true);
                        }}
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-2 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 flex items-center gap-1 text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  
                  {expandedFaqs.has(faq.id) && (
                    <div className="bg-black/20 border border-zinc-600 rounded-lg p-4 mt-4">
                      <p className="text-zinc-300 leading-relaxed">{faq.detail}</p>
                    </div>
                  )}
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❓</div>
                  <div className="text-zinc-400 text-lg">No FAQs found</div>
                  <div className="text-zinc-500 text-sm mt-2">Try adjusting your search or create a new FAQ</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create FAQ Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Create New FAQ</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                  <select
                    value={faqCategory}
                    onChange={(e) => setFaqCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Priority</label>
                  <select
                    value={faqPriority}
                    onChange={(e) => setFaqPriority(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Question</label>
                  <input
                    type="text"
                    value={faqTitle}
                    onChange={(e) => setFaqTitle(e.target.value)}
                    placeholder="Enter the FAQ question..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Answer</label>
                  <textarea
                    value={faqDetail}
                    onChange={(e) => setFaqDetail(e.target.value)}
                    placeholder="Enter the detailed answer..."
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    rows={6}
                  />
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
                  onClick={handleCreateFaq}
                  disabled={!faqTitle.trim() || !faqDetail.trim() || !faqCategory}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➕ Create FAQ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit FAQ Modal */}
        {showEditModal && editingFaq && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Edit FAQ</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ❌
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                  <select
                    value={faqCategory}
                    onChange={(e) => setFaqCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Priority</label>
                  <select
                    value={faqPriority}
                    onChange={(e) => setFaqPriority(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Question</label>
                  <input
                    type="text"
                    value={faqTitle}
                    onChange={(e) => setFaqTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Answer</label>
                  <textarea
                    value={faqDetail}
                    onChange={(e) => setFaqDetail(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    rows={6}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditFaq}
                  disabled={!faqTitle.trim() || !faqDetail.trim() || !faqCategory}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✏️ Update FAQ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && faqToDelete && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🗑️</div>
                <h3 className="text-2xl font-bold text-white mb-2">Delete FAQ</h3>
                <p className="text-zinc-400">Are you sure you want to delete this FAQ?</p>
                <p className="text-zinc-500 text-sm mt-2">"{faqToDelete.title}"</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFaq}
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

export default FaqManagement;
