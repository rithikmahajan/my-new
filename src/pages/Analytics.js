import React, { useState, useMemo } from 'react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data - in real app, this would come from API
  const analyticsData = useMemo(() => ({
    overview: {
      totalRevenue: 45230,
      totalOrders: 1324,
      totalUsers: 8942,
      averageOrderValue: 156.80,
      revenueChange: 12.5,
      ordersChange: -2.1,
      usersChange: 8.7,
      aovChange: 4.2
    },
    chartData: {
      revenue: [
        { day: 'Mon', value: 6200 },
        { day: 'Tue', value: 5800 },
        { day: 'Wed', value: 7100 },
        { day: 'Thu', value: 6500 },
        { day: 'Fri', value: 8200 },
        { day: 'Sat', value: 9100 },
        { day: 'Sun', value: 7300 }
      ],
      topProducts: [
        { name: 'T-shirt', sales: 245, revenue: 12250 },
        { name: 'Jeans', sales: 189, revenue: 15120 },
        { name: 'Sneakers', sales: 156, revenue: 18720 },
        { name: 'Jacket', sales: 134, revenue: 20100 },
        { name: 'Dress', sales: 98, revenue: 9800 }
      ],
      userActivity: [
        { hour: '00:00', users: 245 },
        { hour: '04:00', users: 189 },
        { hour: '08:00', users: 456 },
        { hour: '12:00', users: 789 },
        { hour: '16:00', users: 634 },
        { hour: '20:00', users: 567 }
      ]
    }
  }), []);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-white' : 'text-zinc-400';
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? '↗' : '↘';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-zinc-400 mt-2">Monitor your business performance and trends</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="bg-gradient-to-r from-zinc-700 to-zinc-800 text-white px-4 py-3 rounded-lg flex items-center space-x-2 hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 border border-zinc-600"
              >
                <span className={isLoading ? 'animate-spin' : ''}>🔄</span>
                <span>Refresh</span>
              </button>
              <button className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-zinc-200 hover:to-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                <span>📥</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Time Period Filter */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 mb-6 border border-zinc-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span>📅</span>
              <span className="text-lg font-semibold text-white">Time Period</span>
            </div>
            <div className="flex space-x-2">
              {['1d', '7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-white text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600'
                  }`}
                >
                  {period === '1d' ? 'Today' : 
                   period === '7d' ? '7 Days' :
                   period === '30d' ? '30 Days' :
                   '90 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-white to-zinc-200">
                <span className="text-black text-xl">💰</span>
              </div>
              <span className={`text-sm font-medium ${getChangeColor(analyticsData.overview.revenueChange)}`}>
                {getChangeIcon(analyticsData.overview.revenueChange)} {Math.abs(analyticsData.overview.revenueChange)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${analyticsData.overview.totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-white to-zinc-200">
                <span className="text-black text-xl">🛒</span>
              </div>
              <span className={`text-sm font-medium ${getChangeColor(analyticsData.overview.ordersChange)}`}>
                {getChangeIcon(analyticsData.overview.ordersChange)} {Math.abs(analyticsData.overview.ordersChange)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-white">{analyticsData.overview.totalOrders.toLocaleString()}</p>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-white to-zinc-200">
                <span className="text-black text-xl">👥</span>
              </div>
              <span className={`text-sm font-medium ${getChangeColor(analyticsData.overview.usersChange)}`}>
                {getChangeIcon(analyticsData.overview.usersChange)} {Math.abs(analyticsData.overview.usersChange)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-white">{analyticsData.overview.totalUsers.toLocaleString()}</p>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-white to-zinc-200">
                <span className="text-black text-xl">📊</span>
              </div>
              <span className={`text-sm font-medium ${getChangeColor(analyticsData.overview.aovChange)}`}>
                {getChangeIcon(analyticsData.overview.aovChange)} {Math.abs(analyticsData.overview.aovChange)}%
              </span>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Avg Order Value</p>
              <p className="text-2xl font-bold text-white">${analyticsData.overview.averageOrderValue}</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-6">Revenue Trend</h3>
            <div className="h-64 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-zinc-400 text-sm">Revenue chart visualization</p>
                <div className="mt-4 flex justify-center space-x-4">
                  {analyticsData.chartData.revenue.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-zinc-400 mb-1">{item.day}</div>
                      <div className="text-sm text-white font-semibold">${(item.value/1000).toFixed(1)}k</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Activity Chart */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-6">User Activity</h3>
            <div className="h-64 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
              <div className="text-center">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-zinc-400 text-sm">User activity chart visualization</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  {analyticsData.chartData.userActivity.slice(0, 3).map((item, index) => (
                    <div key={index}>
                      <div className="text-xs text-zinc-400 mb-1">{item.hour}</div>
                      <div className="text-sm text-white font-semibold">{item.users}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold text-white mb-6">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-700">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">Sales</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {analyticsData.chartData.topProducts.map((product, index) => (
                  <tr key={product.name} className="hover:bg-zinc-900/50 transition-colors duration-300">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-white to-zinc-200 rounded-lg flex items-center justify-center text-black font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-zinc-300">{product.sales} units</td>
                    <td className="py-4 px-4 text-white font-semibold">${product.revenue.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-white to-zinc-300 h-2 rounded-full"
                          style={{ width: `${(product.sales / 245) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-1">Conversion Rate</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">3.2%</p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 text-center">
            <div className="text-4xl mb-2">⏱️</div>
            <h3 className="text-lg font-semibold text-white mb-1">Avg Session</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">4:32</p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 text-center">
            <div className="text-4xl mb-2">🔄</div>
            <h3 className="text-lg font-semibold text-white mb-1">Return Rate</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">68%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
