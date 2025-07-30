import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Admin Login Page Component - Modern Black & White Theme
 * 
 * A standalone login page for admin users featuring:
 * - Phone number and email login options
 * - Two-factor authentication support
 * - Modern glass morphism design
 * - Mobile responsive layout
 * - Smooth animations and transitions
 */
const LoginForAdmin = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('email');
  const [step, setStep] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    countryCode: '+1',
    verificationCode: ['', '', '', ''],
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleVerificationCodeChange = useCallback((index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...formData.verificationCode];
    newCode[index] = value;
    
    setFormData(prev => ({
      ...prev,
      verificationCode: newCode
    }));

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(`input[name="code-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  }, [formData.verificationCode]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (loginType === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [loginType, formData]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (loginType === 'phone') {
        setStep('verification');
      } else {
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [validateForm, loginType, navigate]);

  const handleVerifyCode = useCallback(async () => {
    const code = formData.verificationCode.join('');
    if (code.length !== 4) {
      setErrors({ code: 'Please enter the complete verification code' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ code: 'Invalid verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [formData.verificationCode, navigate]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (step === 'login') {
        handleLogin();
      } else {
        handleVerifyCode();
      }
    }
  }, [step, handleLogin, handleVerifyCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-white/20 to-zinc-200/20 border border-white/30 rounded-full mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-zinc-400 mt-2">
            {step === 'login' ? 'Sign in to your admin account' : 'Enter verification code'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {step === 'login' ? (
            <>
              {/* Login Type Toggle */}
              <div className="flex bg-black/30 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setLoginType('email')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                    loginType === 'email'
                      ? 'bg-white text-black font-semibold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  📧 Email
                </button>
                <button
                  onClick={() => setLoginType('phone')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                    loginType === 'phone'
                      ? 'bg-white text-black font-semibold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  📱 Phone
                </button>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                  <p className="text-red-300 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Email Login */}
              {loginType === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="admin@company.com"
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Phone Login */}
              {loginType === 'phone' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="px-3 py-3 bg-black/50 border border-zinc-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+86">🇨🇳 +86</option>
                      </select>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="1234567890"
                        className={`flex-1 px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.phoneNumber 
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mt-6">
                <label className="flex items-center gap-2 text-zinc-300">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded border-zinc-600 text-white focus:ring-white/50"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-white to-zinc-200 text-black py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  `🔐 Sign in ${loginType === 'phone' ? 'with Phone' : 'with Email'}`
                )}
              </button>
            </>
          ) : (
            <>
              {/* Verification Step */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-full mb-4">
                  <span className="text-lg">📱</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Verification Required</h2>
                <p className="text-zinc-400 text-sm">
                  We've sent a 4-digit code to {formData.countryCode} ****{formData.phoneNumber.slice(-4)}
                </p>
              </div>

              {/* Verification Code Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3 text-center">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-3 justify-center">
                    {formData.verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        name={`code-${index}`}
                        value={digit}
                        onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                        onKeyPress={handleKeyPress}
                        maxLength={1}
                        className={`w-12 h-12 text-center text-xl font-semibold bg-black/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.code 
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  {errors.code && (
                    <p className="text-red-400 text-sm mt-2 text-center">{errors.code}</p>
                  )}
                </div>

                {/* Resend Code */}
                <div className="text-center">
                  <button className="text-zinc-300 hover:text-white text-sm transition-colors">
                    📤 Resend code
                  </button>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyCode}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-white to-zinc-200 text-black py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    '✅ Verify & Sign In'
                  )}
                </button>

                {/* Back Button */}
                <button
                  onClick={() => setStep('login')}
                  className="w-full text-zinc-300 hover:text-white py-2 text-sm transition-colors"
                >
                  ← Back to login
                </button>
              </div>
            </>
          )}

          {/* Footer */}
          {step === 'login' && (
            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-zinc-400 text-sm">
                Need access?{' '}
                <Link to="/signup" className="text-white hover:text-zinc-300 transition-colors font-medium">
                  Request account
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-zinc-500 text-xs">
            © 2024 Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForAdmin;
