import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit3, Trash2, Phone, MapPin, Clock, Languages, Star, AlertTriangle } from 'lucide-react';
import {  getAllWorkers,deleteWorkerById,getAllSkills   } from '../utils/storage';
import Layout from '../components/Layout';

const WorkerDashboard = () => {

    
  const [workers, setWorkers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate();
   useEffect(() => {
  const fetchWorkers = async () => {
    try {
      const workers = await getAllWorkers();
      setWorkers(workers);
    } catch (error) {
      console.error('Error fetching workers:', error.message);
    }
  };
  fetchWorkers();
}, []);
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
      console.error('Error loading data:', error.message);
    }
  };

  fetchData();
}, []);


  const handleEdit = (worker) => {
    navigate(`/worker-edit/${worker._id}`);
  };

  const handleDelete = async (workerId) => {
  try {
    await deleteWorkerById(workerId); // Call your DELETE API
    // Update local state only if deletion succeeds
    setWorkers(prev => prev.filter(w => w._id !== workerId));
    setShowDeleteConfirm(null);
  } catch (error) {
    console.error('Failed to delete worker:', error);
    alert('Failed to delete worker profile. Please try again.');
  }
};
const getSkillName = (skillId) => {
  const skill = skills.find(s => s.id === skillId);
  return skill ? skill.name : skillId;
};
  if (workers.length === 0) {
    return (
      <Layout showBackButton showHomeButton title="Worker Dashboard">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Worker Profiles Found</h2>
            <p className="text-gray-600 mb-8">You haven't created any worker profiles yet. Create your first profile to start receiving client calls.</p>
            <button
              onClick={() => navigate('/select-role')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Create Worker Profile
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton showHomeButton title="Worker Dashboard">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Worker Profiles</h2>
          <p className="text-gray-600">Manage your profiles and track your visibility to clients</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Array.isArray(workers) && workers.map((worker) => (
            <div key={worker._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{worker.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{worker.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{worker.experience} years exp</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {getSkillName(worker.skill)}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{worker.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{worker.serviceArea}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{worker.availability}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Languages className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{worker.languages.join(', ')}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(worker)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(worker._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/select-role')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Add New Profile</span>
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Delete Profile</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this worker profile? This action cannot be undone and you will no longer receive client calls for this profile.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Tips to Get More Clients</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Keep your availability updated to show when you're free</li>
            <li>• Expand your service areas to reach more clients</li>
            <li>• Respond quickly to client calls to build trust</li>
            <li>• Provide excellent service to maintain high ratings</li>
            <li>• Consider adding multiple skill profiles if you're multi-skilled</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerDashboard;
