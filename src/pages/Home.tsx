import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, Send, Globe, AlertTriangle, Sparkles, Shield, Users, Scale, 
  Brain, Heart, Star, Award, CheckCircle, ArrowRight, FileText, MessageCircle,
  LogOut, User, Phone, Mail, MapPin
} from 'lucide-react';

const Home = ({ user, onLogout }) => {
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  const quotes = [
    {
      text: "न्याय देर से मिले तो चलेगा, लेकिन मिलना जरूरी है।",
      author: "महात्मा गांधी",
      translation: "Justice delayed is acceptable, but justice must be served."
    },
    {
      text: "कानून सबके लिए समान है, चाहे वो राजा हो या रंक।",
      author: "डॉ. ए.पी.जे. अब्दुल कलाम",
      translation: "Law is equal for all, whether king or pauper."
    },
    {
      text: "अधिकार मांगने से नहीं, जानने से मिलते हैं।",
      author: "चाणक्य",
      translation: "Rights are not gained by demanding, but by knowing."
    }
  ];

  const languages = [
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'english', label: 'English', flag: '🇬🇧' },
    { value: 'hinglish', label: 'Hinglish', flag: '🇮🇳' },
    { value: 'bengali', label: 'বাংলা', flag: '🇧🇩' },
    { value: 'tamil', label: 'தமிழ்', flag: '🇮🇳' },
    { value: 'gujarati', label: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/ai-response', { state: { query, language: selectedLanguage } });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`
          }}
        ></div>
        
        {/* Simple floating elements */}
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Scale className="h-8 w-8 text-orange-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <Shield className="h-6 w-6 text-blue-400 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-32 animate-bounce delay-1000">
          <Heart className="h-7 w-7 text-red-400 opacity-60" />
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Scale className="h-10 w-10 text-orange-600" />
              <span className="text-3xl font-bold text-orange-600">
                न्याय AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/generate-draft')}
                className="flex items-center space-x-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Generate Document</span>
              </button>
              <button
                onClick={() => navigate('/connect-help')}
                className="flex items-center space-x-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Connect with Lawyers/NGOs</span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">Welcome, {user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-12">
            <Scale className="h-32 w-32 text-orange-600 mx-auto mb-8 animate-pulse" />
            
            <h1 className="text-7xl md:text-9xl font-black text-orange-600 mb-8 leading-tight">
              न्याय AI
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              NYAAYAI
            </h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              AI-powered legal guidance platform for India. Get instant help in your language.
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Multi-language</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <Heart className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Free Legal Aid</span>
              </div>
            </div>
          </div>

          {/* Rotating Quotes */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-16 max-w-5xl mx-auto">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentQuote * 100}%)` }}
              >
                {quotes.map((quote, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-6">
                    <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 italic leading-relaxed">
                      "{quote.text}"
                    </blockquote>
                    <p className="text-orange-600 font-bold text-lg mb-3">— {quote.author}</p>
                    <p className="text-gray-600">{quote.translation}</p>
                  </div>
                ))}
              </div>
              
              {/* Quote Indicators */}
              <div className="flex justify-center space-x-3 mt-8">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentQuote === index 
                        ? 'bg-orange-500 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className={`bg-white rounded-3xl shadow-xl p-10 mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center mb-10">
            <Globe className="h-10 w-10 text-orange-600 mr-4 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="text-4xl font-bold text-orange-600">
              Select Your Language
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {languages.map((lang, index) => (
              <button
                key={lang.value}
                onClick={() => setSelectedLanguage(lang.value)}
                className={`group relative p-8 rounded-3xl border-3 transition-all duration-300 transform hover:scale-110 ${
                  selectedLanguage === lang.value
                    ? 'border-orange-500 bg-orange-50 shadow-xl scale-110'
                    : 'border-gray-200 hover:border-orange-300 bg-white hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{lang.flag}</div>
                <div className={`font-bold text-lg transition-colors ${
                  selectedLanguage === lang.value ? 'text-orange-700' : 'text-gray-700 group-hover:text-orange-600'
                }`}>
                  {lang.label}
                </div>
                {selectedLanguage === lang.value && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chatbot Interface */}
        <div className={`bg-white rounded-3xl shadow-xl p-10 mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-10">
            <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-6 animate-bounce" />
            <h3 className="text-4xl font-bold text-blue-600 mb-6">
              Ask Your Legal Question
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Describe your legal issue in any language. Our AI will understand and help you.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={8}
                  className="w-full px-10 py-8 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-lg transition-all duration-300 bg-white"
                  placeholder="Type your legal question here...

Example: मेरे पति मुझे मारते हैं और दहेज मांगते हैं। मैं क्या कर सकती हूं?

Example: My employer is not paying minimum wages. What can I do?

Example: জমির বিরোধ নিয়ে সমস্যা হচ্ছে। কী করব?"
                />
                <div className="absolute bottom-8 right-8 flex items-center space-x-4">
                  <span className="text-sm text-gray-400 font-medium">{query.length}/1000</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`group flex items-center space-x-4 px-10 py-5 rounded-3xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-7 w-7" />
                      <span className="text-lg">Stop Recording</span>
                      <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                    </>
                  ) : (
                    <>
                      <Mic className="h-7 w-7 group-hover:animate-bounce" />
                      <span className="text-lg">Voice Input</span>
                      <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="group flex items-center space-x-4 px-12 py-5 bg-blue-600 text-white rounded-3xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <Brain className="h-7 w-7 group-hover:animate-pulse" />
                  <span className="text-lg">Get Legal Advice</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Call to Action */}
        <div className={`bg-green-50 border-2 border-green-200 rounded-3xl p-10 mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-green-900 mb-6">Need Immediate Help?</h3>
            <p className="text-xl text-green-800 mb-10 max-w-3xl mx-auto">
              If you're in immediate danger or need urgent legal assistance, reach out to authorities or emergency services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Phone className="h-12 w-12 text-red-600 mx-auto mb-4 animate-bounce" />
                <h4 className="font-bold text-xl text-gray-900 mb-3">Emergency</h4>
                <p className="text-4xl font-black text-red-600 mb-2">100</p>
                <p className="text-gray-600">Police Emergency</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4 animate-bounce" style={{ animationDelay: '1s' }} />
                <h4 className="font-bold text-xl text-gray-900 mb-3">Women Helpline</h4>
                <p className="text-4xl font-black text-pink-600 mb-2">1091</p>
                <p className="text-gray-600">24/7 Support</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Scale className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-bounce" style={{ animationDelay: '2s' }} />
                <h4 className="font-bold text-xl text-gray-900 mb-3">Legal Aid</h4>
                <p className="text-4xl font-black text-blue-600 mb-2">15100</p>
                <p className="text-gray-600">Free Legal Help</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Integration Space */}
        <div className={`bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-8 w-8 text-yellow-600 animate-pulse" />
            <div>
              <h4 className="font-bold text-xl text-yellow-800">AI Integration Space</h4>
              <p className="text-yellow-700 mt-2 text-lg">
                Space reserved for ML model integration - bias detection, language processing, and legal analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;