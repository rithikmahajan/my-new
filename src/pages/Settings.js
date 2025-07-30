import React, { useState } from 'react';

const Settings = () => {
  // State for various settings
  const [settings, setSettings] = useState({
    profileVisibility: true,
    locationData: true,
    communicationPrefs: true,
    autoInvoicing: true,
    huggingFaceAPI: true,
    onlineDiscount: 5,
    userLimit: 100,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: true,
    twoFactorAuth: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle, label, description }) => (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700">
      <div className="flex-1">
        <span className="font-medium text-white">{label}</span>
        {description && (
          <p className="text-sm text-zinc-400 mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !enabled 
              ? 'bg-gradient-to-r from-white to-zinc-200 text-black' 
              : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600 border border-zinc-600'
          }`}
        >
          Off
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            enabled 
              ? 'bg-gradient-to-r from-white to-zinc-200 text-black' 
              : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600 border border-zinc-600'
          }`}
        >
          On
        </button>
      </div>
    </div>
  );

  const handleSave = () => {
    // Simulate saving settings
    console.log('Settings saved:', settings);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-zinc-400 mt-2">Manage your application preferences and configurations</p>
            </div>
            <button 
              onClick={handleSave}
              className="bg-gradient-to-r from-white to-zinc-200 text-black px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-zinc-200 hover:to-white transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
            >
              <span>💾</span>
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Privacy Settings */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.profileVisibility}
                onToggle={(value) => handleToggle('profileVisibility')}
                label="Profile Visibility"
                description="Allow others to see your profile information"
              />
              
              <ToggleSwitch
                enabled={settings.locationData}
                onToggle={(value) => handleToggle('locationData')}
                label="Location Data"
                description="Share your location data for analytics"
              />
              
              <ToggleSwitch
                enabled={settings.communicationPrefs}
                onToggle={(value) => handleToggle('communicationPrefs')}
                label="Communication Preferences"
                description="Allow personalized communication settings"
              />

              <ToggleSwitch
                enabled={settings.twoFactorAuth}
                onToggle={(value) => handleToggle('twoFactorAuth')}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.emailNotifications}
                onToggle={(value) => handleToggle('emailNotifications')}
                label="Email Notifications"
                description="Receive updates and alerts via email"
              />
              
              <ToggleSwitch
                enabled={settings.smsNotifications}
                onToggle={(value) => handleToggle('smsNotifications')}
                label="SMS Notifications"
                description="Receive critical alerts via SMS"
              />
              
              <ToggleSwitch
                enabled={settings.autoInvoicing}
                onToggle={(value) => handleToggle('autoInvoicing')}
                label="Auto Invoicing"
                description="Automatically generate invoices for orders"
              />

              <ToggleSwitch
                enabled={settings.darkMode}
                onToggle={(value) => handleToggle('darkMode')}
                label="Dark Mode"
                description="Use dark theme for the interface"
              />
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={settings.huggingFaceAPI}
                onToggle={(value) => handleToggle('huggingFaceAPI')}
                label="HuggingFace API"
                description="Enable AI-powered features and recommendations"
              />
              
              {/* Online Discount Setting */}
              <div className="p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700">
                <label className="block font-medium text-white mb-2">Online Discount (%)</label>
                <p className="text-sm text-zinc-400 mb-3">Set the default discount percentage for online orders</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.onlineDiscount}
                  onChange={(e) => handleInputChange('onlineDiscount', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
                />
              </div>
              
              {/* User Limit Setting */}
              <div className="p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700">
                <label className="block font-medium text-white mb-2">User Limit</label>
                <p className="text-sm text-zinc-400 mb-3">Maximum number of concurrent users allowed</p>
                <input
                  type="number"
                  min="1"
                  value={settings.userLimit}
                  onChange={(e) => handleInputChange('userLimit', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
            <div className="space-y-4">
              {/* API Keys Section */}
              <div className="p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700">
                <label className="block font-medium text-white mb-2">API Key</label>
                <p className="text-sm text-zinc-400 mb-3">Your secure API key for external integrations</p>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    value="••••••••••••••••••••••••••••••••"
                    readOnly
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                  />
                  <button className="px-4 py-3 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold">
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Backup Settings */}
              <div className="p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg border border-zinc-700">
                <label className="block font-medium text-white mb-2">Data Backup</label>
                <p className="text-sm text-zinc-400 mb-3">Configure automatic data backup preferences</p>
                <select className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-white transition-all duration-300">
                  <option value="daily">Daily Backup</option>
                  <option value="weekly">Weekly Backup</option>
                  <option value="monthly">Monthly Backup</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              {/* Danger Zone */}
              <div className="p-6 bg-gradient-to-r from-zinc-800 to-black rounded-lg border border-zinc-600">
                <label className="block font-medium text-white mb-2">Danger Zone</label>
                <p className="text-sm text-zinc-400 mb-4">Irreversible actions that affect your account</p>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-zinc-700 to-zinc-800 text-white rounded-lg hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 border border-zinc-600">
                    Reset All Settings
                  </button>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-zinc-800 to-black text-white rounded-lg hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 border border-zinc-600">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
            <p className="text-zinc-400 text-sm mb-4">Optimize app performance settings</p>
            <button className="px-4 py-2 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold">
              Configure
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
            <p className="text-zinc-400 text-sm mb-4">Advanced security configurations</p>
            <button className="px-4 py-2 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold">
              Setup
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl shadow-2xl p-6 border border-zinc-800 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-lg font-semibold text-white mb-2">Integrations</h3>
            <p className="text-zinc-400 text-sm mb-4">Connect external services</p>
            <button className="px-4 py-2 bg-gradient-to-r from-white to-zinc-200 text-black rounded-lg hover:from-zinc-200 hover:to-white transition-all duration-300 font-semibold">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
