import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendChat } from '../api';

import { 
  FileText, Users, AlertTriangle, Scale, CheckCircle, Info, Brain, 
  Sparkles, Shield, Target, Zap, ArrowLeft, LogOut, User as UserIcon 
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  // add other user fields as needed
}

interface ChatResponse {
  query: string;
  bias: string | null;
  legal_issue: string;
  urgency: string;
  gpt_class?: {
    legal_issue: string;
    bias: string;
    urgency: string;
  };
  advice?: string;
  lawyers?: {
    name: string;
    contact: string;
  }[];
  ngos?: {
    name: string;
    contact: string;
  }[];
}

interface AIResponseProps {
  user: User;
  onLogout: () => void;
}

const AIResponse: React.FC<AIResponseProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, language } = location.state || {};
  const [isVisible, setIsVisible] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);

  useEffect(() => {
    setIsVisible(true);
    if (query) {
      sendChat(query).then(setResponse).catch(console.error);
    }
  }, [query]);

  if (!response) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading AI analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="h-6 w-6" />
        </button>

        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6 animate-pulse">
            <Brain className="h-4 w-4 mr-2" />
            <span>AI Analysis Complete</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">Legal Analysis Result</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered analysis of your legal query with bias detection and recommendations
          </p>
        </div>

        {/* Query Analysis */}
        <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Info className="h-6 w-6 mr-3 text-blue-600" />
            Your Query Analysis
          </h2>
          <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
            <p className="text-gray-800 text-lg leading-relaxed mb-4">{response.query}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Language: {language || 'Hindi'}
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Urgency: {response.urgency || 'normal'}
              </div>
            </div>
          </div>
        </div>

        {/* Bias Detection */}
        {response.bias && (
          <div className={`bg-red-50 border-2 border-red-200 rounded-3xl p-8 mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-red-600 animate-pulse" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Bias Detected</h3>
                <p className="text-red-800 mb-3">{response.bias.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Detected Legal Issue */}
        <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Scale className="h-6 w-6 mr-3 text-orange-600" />
            Detected Legal Issue
          </h2>
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
            <CheckCircle className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-900">{response.legal_issue}</span>
          </div>
        </div>

        {/* Advice */}
        {response.advice && (
          <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advice</h2>
            <p className="text-gray-800 leading-relaxed">{response.advice}</p>
          </div>
        )}

        {/* Lawyers */}
        {response.lawyers && response.lawyers.length > 0 && (
          <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Lawyers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {response.lawyers.map((lawyer, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-medium text-green-900">{lawyer.name}</h3>
                  <p className="text-green-700 text-sm">{lawyer.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NGOs */}
        {response.ngos && response.ngos.length > 0 && (
          <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended NGOs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {response.ngos.map((ngo, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-medium text-blue-900">{ngo.name}</h3>
                  <p className="text-blue-700 text-sm">{ngo.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResponse;

