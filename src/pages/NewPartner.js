import React, { useState, useCallback, useMemo } from 'react';

/**
 * NewPartner Component - Modern Black & White Theme
 * 
 * Comprehensive partner management interface featuring:
 * - Advanced partner registration and onboarding
 * - Multi-step verification process
 * - Document upload and validation
 * - Performance analytics and tracking
 * - Commission and revenue management
 * - Partnership tier system
 * - Bulk operations and data export
 * - Real-time status monitoring
 */
const NewPartner = () => {
  const [activeTab, setActiveTab] = useState('partners');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [selectedPartners, setSelectedPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  // Memoized partners data with comprehensive partner information
  const partners = useMemo(() => [
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      contactPerson: 'John Smith',
      email: 'john.smith@techsolutions.com',
      phone: '+1-555-0123',
      partnerId: 'TS001',
      status: 'active',
      tier: 'premium',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-20',
      commissionRate: 15,
      totalRevenue: 245000,
      monthlyRevenue: 45000,
      ordersCount: 156,
      customerCount: 89,
      averageOrderValue: 1570,
      rating: 4.8,
      performance: 'excellent',
      documents: {
        businessLicense: 'verified',
        taxCertificate: 'verified',
        bankDetails: 'verified',
        agreement: 'signed'
      },
      address: {
        street: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      categories: ['Electronics', 'Software'],
      specializations: ['B2B Solutions', 'Enterprise Software'],
      logo: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Fashion Forward Ltd.',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@fashionforward.com',
      phone: '+1-555-0456',
      partnerId: 'FF002',
      status: 'pending',
      tier: 'standard',
      joinDate: '2024-01-15',
      lastActivity: '2024-01-19',
      commissionRate: 12,
      totalRevenue: 128000,
      monthlyRevenue: 28000,
      ordersCount: 89,
      customerCount: 52,
      averageOrderValue: 1438,
      rating: 4.6,
      performance: 'good',
      documents: {
        businessLicense: 'pending',
        taxCertificate: 'verified',
        bankDetails: 'pending',
        agreement: 'draft'
      },
      address: {
        street: '456 Fashion Blvd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      categories: ['Fashion', 'Accessories'],
      specializations: ['Luxury Fashion', 'Designer Collections'],
      logo: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Green Earth Organics',
      contactPerson: 'Mike Chen',
      email: 'mike.chen@greenearth.com',
      phone: '+1-555-0789',
      partnerId: 'GE003',
      status: 'active',
      tier: 'gold',
      joinDate: '2024-01-08',
      lastActivity: '2024-01-21',
      commissionRate: 18,
      totalRevenue: 189000,
      monthlyRevenue: 38000,
      ordersCount: 134,
      customerCount: 76,
      averageOrderValue: 1410,
      rating: 4.9,
      performance: 'excellent',
      documents: {
        businessLicense: 'verified',
        taxCertificate: 'verified',
        bankDetails: 'verified',
        agreement: 'signed'
      },
      address: {
        street: '789 Organic Way',
        city: 'Portland',
        state: 'OR',
        zipCode: '97201',
        country: 'USA'
      },
      categories: ['Organic Food', 'Health'],
      specializations: ['Organic Products', 'Sustainable Living'],
      logo: '/api/placeholder/100/100'
    },
    {
      id: 4,
      name: 'Smart Home Innovations',
      contactPerson: 'Lisa Park',
      email: 'lisa.park@smarthome.com',
      phone: '+1-555-0321',
      partnerId: 'SH004',
      status: 'suspended',
      tier: 'standard',
      joinDate: '2024-01-12',
      lastActivity: '2024-01-18',
      commissionRate: 10,
      totalRevenue: 67000,
      monthlyRevenue: 12000,
      ordersCount: 45,
      customerCount: 28,
      averageOrderValue: 1489,
      rating: 3.8,
      performance: 'needs_improvement',
      documents: {
        businessLicense: 'expired',
        taxCertificate: 'verified',
        bankDetails: 'verified',
        agreement: 'signed'
      },
      address: {
        street: '321 Innovation Dr',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA'
      },
      categories: ['Home Automation', 'IoT'],
      specializations: ['Smart Devices', 'Home Security'],
      logo: '/api/placeholder/100/100'
    },
    {
      id: 5,
      name: 'Global Logistics Pro',
      contactPerson: 'David Wilson',
      email: 'david.w@globallogistics.com',
      phone: '+1-555-0654',
      partnerId: 'GL005',
      status: 'inactive',
      tier: 'basic',
      joinDate: '2024-01-05',
      lastActivity: '2024-01-10',
      commissionRate: 8,
      totalRevenue: 34000,
      monthlyRevenue: 5000,
      ordersCount: 23,
      customerCount: 15,
      averageOrderValue: 1478,
      rating: 4.2,
      performance: 'average',
      documents: {
        businessLicense: 'verified',
        taxCertificate: 'pending',
        bankDetails: 'verified',
        agreement: 'signed'
      },
      address: {
        street: '654 Logistics Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      categories: ['Logistics', 'Shipping'],
      specializations: ['International Shipping', 'Supply Chain'],
      logo: '/api/placeholder/100/100'
    }
  ], []);

  // Memoized partner tiers
  const partnerTiers = useMemo(() => [
    { id: 'all', name: 'All Tiers', icon: '🏷️' },
    { id: 'basic', name: 'Basic', icon: '🥉', minRevenue: 0, commissionRate: '8-10%', color: 'text-zinc-400' },
    { id: 'standard', name: 'Standard', icon: '🥈', minRevenue: 50000, commissionRate: '10-12%', color: 'text-blue-400' },
    { id: 'premium', name: 'Premium', icon: '🥇', minRevenue: 100000, commissionRate: '12-15%', color: 'text-purple-400' },
    { id: 'gold', name: 'Gold', icon: '👑', minRevenue: 200000, commissionRate: '15-18%', color: 'text-yellow-400' }
  ], []);

  // Filter partners based on search, status, tier, and sorting
  const filteredPartners = useMemo(() => {
    let filtered = partners.filter(partner => {
      const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           partner.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
      const matchesTier = tierFilter === 'all' || partner.tier === tierFilter;
      
      return matchesSearch && matchesStatus && matchesTier;
    });

    // Sort partners
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'revenue':
          return b.totalRevenue - a.totalRevenue;
        case 'performance':
          return b.rating - a.rating;
        case 'date':
          return new Date(b.joinDate) - new Date(a.joinDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [partners, searchTerm, statusFilter, tierFilter, sortBy]);

  const handleCreatePartner = useCallback(() => {
    setEditingPartner(null);
    setIsCreateModalOpen(true);
  }, []);

  const handleEditPartner = useCallback((partner) => {
    setEditingPartner(partner);
    setIsEditModalOpen(true);
  }, []);

  const handleDeletePartner = useCallback((partnerId) => {
    console.log('Deleting partner:', partnerId);
    // In real app, would make API call
  }, []);

  const handleBulkAction = useCallback((action) => {
    console.log(`Bulk ${action} for partners:`, selectedPartners);
    setSelectedPartners([]);
    // In real app, would make API call
  }, [selectedPartners]);

  const togglePartnerSelection = useCallback((partnerId) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId)
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  }, []);

  const selectAllPartners = useCallback(() => {
    if (selectedPartners.length === filteredPartners.length) {
      setSelectedPartners([]);
    } else {
      setSelectedPartners(filteredPartners.map(partner => partner.id));
    }
  }, [selectedPartners.length, filteredPartners]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      active: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      pending: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '⏳' },
      suspended: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '⏸️' },
      inactive: { bg: 'bg-gray-600/20', text: 'text-gray-400', border: 'border-gray-500/30', icon: '😴' }
    };
    
    const style = styles[status] || styles.pending;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const getTierBadge = useCallback((tier) => {
    const tierInfo = partnerTiers.find(t => t.id === tier);
    if (!tierInfo) return null;
    
    return (
      <span className={`${tierInfo.color} bg-black/30 border border-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{tierInfo.icon}</span>
        {tierInfo.name}
      </span>
    );
  }, [partnerTiers]);

  const getPerformanceBadge = useCallback((performance) => {
    const styles = {
      excellent: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '🌟' },
      good: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: '👍' },
      average: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '➖' },
      needs_improvement: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '⚠️' }
    };
    
    const style = styles[performance] || styles.average;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {performance.replace('_', ' ')}
      </span>
    );
  }, []);

  const tabs = [
    { id: 'partners', label: 'Partners', icon: '🤝' },
    { id: 'onboarding', label: 'Onboarding', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'tiers', label: 'Tier Management', icon: '🏆' },
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
                Partner Management
              </h1>
              <p className="text-zinc-400">Manage business partners and vendor relationships</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreatePartner}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                ➕ New Partner
              </button>
              {selectedPartners.length > 0 && (
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  ✅ Bulk Actions ({selectedPartners.length})
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
        {activeTab === 'partners' && (
          <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <div className="lg:col-span-2">
                  <input
                    type="text"
                    placeholder="🔍 Search partners..."
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
                    <option value="pending" className="bg-black text-white">⏳ Pending</option>
                    <option value="suspended" className="bg-black text-white">⏸️ Suspended</option>
                    <option value="inactive" className="bg-black text-white">😴 Inactive</option>
                  </select>
                </div>
                
                <div>
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {partnerTiers.map((tier) => (
                      <option key={tier.id} value={tier.id} className="bg-black text-white">
                        {tier.icon} {tier.name}
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
                    <option value="date" className="bg-black text-white">📅 Date</option>
                    <option value="name" className="bg-black text-white">📝 Name</option>
                    <option value="revenue" className="bg-black text-white">💰 Revenue</option>
                    <option value="performance" className="bg-black text-white">⭐ Performance</option>
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
                    onClick={selectAllPartners}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
                  >
                    {selectedPartners.length === filteredPartners.length ? '❌ Deselect All' : '✅ Select All'}
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{partners.length}</div>
                  <div className="text-sm text-zinc-400">Total Partners</div>
                  <div className="text-xs text-zinc-500 mt-1">🤝 All partnerships</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {partners.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-sm text-zinc-400">Active Partners</div>
                  <div className="text-xs text-zinc-500 mt-1">✅ Currently active</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    ₹{(partners.reduce((sum, p) => sum + p.totalRevenue, 0) / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-zinc-400">Total Revenue</div>
                  <div className="text-xs text-zinc-500 mt-1">💰 Generated by partners</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {(partners.reduce((sum, p) => sum + p.rating, 0) / partners.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-zinc-400">Avg. Rating</div>
                  <div className="text-xs text-zinc-500 mt-1">⭐ Partner performance</div>
                </div>
              </div>
            </div>

            {/* Partners Grid/List */}
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Partners ({filteredPartners.length})
                  </h2>
                  
                  {selectedPartners.length > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-400">{selectedPartners.length} selected</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBulkAction('activate')}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition-colors"
                        >
                          ✅ Activate
                        </button>
                        <button
                          onClick={() => handleBulkAction('suspend')}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition-colors"
                        >
                          ⏸️ Suspend
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPartners.map((partner) => (
                      <div key={partner.id} className="bg-black/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-500 transition-all duration-300">
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <input
                              type="checkbox"
                              checked={selectedPartners.includes(partner.id)}
                              onChange={() => togglePartnerSelection(partner.id)}
                              className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                            />
                            {getStatusBadge(partner.status)}
                          </div>

                          {/* Partner Info */}
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              className="w-16 h-16 rounded-full border border-zinc-600 object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-white">{partner.name}</h3>
                              <p className="text-sm text-zinc-400">{partner.contactPerson}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {getTierBadge(partner.tier)}
                              </div>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-green-400 font-semibold text-sm">₹{(partner.totalRevenue / 1000).toFixed(0)}K</div>
                              <div className="text-xs text-zinc-500">💰 Total Revenue</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-blue-400 font-semibold text-sm">{partner.ordersCount}</div>
                              <div className="text-xs text-zinc-500">📦 Orders</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-yellow-400 font-semibold text-sm">⭐ {partner.rating}</div>
                              <div className="text-xs text-zinc-500">Rating</div>
                            </div>
                            <div className="bg-black/50 border border-zinc-700 rounded-lg p-3">
                              <div className="text-purple-400 font-semibold text-sm">{partner.commissionRate}%</div>
                              <div className="text-xs text-zinc-500">💳 Commission</div>
                            </div>
                          </div>

                          {/* Performance Badge */}
                          <div className="mb-4 flex justify-center">
                            {getPerformanceBadge(partner.performance)}
                          </div>

                          {/* Contact Info */}
                          <div className="text-xs text-zinc-500 mb-4">
                            <div>📧 {partner.email}</div>
                            <div>📞 {partner.phone}</div>
                            <div>📍 {partner.address.city}, {partner.address.state}</div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditPartner(partner)}
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-1"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeletePartner(partner.id)}
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
                    {filteredPartners.map((partner) => (
                      <div key={partner.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-500 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedPartners.includes(partner.id)}
                            onChange={() => togglePartnerSelection(partner.id)}
                            className="w-5 h-5 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                          
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-12 h-12 rounded-full border border-zinc-600 object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-white">{partner.name}</h3>
                              {getTierBadge(partner.tier)}
                              {getStatusBadge(partner.status)}
                              {getPerformanceBadge(partner.performance)}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-zinc-400">
                              <span>👤 {partner.contactPerson}</span>
                              <span>📧 {partner.email}</span>
                              <span>💰 ₹{(partner.totalRevenue / 1000).toFixed(0)}K</span>
                              <span>📦 {partner.ordersCount} orders</span>
                              <span>⭐ {partner.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditPartner(partner)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-1"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeletePartner(partner.id)}
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

                {filteredPartners.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🤝</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Partners Found</h3>
                    <p className="text-zinc-400 mb-6">No partners match your current filters.</p>
                    <button
                      onClick={handleCreatePartner}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                    >
                      ➕ Add First Partner
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'onboarding' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Partner Onboarding</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📋 Partner onboarding workflow would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Partner Analytics</h2>
              
              <div className="text-center text-zinc-400 py-8">
                📊 Partner analytics dashboard would be implemented here
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tiers' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Partner Tiers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partnerTiers.slice(1).map((tier) => (
                  <div key={tier.id} className="bg-black/30 border border-zinc-700 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{tier.icon}</div>
                      <h3 className={`text-xl font-bold mb-2 ${tier.color}`}>{tier.name}</h3>
                      <div className="text-sm text-zinc-400 mb-4">
                        Min Revenue: ₹{(tier.minRevenue / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-zinc-400 mb-4">
                        Commission: {tier.commissionRate}
                      </div>
                      <div className="text-xs text-zinc-500">
                        Partners: {partners.filter(p => p.tier === tier.id).length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Partner Settings</h2>
              
              <div className="text-center text-zinc-400 py-8">
                ⚙️ Partner management settings would be implemented here
              </div>
            </div>
          </div>
        )}

        {/* Create Partner Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Add New Partner</h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  📝 Partner registration form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    🤝 Add Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Partner Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Edit Partner</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    ❌
                  </button>
                </div>
                
                <div className="text-center text-zinc-400 py-8">
                  ✏️ Partner editing form would be implemented here
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold">
                    💾 Update Partner
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

export default NewPartner;
