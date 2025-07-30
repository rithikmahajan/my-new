import React, { useState, useCallback } from 'react';

/**
 * Profile Component - Modern Black & White Theme
 * 
 * Comprehensive user profile management interface featuring:
 * - Personal information editing
 * - Password change functionality
 * - Account preferences and settings
 * - Profile picture upload
 * - Security settings and two-factor authentication
 * - Activity history and sessions
 * - Notification preferences
 */
const Profile = () => {
  // State for different sections
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState({});
  const [formData, setFormData] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@admin.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Admin',
      department: 'Operations',
      location: 'New York, USA',
      bio: 'Experienced admin with 5+ years in e-commerce management.'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: true,
      loginNotifications: true
    },
    preferences: {
      theme: 'dark',
      language: 'english',
      timezone: 'EST',
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true
    }
  });

  // Activity data
  const recentActivity = [
    {
      id: 1,
      action: 'Logged in',
      timestamp: '2024-01-20 09:30 AM',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      icon: '🔐'
    },
    {
      id: 2,
      action: 'Updated user permissions',
      timestamp: '2024-01-19 03:45 PM',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      icon: '👥'
    },
    {
      id: 3,
      action: 'Exported sales report',
      timestamp: '2024-01-19 11:20 AM',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      icon: '📊'
    },
    {
      id: 4,
      action: 'Changed password',
      timestamp: '2024-01-18 02:15 PM',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      icon: '🔑'
    }
  ];

  const handleInputChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleEditToggle = useCallback((section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleSave = useCallback((section) => {
    console.log(`Saving ${section} data:`, formData[section]);
    setIsEditing(prev => ({
      ...prev,
      [section]: false
    }));
    // In real app, this would make an API call
  }, [formData]);

  const handlePasswordChange = useCallback(() => {
    if (formData.security.newPassword !== formData.security.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password...');
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }));
  }, [formData.security]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'activity', label: 'Activity', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-white/20 to-zinc-200/20 border border-white/30 rounded-full flex items-center justify-center text-3xl">
                👤
              </div>
              <button className="absolute bottom-0 right-0 bg-gradient-to-r from-white to-zinc-200 text-black rounded-full p-2 shadow-lg hover:from-zinc-200 hover:to-white transition-all duration-300 transform hover:scale-105">
                📷
              </button>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                {formData.personal.firstName} {formData.personal.lastName}
              </h1>
              <p className="text-zinc-300 text-lg">{formData.personal.position}</p>
              <p className="text-zinc-400">{formData.personal.department} • {formData.personal.location}</p>
            </div>
            
            <div className="text-right">
              <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl px-4 py-2 mb-2">
                <span className="text-green-400 font-semibold flex items-center gap-2">
                  🟢 Online
                </span>
              </div>
              <div className="text-sm text-zinc-400">Last login: Today 9:30 AM</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="flex border-b border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white border-b-2 border-white'
                    : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                  <button
                    onClick={() => isEditing.personal ? handleSave('personal') : handleEditToggle('personal')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      isEditing.personal
                        ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400'
                        : 'bg-gradient-to-r from-white to-zinc-200 text-black hover:from-zinc-200 hover:to-white'
                    } text-white`}
                  >
                    {isEditing.personal ? '💾 Save Changes' : '✏️ Edit'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.personal.firstName}
                      onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                      disabled={!isEditing.personal}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.personal.lastName}
                      onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                      disabled={!isEditing.personal}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.personal.email}
                      onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                      disabled={!isEditing.personal}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.personal.phone}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      disabled={!isEditing.personal}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Position</label>
                    <input
                      type="text"
                      value={formData.personal.position}
                      onChange={(e) => handleInputChange('personal', 'position', e.target.value)}
                      disabled={!isEditing.personal}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Department</label>
                    <select
                      value={formData.personal.department}
                      onChange={(e) => handleInputChange('personal', 'department', e.target.value)}
                      disabled={!isEditing.personal}
                      className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Support">Customer Support</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Bio</label>
                  <textarea
                    value={formData.personal.bio}
                    onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                    disabled={!isEditing.personal}
                    rows={4}
                    className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>

                {/* Password Change */}
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={formData.security.currentPassword}
                        onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                        className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">New Password</label>
                        <input
                          type="password"
                          value={formData.security.newPassword}
                          onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={formData.security.confirmPassword}
                          onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePasswordChange}
                      className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-2 rounded-lg font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300"
                    >
                      🔑 Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-black/30 border border-zinc-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-300">Add an extra layer of security to your account</p>
                      <p className="text-sm text-zinc-400 mt-1">
                        Status: {formData.security.twoFactorEnabled ? '✅ Enabled' : '❌ Disabled'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleInputChange('security', 'twoFactorEnabled', !formData.security.twoFactorEnabled)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        formData.security.twoFactorEnabled
                          ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'
                          : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400'
                      } text-white`}
                    >
                      {formData.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Preferences</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/30 border border-zinc-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">🎨 Appearance</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Theme</label>
                        <select
                          value={formData.preferences.theme}
                          onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                          <option value="dark">Dark Mode</option>
                          <option value="light">Light Mode</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Language</label>
                        <select
                          value={formData.preferences.language}
                          onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                          className="w-full px-3 py-2 bg-black/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                          <option value="english">English</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 border border-zinc-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">🔔 Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', icon: '📧' },
                        { key: 'pushNotifications', label: 'Push Notifications', icon: '📱' },
                        { key: 'weeklyReports', label: 'Weekly Reports', icon: '📊' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{setting.icon}</span>
                            <span className="text-zinc-300">{setting.label}</span>
                          </div>
                          <button
                            onClick={() => handleInputChange('preferences', setting.key, !formData.preferences[setting.key])}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                              formData.preferences[setting.key] ? 'bg-green-500' : 'bg-zinc-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                formData.preferences[setting.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="bg-black/30 border border-zinc-700 rounded-xl p-4 hover:bg-black/40 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-r from-white/20 to-zinc-200/20 border border-white/30 rounded-lg p-2">
                          <span className="text-lg">{activity.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{activity.action}</h4>
                          <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                            <span>🕒 {activity.timestamp}</span>
                            <span>💻 {activity.device}</span>
                            <span>📍 {activity.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="bg-gradient-to-r from-white/10 to-zinc-200/10 border border-white/20 text-white px-6 py-2 rounded-lg hover:from-white/20 hover:to-zinc-200/20 transition-all duration-300">
                    📜 View All Activity
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
