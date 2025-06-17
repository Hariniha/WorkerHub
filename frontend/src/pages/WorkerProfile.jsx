import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, MapPin, Clock, Languages, Briefcase } from 'lucide-react';
import { skills } from '../data/mockData';
import { storeWorker } from '../utils/storage';
import Layout from '../components/Layout';

const WorkerProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    experience: 1,
    serviceArea: '',
    pincode: '',
    availability: '',
    languages: [],
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const skill = searchParams.get('skill');
  const phone = searchParams.get('phone');

  const skillData = skills.find((s) => s.id === skill);
  const availableLanguages = ['Hindi', 'English', 'Kannada', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Urdu'];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skill || !phone) return;

    const worker = {
      id: Date.now().toString(),
      name: formData.name,
      skill,
      phone,
      experience: formData.experience,
      serviceArea: formData.serviceArea,
      pincode: formData.pincode,
      availability: formData.availability,
      languages: formData.languages,
      rating: 5.0,
    };

    storeWorker(worker);
    navigate('/worker-dashboard');
  };

  return (
    <Layout showBackButton showHomeButton title="Complete Your Profile">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Create Your {skillData?.name} Profile
            </h2>
            <p className="text-gray-600">
              Help clients find and trust your services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Years of Experience</span>
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'year' : 'years'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Service Areas</span>
              </label>
              <input
                type="text"
                value={formData.serviceArea}
                onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Koramangala, BTM Layout, HSR Layout"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Pincode</span>
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="560001"
                maxLength={6}
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Availability</span>
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mon-Sat, 9 AM - 6 PM"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                <Languages className="w-4 h-4" />
                <span>Languages Spoken</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => handleLanguageToggle(language)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      ${formData.languages.includes(language)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {language}
                  </button>
                ))}
              </div>
              {formData.languages.length === 0 && (
                <p className="text-sm text-red-500 mt-2">Please select at least one language</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formData.languages.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerProfile;
