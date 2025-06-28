import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Phone, Mail, Star, Filter, Users, Globe, Award,
  CheckCircle, Heart, MessageCircle, Clock, Briefcase, Scale, 
  ArrowLeft, LogOut, User
} from 'lucide-react';

const ConnectHelp = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const locations = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
  ];

  const specialties = [
    'Women Rights', 'Domestic Violence', 'Land Disputes', 'Labor Rights',
    'Caste Discrimination', 'Consumer Protection', 'Criminal Law',
    'Family Law', 'Property Law', 'Constitutional Law'
  ];

  const partners = [
    {
      id: 1,
      name: 'Priya Sharma',
      organization: 'Women\'s Legal Aid Society',
      type: 'lawyer',
      specialties: ['Women Rights', 'Domestic Violence', 'Family Law'],
      location: 'Delhi',
      experience: '8 years',
      languages: ['Hindi', 'English', 'Punjabi'],
      rating: 4.9,
      reviews: 127,
      phone: '+91 98765 43210',
      email: 'priya@wlas.org',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: true,
      description: 'Specialized in women\'s rights and domestic violence cases. Providing free legal aid for 8+ years.',
      successRate: '94%',
      casesHandled: 340
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      organization: 'Legal Aid Foundation',
      type: 'ngo',
      specialties: ['Land Disputes', 'Property Law', 'Consumer Protection'],
      location: 'Mumbai',
      experience: '12 years',
      languages: ['Hindi', 'English', 'Marathi'],
      rating: 4.7,
      reviews: 89,
      phone: '+91 87654 32109',
      email: 'rajesh@laf.org',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: false,
      description: 'NGO providing comprehensive legal support for property and consumer disputes.',
      successRate: '89%',
      casesHandled: 520
    },
    {
      id: 3,
      name: 'Dr. Meera Patel',
      organization: 'Dalit Rights Collective',
      type: 'activist',
      specialties: ['Caste Discrimination', 'Constitutional Law', 'Criminal Law'],
      location: 'Ahmedabad',
      experience: '15 years',
      languages: ['Hindi', 'English', 'Gujarati'],
      rating: 5.0,
      reviews: 203,
      phone: '+91 76543 21098',
      email: 'meera@drc.org',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      verified: true,
      available: true,
      description: 'Human rights activist and legal expert specializing in caste-based discrimination cases.',
      successRate: '96%',
      casesHandled: 180
    }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !selectedLocation || partner.location === selectedLocation;
    const matchesSpecialty = !selectedSpecialty || partner.specialties.includes(selectedSpecialty);
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesSpecialty && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lawyer':
        return <Briefcase className="h-4 w-4" />;
      case 'ngo':
        return <Heart className="h-4 w-4" />;
      case 'activist':
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lawyer':
        return 'bg-blue-100 text-blue-700';
      case 'ngo':
        return 'bg-green-100 text-green-700';
      case 'activist':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
                onClick={() => navigate('/generate-draft')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Generate Document</span>
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-4">
            Connect with Legal Help
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Find verified lawyers, NGOs, and legal aid organizations near you
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Verified Partners</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4 text-blue-600" />
              <span>Multi-language Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-red-600" />
              <span>Free Legal Aid Available</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`bg-white rounded-3xl shadow-xl p-8 mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, organization, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Types</option>
                <option value="lawyer">Lawyers</option>
                <option value="ngo">NGOs</option>
                <option value="activist">Activists</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className={`flex items-center justify-between mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-purple-600">{filteredPartners.length}</span> legal partners
          </p>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Sort by: Relevance</span>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {filteredPartners.map((partner, index) => (
            <div 
              key={partner.id} 
              className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                      {partner.verified && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{partner.organization}</p>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(partner.type)}`}>
                        {getTypeIcon(partner.type)}
                        <span className="capitalize">{partner.type}</span>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        partner.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>{partner.available ? 'Available' : 'Busy'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{partner.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">{partner.successRate}</div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">{partner.casesHandled}</div>
                    <div className="text-xs text-gray-500">Cases Handled</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-lg font-bold text-gray-900">{partner.experience}</div>
                    <div className="text-xs text-gray-500">Experience</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({partner.reviews} reviews)</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{partner.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{partner.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{partner.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      partner.available
                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!partner.available}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                    <Award className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Matching Placeholder */}
        <div className={`bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-start space-x-3">
            <Users className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">AI Partner Matching</h3>
              <p className="text-blue-800 mt-1">
                Space reserved for intelligent partner matching based on case type, location, language preferences, and success rates.
              </p>
              <p className="text-blue-700 text-sm mt-2">
                Future features: Real-time availability, automated case assignment, and outcome prediction.
              </p>
            </div>
          </div>
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No partners found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectHelp;