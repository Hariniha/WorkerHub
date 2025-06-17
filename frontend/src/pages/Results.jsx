import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SortDesc } from 'lucide-react';
import { getAllWorkers, getAllSkills } from '../utils/storage';
import WorkerCard from '../components/WorkerCard';
import Layout from '../components/Layout';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [workers, setWorkers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const skillParam = searchParams.get('skill');
  const location = searchParams.get('location');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workersData, skillsData] = await Promise.all([
          getAllWorkers(),
          getAllSkills(),
        ]);
        setWorkers(workersData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...workers];

    // Filter by skill id if present
    if (skillParam) {
      result = result.filter(worker => worker.skill === skillParam);
    }

    // Filter by location
    if (location) {
      result = result.filter(worker =>
        worker.serviceArea.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.serviceArea.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort workers
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'experience':
        result.sort((a, b) => b.experience - a.experience);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredWorkers(result);
  }, [workers, searchTerm, sortBy, skillParam, location]);

  // Get skill name by ID
  const skillName = skills.find(s => s.id === skillParam)?.name || 'Workers';

  return (
    <Layout showBackButton showHomeButton title={`${skillName}s near ${location || 'your area'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or area..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <SortDesc className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredWorkers.length} {skillName}s found
            </h2>
            {location && <p className="text-gray-600">in {location}</p>}
          </div>
        </div>

        {/* Workers Grid */}
        {filteredWorkers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker._id} worker={worker} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No workers found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or check back later for new workers in your area.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Don't see what you're looking for?
          </h3>
          <p className="text-blue-700 mb-4">
            More workers are joining our platform every day. Check back soon or try a different service.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
