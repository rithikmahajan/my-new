import React, { useState, useMemo, useCallback } from 'react';

/**
 * Messages Component - Modern Black & White Theme
 * 
 * Comprehensive chat interface for admin support featuring:
 * - Sidebar filters for status, channels, and agents
 * - Real-time chat interface with multiple conversation support
 * - Message templates and quick actions
 * - Agent assignment and status management
 * - Multi-channel support (SMS, WhatsApp, Instagram, Web, App)
 * - Online/offline agent status tracking
 */
const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');

  // Mock data
  const statusCounts = {
    'All': 156,
    'Active': 45,
    'Pending': 34,
    'Resolved': 67,
    'Escalated': 10
  };

  const channelCounts = {
    'All': 156,
    'WhatsApp': 68,
    'Instagram': 34,
    'Website': 32,
    'Mobile App': 22
  };

  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      status: 'Online',
      avatar: '👩‍💼',
      online: true,
      activeChats: 8
    },
    {
      id: 2,
      name: 'Mike Chen',
      status: 'Online',
      avatar: '👨‍💼',
      online: true,
      activeChats: 5
    },
    {
      id: 3,
      name: 'Emma Wilson',
      status: 'Busy',
      avatar: '👩‍🔧',
      online: true,
      activeChats: 12
    },
    {
      id: 4,
      name: 'David Brown',
      status: 'Offline',
      avatar: '👨‍🔧',
      online: false,
      activeChats: 0
    }
  ];

  const conversations = [
    {
      id: 1,
      customerName: 'Alex Rodriguez',
      avatar: '👤',
      lastMessage: 'Hi, I need help with my recent order. The tracking shows it was delivered but I haven\'t received it.',
      timestamp: '2 min ago',
      channel: 'WhatsApp',
      status: 'Active',
      unread: 2,
      priority: 'high'
    },
    {
      id: 2,
      customerName: 'Lisa Garcia',
      avatar: '👩',
      lastMessage: 'Thank you for the quick response! The issue is resolved.',
      timestamp: '15 min ago',
      channel: 'Website',
      status: 'Resolved',
      unread: 0,
      priority: 'low'
    },
    {
      id: 3,
      customerName: 'John Smith',
      avatar: '👨',
      lastMessage: 'Can you help me with a refund for order #12345?',
      timestamp: '1 hour ago',
      channel: 'Instagram',
      status: 'Pending',
      unread: 1,
      priority: 'medium'
    },
    {
      id: 4,
      customerName: 'Maria Fernandez',
      avatar: '👩‍🦱',
      lastMessage: 'The product quality is not as expected. I want to return it.',
      timestamp: '2 hours ago',
      channel: 'Mobile App',
      status: 'Escalated',
      unread: 3,
      priority: 'high'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'customer',
      content: 'Hi, I need help with my recent order. The tracking shows it was delivered but I haven\'t received it.',
      timestamp: '10:30 AM',
      avatar: '👤'
    },
    {
      id: 2,
      sender: 'agent',
      content: 'Hello Alex! I\'m sorry to hear about the delivery issue. Let me check your order details right away.',
      timestamp: '10:32 AM',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      sender: 'agent',
      content: 'I can see your order #ORD12345 was shipped yesterday. Let me contact our delivery partner to track the exact location.',
      timestamp: '10:33 AM',
      avatar: '👩‍💼'
    },
    {
      id: 4,
      sender: 'customer',
      content: 'Thank you so much! I really appreciate the quick response.',
      timestamp: '10:35 AM',
      avatar: '👤'
    }
  ];

  // Filter conversations based on selected filters
  const filteredConversations = useMemo(() => {
    return conversations.filter(conv => {
      const matchesSearch = conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || conv.status === selectedStatus;
      const matchesChannel = selectedChannel === 'All' || conv.channel === selectedChannel;
      
      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [conversations, searchQuery, selectedStatus, selectedChannel]);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  }, [newMessage]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const getChannelIcon = useCallback((channel) => {
    const icons = {
      'WhatsApp': '💬',
      'Instagram': '📷',
      'Website': '🌐',
      'Mobile App': '📱'
    };
    return icons[channel] || '💬';
  }, []);

  const getStatusBadge = useCallback((status) => {
    const styles = {
      'Active': 'bg-green-100 text-green-800 border border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'Resolved': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Escalated': 'bg-red-100 text-red-800 border border-red-200'
    };
    
    const emojis = {
      'Active': '🟢',
      'Pending': '🟡',
      'Resolved': '🔵',
      'Escalated': '🔴'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${styles[status]}`}>
        <span>{emojis[status]}</span>
        {status}
      </span>
    );
  }, []);

  const getPriorityColor = useCallback((priority) => {
    const colors = {
      'high': 'border-l-red-500',
      'medium': 'border-l-yellow-500',
      'low': 'border-l-green-500'
    };
    return colors[priority] || 'border-l-zinc-600';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-gradient-to-b from-white/10 to-zinc-200/10 backdrop-blur-lg border-r border-white/20 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-4">
              💬 Messages
            </h1>
            
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-zinc-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-white/20 space-y-4">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-2">Status</h3>
              <div className="space-y-1">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      selectedStatus === status
                        ? 'bg-white/20 text-white'
                        : 'hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <span>{status}</span>
                    <span className="text-xs bg-zinc-700 px-2 py-1 rounded-full">{count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Filter */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-2">Channels</h3>
              <div className="space-y-1">
                {Object.entries(channelCounts).map(([channel, count]) => (
                  <button
                    key={channel}
                    onClick={() => setSelectedChannel(channel)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      selectedChannel === channel
                        ? 'bg-white/20 text-white'
                        : 'hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{getChannelIcon(channel)}</span>
                      {channel}
                    </span>
                    <span className="text-xs bg-zinc-700 px-2 py-1 rounded-full">{count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Agents */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-2">Agents</h3>
              <div className="space-y-2">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <div className="relative">
                      <span className="text-lg">{agent.avatar}</span>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${
                        agent.online ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{agent.name}</div>
                      <div className="text-xs text-zinc-400">{agent.activeChats} active chats</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">
                Conversations ({filteredConversations.length})
              </h3>
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${getPriorityColor(conversation.priority)} ${
                      selectedConversation === conversation.id
                        ? 'bg-white/20 border-r-2 border-r-white'
                        : 'bg-black/30 hover:bg-black/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <span className="text-lg">{conversation.avatar}</span>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-white truncate">{conversation.customerName}</h4>
                          <span className="text-xs text-zinc-400 whitespace-nowrap ml-2">{conversation.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">{getChannelIcon(conversation.channel)}</span>
                          <span className="text-xs text-zinc-400">{conversation.channel}</span>
                          {getStatusBadge(conversation.status)}
                        </div>
                        
                        <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg border-b border-white/20 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <div>
                  <h2 className="font-semibold text-white">Alex Rodriguez</h2>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span>💬 WhatsApp</span>
                    <span>•</span>
                    <span>🟢 Active</span>
                    <span>•</span>
                    <span>Order #ORD12345</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105">
                  📋 Order Details
                </button>
                <button className="p-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
                  ✅ Resolve
                </button>
                <button className="p-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105">
                  ⏸️ Pause
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'agent' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'customer' && (
                  <span className="text-2xl mt-1">{message.avatar}</span>
                )}
                
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'agent'
                    ? 'bg-gradient-to-r from-white to-zinc-200 text-black'
                    : 'bg-gradient-to-r from-zinc-700 to-zinc-600 text-white'
                }`}>
                  <p className="leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'agent' ? 'text-zinc-600' : 'text-zinc-300'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
                
                {message.sender === 'agent' && (
                  <span className="text-2xl mt-1">{message.avatar}</span>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg border-t border-white/20 p-4">
            <div className="flex gap-3">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <button className="p-2 bg-black/30 border border-zinc-600 rounded-lg hover:bg-black/40 transition-colors">
                  📎
                </button>
                <button className="p-2 bg-black/30 border border-zinc-600 rounded-lg hover:bg-black/40 transition-colors">
                  📷
                </button>
                <button className="p-2 bg-black/30 border border-zinc-600 rounded-lg hover:bg-black/40 transition-colors">
                  😊
                </button>
              </div>
              
              {/* Message Input */}
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                  rows={1}
                />
              </div>
              
              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-white to-zinc-200 text-black rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>✈️</span>
                Send
              </button>
            </div>
            
            {/* Quick Responses */}
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-black/30 border border-zinc-600 rounded-lg text-sm text-zinc-300 hover:bg-black/40 transition-colors">
                👋 Thanks for contacting us!
              </button>
              <button className="px-3 py-1 bg-black/30 border border-zinc-600 rounded-lg text-sm text-zinc-300 hover:bg-black/40 transition-colors">
                🔍 Let me check that for you
              </button>
              <button className="px-3 py-1 bg-black/30 border border-zinc-600 rounded-lg text-sm text-zinc-300 hover:bg-black/40 transition-colors">
                ✅ Issue resolved!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
