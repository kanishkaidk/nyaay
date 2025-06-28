import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Scale, User as UserIcon, Mail, Eye, EyeOff, Sparkles, Shield, Heart, Globe } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields if needed
}

interface AuthProps {
  onLogin: (userData: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) return;

    // Generate a user object matching User interface
    const user: User = {
      id: formData.username, // For now, username as id; replace with UUID if needed
      name: formData.username,
      email: isLogin
        ? formData.email || `${formData.username}@nyaayai.com`
        : formData.email,
    };

    // Validate email for signup
    if (!isLogin && !user.email) return;

    onLogin(user);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`,
          }}
        ></div>

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full opacity-10 animate-spin"
          style={{ animationDuration: '20s' }}
        ></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Scale className="h-8 w-8 text-orange-300 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <Shield className="h-6 w-6 text-blue-300 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-1000">
          <Heart className="h-7 w-7 text-pink-300 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse delay-500">
          <Globe className="h-6 w-6 text-purple-300 opacity-60" />
        </div>
      </div>

      <div
        className={`relative z-10 max-w-md w-full transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Scale className="h-16 w-16 text-orange-600 animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-spin" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-orange-600 mb-2">न्याय AI</h1>
            <p className="text-gray-600 text-lg">Legal Help Platform for India</p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>Multi-language</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-red-600" />
                <span>Free</span>
              </div>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required={!isLogin}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Supporting Hindi, English, and regional dialects</p>
            <p className="text-xs mt-1">हिंदी, अंग्रेजी और क्षेत्रीय बोलियों का समर्थन</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

