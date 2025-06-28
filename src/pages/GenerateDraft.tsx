import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, Download, Edit3, Save, Copy, CheckCircle, AlertTriangle, 
  User, MapPin, Calendar, Phone, Mail, Scale, ArrowLeft, LogOut 
} from 'lucide-react';

const GenerateDraft = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { response } = location.state || {};
  const [isVisible, setIsVisible] = useState(false);

  const [selectedType, setSelectedType] = useState('fir');
  const [formData, setFormData] = useState({
    name: user?.username || '',
    fatherName: '',
    address: '',
    phone: '',
    email: user?.email || '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    policeStation: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const documentTypes = [
    {
      type: 'fir',
      title: 'FIR (First Information Report)',
      description: 'File a police complaint',
      icon: '🚔',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200'
    },
    {
      type: 'rti',
      title: 'RTI Application',
      description: 'Right to Information request',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      type: 'notice',
      title: 'Legal Notice',
      description: 'Formal legal notification',
      icon: '⚖️',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200'
    },
    {
      type: 'complaint',
      title: 'Consumer Complaint',
      description: 'Consumer court filing',
      icon: '🛒',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    }
  ];

  const generateDraftContent = () => {
    const templates = {
      fir: `
To,
The Officer In-Charge,
${formData.policeStation || '[Police Station Name]'}

Subject: First Information Report

Sir/Madam,

I, ${formData.name || '[Your Name]'}, son/daughter of ${formData.fatherName || '[Father\'s Name]'}, resident of ${formData.address || '[Your Address]'}, would like to lodge a complaint regarding the following incident:

Date of Incident: ${formData.date}
Location: ${formData.location || '[Location of Incident]'}

Details of the Complaint:
${formData.description || response?.recommendedActions?.join('\n') || '[Describe the incident in detail]'}

${response?.suggestedLaws?.length ? 
  'Applicable Laws:\n' + response.suggestedLaws.map(law => `- ${law.section}: ${law.description}`).join('\n') 
  : ''}

I request you to register an FIR and take necessary action as per law.

Yours sincerely,
${formData.name || '[Your Name]'}
Contact: ${formData.phone || '[Phone Number]'}
Email: ${formData.email || '[Email Address]'}
Date: ${new Date().toLocaleDateString()}
      `,
      rti: `
To,
The Public Information Officer,
[Department Name]
[Address]

Subject: Application under Right to Information Act, 2005

Sir/Madam,

Under the Right to Information Act, 2005, I ${formData.name || '[Your Name]'}, request the following information:

1. ${formData.description || '[Specify the information you need]'}

2. Please provide certified copies of relevant documents.

3. If the information sought is held by another public authority, kindly transfer this application under Section 6(3) of the RTI Act.

I am enclosing the application fee of Rs. 10/- by way of [payment method].

Contact Details:
Name: ${formData.name || '[Your Name]'}
Address: ${formData.address || '[Your Address]'}
Phone: ${formData.phone || '[Phone Number]'}
Email: ${formData.email || '[Email Address]'}

Date: ${new Date().toLocaleDateString()}

Yours sincerely,
${formData.name || '[Your Name]'}
      `,
      notice: `
LEGAL NOTICE

TO:
[Recipient Name]
[Recipient Address]

FROM:
${formData.name || '[Your Name]'}
${formData.address || '[Your Address]'}

SUBJECT: Legal Notice under [Applicable Law]

Sir/Madam,

TAKE NOTICE that you are hereby called upon to ${formData.description || '[specify the demand/action required]'} within 15 days from the receipt of this notice, failing which my client will be constrained to initiate appropriate legal proceedings against you for the recovery of the said amount along with interest and costs.

${response?.suggestedLaws?.length ? 
  'Legal Provisions:\n' + response.suggestedLaws.map(law => `${law.section}: ${law.description}`).join('\n\n') 
  : ''}

TAKE FURTHER NOTICE that if you fail to comply with the above, my client will be compelled to file a suit for specific performance and/or damages which will be at your risk as to costs.

Dated: ${new Date().toLocaleDateString()}

${formData.name || '[Your Name]'}
Contact: ${formData.phone || '[Phone Number]'}
      `,
      complaint: `
CONSUMER COMPLAINT

Before the District Consumer Disputes Redressal Forum
[District Name]

BETWEEN:

${formData.name || '[Your Name]'}
Son/Daughter of ${formData.fatherName || '[Father\'s Name]'}
Resident of ${formData.address || '[Your Address]'}
Contact: ${formData.phone || '[Phone Number]'}
Email: ${formData.email || '[Email Address]'}

... COMPLAINANT

VERSUS

[Name of opposite party]
[Address of opposite party]

... OPPOSITE PARTY

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

FACTS OF THE CASE:

1. That the complainant purchased goods/services from the opposite party on ${formData.date}.

2. ${formData.description || '[Describe the deficiency in service or defect in goods]'}

3. That the act of the opposite party amounts to deficiency in service/defective goods under the Consumer Protection Act, 2019.

RELIEFS SOUGHT:

a) Direct the opposite party to replace/repair the defective goods/service
b) Refund the amount paid
c) Compensation for mental agony and harassment
d) Cost of litigation

Date: ${new Date().toLocaleDateString()}

${formData.name || '[Your Name]'}
(Complainant)
      `
    };
    
    return templates[selectedType] || '';
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateDraftContent()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedType}_${formData.name || 'draft'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateDraftContent());
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="relative z-20 bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scale className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">
                न्याय AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate('/connect-help')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Connect Help</span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{user.username}</p>
                </div>
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-green-600 mb-4">
            Generate Legal Draft
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional legal documents with AI assistance
          </p>
        </div>

        {/* Document Type Selection */}
        <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Document Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentTypes.map((doc) => (
              <button
                key={doc.type}
                onClick={() => setSelectedType(doc.type)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                  selectedType === doc.type
                    ? `bg-${doc.bgColor.split('-')[1]}-50 border-${doc.bgColor.split('-')[1]}-200 shadow-lg scale-105`
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{doc.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{doc.title}</h3>
                <p className="text-sm text-gray-600">{doc.description}</p>
                {selectedType === doc.type && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Details */}
          <div className={`bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Document Details</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Lock' : 'Edit'}</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="Enter father's name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="Incident/relevant location"
                  />
                </div>
              </div>

              {selectedType === 'fir' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Police Station
                  </label>
                  <input
                    type="text"
                    value={formData.policeStation}
                    onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                    placeholder="Enter police station name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description/Details *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50"
                  placeholder="Describe the incident or provide relevant details"
                />
              </div>
            </div>
          </div>

          {/* Generated Document Preview */}
          <div className={`bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Document Preview</h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                {generateDraftContent()}
              </pre>
            </div>

            {/* AI Suggestions Box */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">AI Integration Space</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Space reserved for AI-powered document optimization, legal accuracy checking, and language improvement suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateDraft;