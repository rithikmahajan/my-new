import React, { useState } from 'react';

const Users = () => {
  // Sample user data
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      joined: '2024-01-15',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      status: 'Active',
      joined: '2024-02-20',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      status: 'Inactive',
      joined: '2024-03-10',
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Editor',
      status: 'Active',
      joined: '2024-01-25',
      avatar: 'SW'
    },
    {
      id: 5,
      name: 'Alex Brown',
      email: 'alex.brown@example.com',
      role: 'User',
      status: 'Active',
      joined: '2024-03-05',
      avatar: 'AB'
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'User',
      status: 'Active',
      joined: '2024-02-15',
      avatar: 'ED'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-gradient-to-r from-white to-zinc-200 text-black';
      case 'Editor':
        return 'bg-gradient-to-r from-zinc-400 to-zinc-600 text-white';
      case 'User':
        return 'bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600';
      default:
        return 'bg-zinc-800 text-white';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-gradient-to-r from-white to-zinc-200 text-black'
      : 'bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-zinc-400 mt-2">Manage system users and permissions</p>
            </div>
            <button className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-zinc-200 hover:to-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
              <span>+</span>
              <span>Add User</span>
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white placeholder-zinc-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
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
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-white to-zinc-200 rounded-full flex items-center justify-center text-black font-bold mr-4">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                  <p className="text-zinc-400 text-sm">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Role:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-sm">Joined:</span>
                  <span className="text-white text-sm">{user.joined}</span>
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

        {/* Users Table */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
          <div className="px-6 py-4 border-b border-zinc-700">
            <h3 className="text-xl font-bold text-white">All Users</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-black divide-y divide-zinc-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-900/50 transition-all duration-300">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-white to-zinc-200 rounded-full flex items-center justify-center text-black font-bold mr-4">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-zinc-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{user.joined}</td>
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
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">{users.length}</p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              {users.filter(user => user.status === 'Active').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Admins</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              {users.filter(user => user.role === 'Admin').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">This Month</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">+12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
