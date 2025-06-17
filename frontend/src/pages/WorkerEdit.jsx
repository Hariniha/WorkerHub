import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, MapPin, Clock, Languages, Briefcase, Save } from 'lucide-react';
import { skills } from '../data/mockData';
import { storeWorker, updateWorkerById } from '../utils/storage';
import Layout from '../components/Layout';

const WorkerEdit = () => {
  const [formData, setFormData] = useState({
    name: '',
    experience: 1,
    serviceArea: '',
    pincode: '',
    availability: '',
    languages: [],
  });
  
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const { workerId } = useParams();
  const navigate = useNavigate();
  
  const availableLanguages = ['Hindi', 'English', 'Kannada', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Urdu'];

 useEffect(() => {
  const fetchWorker = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/workers/${workerId}`);
      const data = await response.json();
      setWorker(data);
      setFormData({
        name: data.name,
        experience: data.experience,
        serviceArea: data.serviceArea,
        pincode: data.pincode,
        availability: data.availability,
        languages: data.languages,
      });
    } catch (error) {
      console.error('Error fetching worker:', error);
      navigate('/worker-dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (workerId) fetchWorker();
}, [workerId, navigate]);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("workersffffff:",worker);

  if (!worker) return;

  // Build object with only modified fields
  const changedFields = {};

  Object.keys(formData).forEach((key) => {
    if (formData[key] !== worker[key]) {
      changedFields[key] = formData[key];
    }
  });

  if (Object.keys(changedFields).length === 0) {
    // No changes made
    alert("No changes were made.");
    return;
  }
  console.log(worker._id, changedFields);

  updateWorkerById(worker._id, changedFields);
  navigate('/worker-dashboard');
};


  if (loading) {
    return (
      <Layout showBackButton showHomeButton title="Edit Profile">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (!worker) {
    return null;
  }

  const skillData = skills.find(s => s.id === worker.skill);

  return (
    <Layout showBackButton showHomeButton title="Edit Profile">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Edit Your {skillData?.name} Profile
            </h2>
            <p className="text-gray-600">
              Update your information to attract more clients
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

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/worker-dashboard')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formData.languages.length === 0}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Profile Info */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">Profile ID:</span>
            <span className="font-mono">{worker.id}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
            <span className="font-medium">Phone:</span>
            <span>{worker.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
            <span className="font-medium">Skill:</span>
            <span className="capitalize">{skillData?.name}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerEdit;
