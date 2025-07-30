import React, { useState } from 'react';

const Products = () => {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      status: 'Active',
      image: 'WH',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Running Shoes',
      category: 'Sports',
      price: 129.99,
      stock: 23,
      status: 'Active',
      image: 'RS',
      created: '2024-02-10'
    },
    {
      id: 3,
      name: 'Coffee Maker',
      category: 'Kitchen',
      price: 89.99,
      stock: 0,
      status: 'Out of Stock',
      image: 'CM',
      created: '2024-03-05'
    },
    {
      id: 4,
      name: 'Smartphone Case',
      category: 'Electronics',
      price: 24.99,
      stock: 156,
      status: 'Active',
      image: 'SC',
      created: '2024-01-20'
    },
    {
      id: 5,
      name: 'Yoga Mat',
      category: 'Sports',
      price: 49.99,
      stock: 78,
      status: 'Active',
      image: 'YM',
      created: '2024-02-28'
    },
    {
      id: 6,
      name: 'Desk Lamp',
      category: 'Home',
      price: 79.99,
      stock: 12,
      status: 'Low Stock',
      image: 'DL',
      created: '2024-03-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-gradient-to-r from-white to-zinc-200 text-black';
      case 'Low Stock':
        return 'bg-gradient-to-r from-zinc-400 to-zinc-600 text-white';
      case 'Out of Stock':
        return 'bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600';
      default:
        return 'bg-zinc-800 text-white';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 20) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-zinc-400 mt-2">Manage your product inventory and catalog</p>
            </div>
            <button className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-zinc-200 hover:to-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
              <span>+</span>
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 mb-6 border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <span className="absolute left-3 top-3 text-zinc-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-zinc-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Sports">Sports</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Home">Home</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-white to-zinc-200 rounded-lg flex items-center justify-center text-black font-bold mr-4 text-lg">
                  {product.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                  <p className="text-zinc-400 text-sm">{product.category}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Price:</span>
                  <span className="text-xl font-bold text-white">${product.price}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Stock:</span>
                  <span className="text-white font-semibold">{product.stock} units</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(getStockStatus(product.stock))}`}>
                    {getStockStatus(product.stock)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Created:</span>
                  <span className="text-white text-sm">{product.created}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-zinc-700">
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                  <span>👁</span>
                </button>
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                  <span>✏️</span>
                </button>
                <button className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all duration-300">
                  <span>🗑️</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
          <div className="px-6 py-4 border-b border-zinc-700">
            <h3 className="text-xl font-bold text-white">Product Inventory</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-zinc-800">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-900/50 transition-all duration-300">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-white to-zinc-200 rounded-lg flex items-center justify-center text-black font-bold mr-4">
                          {product.image}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{product.name}</div>
                          <div className="text-sm text-zinc-400">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{product.stock} units</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(getStockStatus(product.stock))}`}>
                        {getStockStatus(product.stock)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>👁</span>
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>✏️</span>
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all duration-300">
                          <span>🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Total Products</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">{products.length}</p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Active Products</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              {products.filter(product => product.stock > 0).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Low Stock</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              {products.filter(product => product.stock > 0 && product.stock < 20).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Out of Stock</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-zinc-700 to-zinc-800 bg-clip-text text-transparent">
              {products.filter(product => product.stock === 0).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
