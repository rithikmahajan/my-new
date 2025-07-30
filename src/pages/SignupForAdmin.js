import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Admin Signup Page Component - Modern Black & White Theme
 * 
 * A standalone signup page for admin users featuring:
 * - Multi-step registration process
 * - Email verification
 * - Role selection and permissions
 * - Modern glass morphism design
 * - Form validation and error handling
 */
const SignupForAdmin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Verification, 3: Role Selection
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    role: '',
    verificationCode: ['', '', '', ''],
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const departments = [
    { value: 'operations', label: '⚙️ Operations' },
    { value: 'sales', label: '💼 Sales' },
    { value: 'marketing', label: '📢 Marketing' },
    { value: 'support', label: '🎧 Customer Support' },
    { value: 'it', label: '💻 IT & Development' },
    { value: 'finance', label: '💰 Finance' }
  ];

  const roles = [
    { value: 'admin', label: '👑 Admin', description: 'Full system access' },
    { value: 'manager', label: '📊 Manager', description: 'Department management access' },
    { value: 'analyst', label: '📈 Analyst', description: 'Read-only analytics access' },
    { value: 'support', label: '🎧 Support Agent', description: 'Customer support tools' }
  ];

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
      const nextInput = document.querySelector(`input[name="signup-code-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  }, [formData.verificationCode]);

  const validateStep1 = useCallback(() => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validateStep3 = useCallback(() => {
    const newErrors = {};
    
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleStep1Submit = useCallback(async () => {
    if (!validateStep1()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to send verification email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
    } catch (error) {
      setErrors({ general: 'Failed to send verification email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [validateStep1]);

  const handleVerifyEmail = useCallback(async () => {
    const code = formData.verificationCode.join('');
    if (code.length !== 4) {
      setErrors({ code: 'Please enter the complete verification code' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (error) {
      setErrors({ code: 'Invalid verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [formData.verificationCode]);

  const handleSignup = useCallback(async () => {
    if (!validateStep3()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to create account
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and redirect
      alert('Account created successfully! Please wait for admin approval.');
      navigate('/login');
    } catch (error) {
      setErrors({ general: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }, [validateStep3, navigate]);

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Create Account';
      case 2: return 'Verify Email';
      case 3: return 'Select Role';
      default: return 'Sign Up';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Enter your details to create an admin account';
      case 2: return 'We\'ve sent a verification code to your email';
      case 3: return 'Choose your department and role';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-white/20 to-zinc-200/20 border border-white/30 rounded-full mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Join Admin Portal
          </h1>
          <p className="text-zinc-400 mt-2">{getStepDescription()}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                stepNumber <= step 
                  ? 'bg-white text-black' 
                  : 'bg-zinc-700 text-zinc-400'
              }`}>
                {stepNumber < step ? '✓' : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-8 h-1 mx-2 rounded transition-all duration-300 ${
                  stepNumber < step ? 'bg-white' : 'bg-zinc-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <div className="bg-gradient-to-r from-white/10 to-zinc-200/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">{getStepTitle()}</h2>

          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@company.com"
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
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
                  placeholder="Create a strong password"
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                  }`}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="mt-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-zinc-600 text-white focus:ring-white/50"
                  />
                  <span className="text-sm text-zinc-300 leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-white hover:text-zinc-300 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-white hover:text-zinc-300 underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-400 text-xs mt-1">{errors.agreeToTerms}</p>
                )}
              </div>

              <button
                onClick={handleStep1Submit}
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-white to-zinc-200 text-black py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending verification...
                  </div>
                ) : (
                  '📧 Send Verification Code'
                )}
              </button>
            </div>
          )}

          {/* Step 2: Email Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full mb-4">
                  <span className="text-lg">📧</span>
                </div>
                <p className="text-zinc-400 text-sm">
                  We've sent a 4-digit code to<br />
                  <span className="text-white font-medium">{formData.email}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3 text-center">
                  Enter Verification Code
                </label>
                <div className="flex gap-3 justify-center">
                  {formData.verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`signup-code-${index}`}
                      value={digit}
                      onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
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

              <div className="text-center">
                <button className="text-zinc-300 hover:text-white text-sm transition-colors">
                  📤 Didn't receive code? Resend
                </button>
              </div>

              <button
                onClick={handleVerifyEmail}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-white to-zinc-200 text-black py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  '✅ Verify Email'
                )}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full text-zinc-300 hover:text-white py-2 text-sm transition-colors"
              >
                ← Back to registration
              </button>
            </div>
          )}

          {/* Step 3: Role Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.department 
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-zinc-600 focus:ring-white/50 focus:border-transparent'
                  }`}
                >
                  <option value="">Select your department</option>
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-400 text-xs mt-1">{errors.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">
                  Role
                </label>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={`flex items-center p-4 bg-black/30 border rounded-xl cursor-pointer transition-all duration-300 hover:bg-black/40 ${
                        formData.role === role.value 
                          ? 'border-white bg-white/10' 
                          : 'border-zinc-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{role.label}</span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-1">{role.description}</p>
                      </div>
                      {formData.role === role.value && (
                        <span className="text-white">✓</span>
                      )}
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-red-400 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-white to-zinc-200 text-black py-3 rounded-xl font-semibold hover:from-zinc-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  '🎉 Create Account'
                )}
              </button>

              <button
                onClick={() => setStep(2)}
                className="w-full text-zinc-300 hover:text-white py-2 text-sm transition-colors"
              >
                ← Back to verification
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-zinc-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-zinc-300 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-zinc-500 text-xs">
            Your account will be reviewed and approved by an administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForAdmin;
