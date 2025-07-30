import React, { useState, useMemo, useCallback } from 'react';

/**
 * Logs and Error Tracking Component - Modern Black & White Theme
 * 
 * Comprehensive error tracking and logging interface featuring:
 * - Real-time error monitoring and log viewing
 * - Error severity filtering (Critical, Warning, Info, Debug)
 * - Log source filtering (Frontend, Backend, Database, API)
 * - Time-based filtering and search functionality
 * - Error details modal with stack traces
 * - Export functionality for log analysis
 * - Performance metrics and error statistics
 * - Real-time monitoring and alerting
 * - Error pattern analysis and insights
 */
const LogsAndErrorTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('last 24 hours');
  const [selectedError, setSelectedError] = useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [selectedLogs, setSelectedLogs] = useState([]);

  // Memoized error statistics with comprehensive metrics
  const errorStats = useMemo(() => ({
    totalErrors: 1247,
    criticalErrors: 23,
    warnings: 156,
    infoLogs: 1068,
    errorRate: '2.3%',
    avgResponseTime: '245ms',
    uptime: '99.8%',
    resolved: 89,
    unresolved: 67,
    trends: {
      errors: '+12%',
      warnings: '-5%',
      response: '+8ms'
    }
  }), []);

  // Memoized severity types with styling
  const severityTypes = useMemo(() => [
    { 
      id: 'critical', 
      name: 'Critical', 
      icon: '🚨', 
      color: 'text-red-400', 
      bg: 'bg-red-600/20', 
      border: 'border-red-500/30',
      description: 'Critical system errors'
    },
    { 
      id: 'warning', 
      name: 'Warning', 
      icon: '⚠️', 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-600/20', 
      border: 'border-yellow-500/30',
      description: 'Warning messages'
    },
    { 
      id: 'info', 
      name: 'Info', 
      icon: 'ℹ️', 
      color: 'text-blue-400', 
      bg: 'bg-blue-600/20', 
      border: 'border-blue-500/30',
      description: 'Information logs'
    },
    { 
      id: 'debug', 
      name: 'Debug', 
      icon: '🐛', 
      color: 'text-purple-400', 
      bg: 'bg-purple-600/20', 
      border: 'border-purple-500/30',
      description: 'Debug information'
    }
  ], []);

  // Memoized log sources
  const logSources = useMemo(() => [
    { id: 'frontend', name: 'Frontend', icon: '🌐', description: 'React application errors' },
    { id: 'backend', name: 'Backend', icon: '⚙️', description: 'Server-side errors' },
    { id: 'database', name: 'Database', icon: '🗄️', description: 'Database-related errors' },
    { id: 'api', name: 'API', icon: '🔗', description: 'API endpoint errors' },
    { id: 'system', name: 'System', icon: '💻', description: 'System-level errors' }
  ], []);

  // Memoized error logs with comprehensive details
  const errorLogs = useMemo(() => [
    {
      id: 1,
      timestamp: '2025-07-30 14:32:15',
      severity: 'critical',
      source: 'frontend',
      message: 'Uncaught TypeError: Cannot read property "id" of undefined',
      user: 'user123@example.com',
      url: '/cart-recovery',
      stackTrace: `at CartComponent.render (CartComponent.js:45:12)
at ReactDOM.render (react-dom.js:2847:5)
at Object.updateContainer (react-reconciler.js:2654:2)
at HTMLDocument.callback (index.js:2847:15)`,
      errorCode: 'JS_001',
      count: 15,
      status: 'unresolved',
      assignedTo: 'John Developer',
      tags: ['cart', 'ui', 'critical'],
      lastOccurrence: '2025-07-30 14:32:15',
      firstOccurrence: '2025-07-30 09:15:23',
      affectedUsers: 87,
      browserInfo: 'Chrome 119.0.0.0, Windows 10'
    },
    {
      id: 2,
      timestamp: '2025-07-30 14:28:42',
      severity: 'warning',
      source: 'backend',
      message: 'Database connection timeout - retrying connection',
      user: 'system',
      url: '/api/orders',
      stackTrace: `at DatabaseConnection.connect (db.js:156:8)
at OrderService.getOrders (orders.js:23:12)
at Controller.handleRequest (controller.js:89:5)`,
      errorCode: 'DB_002',
      count: 8,
      status: 'investigating',
      assignedTo: 'Sarah Backend',
      tags: ['database', 'timeout', 'api'],
      lastOccurrence: '2025-07-30 14:28:42',
      firstOccurrence: '2025-07-30 13:45:12',
      affectedUsers: 23,
      serverInfo: 'Node.js 18.17.0, Ubuntu 20.04'
    },
    {
      id: 3,
      timestamp: '2025-07-30 14:25:18',
      severity: 'info',
      source: 'api',
      message: 'User authentication successful',
      user: 'user456@example.com',
      url: '/api/auth/login',
      stackTrace: null,
      errorCode: 'AUTH_200',
      count: 1,
      status: 'resolved',
      assignedTo: null,
      tags: ['auth', 'success', 'login'],
      lastOccurrence: '2025-07-30 14:25:18',
      firstOccurrence: '2025-07-30 14:25:18',
      affectedUsers: 1,
      serverInfo: 'Node.js 18.17.0, Ubuntu 20.04'
    },
    {
      id: 4,
      timestamp: '2025-07-30 14:20:05',
      severity: 'critical',
      source: 'database',
      message: 'Failed to connect to primary database server',
      user: 'system',
      url: '/api/products',
      stackTrace: `Error: Connection refused
at Database.connect (mysql2:1247:8)
at ProductService.getAll (products.js:45:12)
at APIController.products (api.js:234:5)`,
      errorCode: 'DB_001',
      count: 3,
      status: 'resolved',
      assignedTo: 'Mike DevOps',
      tags: ['database', 'connection', 'critical'],
      lastOccurrence: '2025-07-30 14:20:05',
      firstOccurrence: '2025-07-30 14:15:32',
      affectedUsers: 156,
      serverInfo: 'MySQL 8.0.32, Ubuntu 20.04'
    },
    {
      id: 5,
      timestamp: '2025-07-30 14:15:33',
      severity: 'debug',
      source: 'frontend',
      message: 'Component state update: cart items refreshed',
      user: 'user789@example.com',
      url: '/cart',
      stackTrace: null,
      errorCode: 'DEBUG_001',
      count: 1,
      status: 'resolved',
      assignedTo: null,
      tags: ['debug', 'cart', 'state'],
      lastOccurrence: '2025-07-30 14:15:33',
      firstOccurrence: '2025-07-30 14:15:33',
      affectedUsers: 1,
      browserInfo: 'Firefox 119.0, macOS 13.6'
    },
    {
      id: 6,
      timestamp: '2025-07-30 14:10:21',
      severity: 'warning',
      source: 'api',
      message: 'Rate limit exceeded for user API calls',
      user: 'user321@example.com',
      url: '/api/search',
      stackTrace: `at RateLimiter.checkLimit (rateLimit.js:45:8)
at APIMiddleware.authenticate (middleware.js:67:12)
at Router.handleRequest (router.js:123:5)`,
      errorCode: 'RATE_001',
      count: 12,
      status: 'investigating',
      assignedTo: 'Alex Security',
      tags: ['rate-limit', 'api', 'security'],
      lastOccurrence: '2025-07-30 14:10:21',
      firstOccurrence: '2025-07-30 13:55:43',
      affectedUsers: 5,
      serverInfo: 'Node.js 18.17.0, Ubuntu 20.04'
    }
  ], []);

  // Filter logs based on search and filters
  const filteredLogs = useMemo(() => {
    return errorLogs.filter(log => {
      const matchesSearch = searchQuery === '' || 
                           log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           log.errorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           log.user.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
      const matchesSource = selectedSource === 'all' || log.source === selectedSource;
      
      return matchesSearch && matchesSeverity && matchesSource;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [errorLogs, searchQuery, selectedSeverity, selectedSource]);

  const getSeverityBadge = useCallback((severity) => {
    const severityInfo = severityTypes.find(s => s.id === severity);
    if (!severityInfo) return null;
    
    return (
      <span className={`${severityInfo.bg} ${severityInfo.color} border ${severityInfo.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{severityInfo.icon}</span>
        {severityInfo.name}
      </span>
    );
  }, [severityTypes]);

  const getSourceBadge = useCallback((source) => {
    const sourceInfo = logSources.find(s => s.id === source);
    if (!sourceInfo) return null;
    
    return (
      <span className="bg-black/30 text-zinc-400 border border-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
        <span>{sourceInfo.icon}</span>
        {sourceInfo.name}
      </span>
    );
  }, [logSources]);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      resolved: { bg: 'bg-green-600/20', text: 'text-green-400', border: 'border-green-500/30', icon: '✅' },
      investigating: { bg: 'bg-yellow-600/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '🔍' },
      unresolved: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/30', icon: '❌' }
    };
    
    const style = styles[status] || styles.unresolved;
    
    return (
      <span className={`${style.bg} ${style.text} border ${style.border} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
        <span>{style.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }, []);

  const handleExportLogs = useCallback(() => {
    console.log('Exporting logs...');
    setIsExportModalOpen(true);
    // In real app, would generate and download log export
  }, []);

  const handleResolveError = useCallback((errorId) => {
    console.log('Resolving error:', errorId);
    // In real app, would make API call to update error status
  }, []);

  const handleAssignError = useCallback((errorId, assignee) => {
    console.log('Assigning error:', errorId, 'to:', assignee);
    // In real app, would make API call to assign error
  }, []);

  const formatTimestamp = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formatNumber = useCallback((num) => {
    return new Intl.NumberFormat().format(num);
  }, []);

  const toggleLogSelection = useCallback((logId) => {
    setSelectedLogs(prev => 
      prev.includes(logId)
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  }, []);

  const selectAllLogs = useCallback(() => {
    if (selectedLogs.length === filteredLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(filteredLogs.map(log => log.id));
    }
  }, [selectedLogs.length, filteredLogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
                Logs & Error Tracking
              </h1>
              <p className="text-zinc-400">Monitor system health and track errors in real-time</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">Real-time:</span>
                <button
                  onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    isRealTimeEnabled ? 'bg-green-600' : 'bg-zinc-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    isRealTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <button
                onClick={handleExportLogs}
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                📥 Export Logs
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{formatNumber(errorStats.totalErrors)}</div>
              <div className="text-sm text-zinc-400">Total Logs</div>
              <div className="text-xs text-zinc-500 mt-1">📊 All time</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{errorStats.criticalErrors}</div>
              <div className="text-sm text-zinc-400">Critical</div>
              <div className="text-xs text-red-300 mt-1">🚨 {errorStats.trends.errors}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{errorStats.warnings}</div>
              <div className="text-sm text-zinc-400">Warnings</div>
              <div className="text-xs text-green-300 mt-1">⚠️ {errorStats.trends.warnings}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{errorStats.uptime}</div>
              <div className="text-sm text-zinc-400">Uptime</div>
              <div className="text-xs text-zinc-500 mt-1">⚡ System health</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{errorStats.avgResponseTime}</div>
              <div className="text-sm text-zinc-400">Avg Response</div>
              <div className="text-xs text-yellow-300 mt-1">⏱️ {errorStats.trends.response}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{errorStats.errorRate}</div>
              <div className="text-sm text-zinc-400">Error Rate</div>
              <div className="text-xs text-zinc-500 mt-1">📈 24h average</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="🔍 Search logs, errors, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            
            <div>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="all" className="bg-black text-white">📋 All Severities</option>
                {severityTypes.map((severity) => (
                  <option key={severity.id} value={severity.id} className="bg-black text-white">
                    {severity.icon} {severity.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="all" className="bg-black text-white">🌐 All Sources</option>
                {logSources.map((source) => (
                  <option key={source.id} value={source.id} className="bg-black text-white">
                    {source.icon} {source.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="last 1 hour" className="bg-black text-white">⏰ Last Hour</option>
                <option value="last 24 hours" className="bg-black text-white">📅 Last 24 Hours</option>
                <option value="last 7 days" className="bg-black text-white">📆 Last 7 Days</option>
                <option value="last 30 days" className="bg-black text-white">🗓️ Last 30 Days</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'table' 
                    ? 'bg-white text-black' 
                    : 'bg-black/30 text-zinc-400 hover:bg-black/40 hover:text-white'
                }`}
              >
                📋 Table
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'timeline' 
                    ? 'bg-white text-black' 
                    : 'bg-black/30 text-zinc-400 hover:bg-black/40 hover:text-white'
                }`}
              >
                📈 Timeline
              </button>
            </div>
            
            <div>
              <button
                onClick={selectAllLogs}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
              >
                {selectedLogs.length === filteredLogs.length ? '❌ Deselect All' : '✅ Select All'}
              </button>
            </div>
          </div>
          
          {selectedLogs.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-black/30 border border-zinc-600 rounded-xl p-4">
              <span className="text-blue-400 font-medium">{selectedLogs.length} logs selected</span>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
                  ✅ Mark Resolved
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors">
                  👤 Assign
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors">
                  🗑️ Archive
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Logs Table/Timeline */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Error Logs ({filteredLogs.length})
            </h2>

            {viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedLogs.length === filteredLogs.length && filteredLogs.length > 0}
                          onChange={selectAllLogs}
                          className="w-4 h-4 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Timestamp</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Severity</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Source</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Message</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Count</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-zinc-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b border-zinc-800 hover:bg-black/30 transition-colors">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedLogs.includes(log.id)}
                            onChange={() => toggleLogSelection(log.id)}
                            className="w-4 h-4 rounded bg-black/50 border border-zinc-600 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3 px-4 text-zinc-300 font-mono text-xs">
                          {formatTimestamp(log.timestamp)}
                        </td>
                        <td className="py-3 px-4">
                          {getSeverityBadge(log.severity)}
                        </td>
                        <td className="py-3 px-4">
                          {getSourceBadge(log.source)}
                        </td>
                        <td className="py-3 px-4 text-white max-w-md">
                          <div className="truncate" title={log.message}>
                            {log.message}
                          </div>
                          <div className="text-xs text-zinc-500 mt-1">
                            {log.errorCode} • {log.url}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-400 text-xs">
                          {log.user}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="bg-black/50 border border-zinc-600 px-2 py-1 rounded text-xs text-white">
                            {log.count}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(log.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedError(log)}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-500 transition-colors"
                            >
                              👁️ View
                            </button>
                            {log.status !== 'resolved' && (
                              <button
                                onClick={() => handleResolveError(log.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-500 transition-colors"
                              >
                                ✅ Resolve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-zinc-400 py-8">
                  📈 Timeline view would be implemented here
                </div>
              </div>
            )}

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-white mb-2">No Logs Found</h3>
                <p className="text-zinc-400 mb-6">No logs match your current filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSeverity('all');
                    setSelectedSource('all');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                >
                  🔄 Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Details Modal */}
        {selectedError && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-zinc-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Error Details</h3>
                  <button
                    onClick={() => setSelectedError(null)}
                    className="text-zinc-400 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Error Code</label>
                      <div className="text-white font-mono">{selectedError.errorCode}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Severity</label>
                      {getSeverityBadge(selectedError.severity)}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Source</label>
                      {getSourceBadge(selectedError.source)}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                      {getStatusBadge(selectedError.status)}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Occurrences</label>
                      <div className="text-white">{selectedError.count} times</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Affected Users</label>
                      <div className="text-white">{formatNumber(selectedError.affectedUsers)} users</div>
                    </div>
                  </div>
                  
                  {/* Additional Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">User</label>
                      <div className="text-white">{selectedError.user}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">URL</label>
                      <div className="text-blue-400 font-mono text-sm">{selectedError.url}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">First Occurrence</label>
                      <div className="text-white text-sm">{formatTimestamp(selectedError.firstOccurrence)}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Last Occurrence</label>
                      <div className="text-white text-sm">{formatTimestamp(selectedError.lastOccurrence)}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Assigned To</label>
                      <div className="text-white">{selectedError.assignedTo || 'Unassigned'}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedError.tags.map((tag, index) => (
                          <span key={index} className="bg-black/50 border border-zinc-600 px-2 py-1 rounded text-xs text-zinc-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Message */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Error Message</label>
                  <div className="bg-black/50 border border-zinc-600 rounded-lg p-4 text-white">
                    {selectedError.message}
                  </div>
                </div>
                
                {/* Stack Trace */}
                {selectedError.stackTrace && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Stack Trace</label>
                    <div className="bg-black/70 border border-zinc-600 rounded-lg p-4 font-mono text-sm text-zinc-300 overflow-x-auto">
                      <pre className="whitespace-pre-wrap">{selectedError.stackTrace}</pre>
                    </div>
                  </div>
                )}
                
                {/* System Information */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">System Information</label>
                  <div className="bg-black/50 border border-zinc-600 rounded-lg p-4 text-sm text-zinc-300">
                    {selectedError.browserInfo && <div>Browser: {selectedError.browserInfo}</div>}
                    {selectedError.serverInfo && <div>Server: {selectedError.serverInfo}</div>}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleResolveError(selectedError.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                  >
                    ✅ Mark Resolved
                  </button>
                  <button
                    onClick={() => handleAssignError(selectedError.id, 'John Developer')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    👤 Assign to Dev
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                    🔗 Create Issue
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
                    📎 Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {isExportModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/20 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📥</div>
                  <h3 className="text-xl font-bold text-white mb-2">Export Complete!</h3>
                  <p className="text-zinc-400 mb-6">Your log export has been generated and is ready for download.</p>
                </div>
                
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-semibold"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsAndErrorTracking;
