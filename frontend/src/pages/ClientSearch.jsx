import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { skills } from '../data/mockData';
import SkillCard from '../components/SkillCard';
import Layout from '../components/Layout';

const ClientSearch = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [location, setLocation] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();

  const handleGetLocation = async () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const address = data?.address;

            const fullAddress = [
              address?.house_number,
              address?.road,
              address?.suburb || address?.village,
              address?.city || address?.town,
              address?.state,
              address?.postcode,
              address?.country
            ]
              .filter(Boolean) // remove undefined/null
              .join(', ');

            setLocation(fullAddress || 'Your current location');
          } catch (error) {
            console.error('Error reverse geocoding:', error);
            setLocation('Bangalore, Karnataka'); // fallback
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting coordinates:', error);
          setLocation('Bangalore, Karnataka');
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocation('Bangalore, Karnataka');
      setIsGettingLocation(false);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedSkill && location) {
      navigate(`/results?skill=${selectedSkill}&location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <Layout showBackButton showHomeButton title="Find Workers">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What service do you need?
          </h2>
          <p className="text-gray-600">
            Select a service and location to find skilled workers near you
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-8">
          {/* Skill Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Service</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill.icon}
                  name={skill.name}
                  selected={selectedSkill === skill.id}
                  onClick={() => setSelectedSkill(skill.id)}
                />
              ))}
            </div>
          </div>

          {/* Location Input */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Location</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your area, pincode, or city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isGettingLocation ? 'Getting...' : 'Use Current'}
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-500">
                We'll show you workers within 10km of your location
              </p>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!selectedSkill || !location}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Find Workers</span>
          </button>
        </form>

        {/* Popular Searches */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular in Your Area</h3>
          <div className="flex flex-wrap gap-2">
            {['Emergency Plumber', 'AC Repair', 'House Painting', 'Electrical Work', 'Furniture Assembly'].map((service) => (
              <button
                key={service}
                className="bg-white hover:bg-blue-50 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientSearch;
