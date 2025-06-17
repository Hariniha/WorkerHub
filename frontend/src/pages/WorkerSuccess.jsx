import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Users, Settings } from 'lucide-react';
import Layout from '../components/Layout';

const WorkerSuccess = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto text-center py-16">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Profile Created Successfully!
          </h2>

          <p className="text-gray-600 mb-8">
            Your profile is now live and visible to nearby clients.
            Start receiving calls for your services right away!
          </p>

          <div className="space-y-4">
            <Link
              to="/worker-dashboard"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Manage Profile</span>
            </Link>

            <Link
              to="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/client-search"
              className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Browse Other Workers</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-700 space-y-1 text-left">
            <li>• Keep your phone ready for client calls</li>
            <li>• Provide excellent service to build ratings</li>
            <li>• Update your availability as needed</li>
            <li>• Expand your service areas over time</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerSuccess;
