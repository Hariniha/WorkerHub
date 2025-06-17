import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Phone, CheckCircle, Wrench, Zap, Settings } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">WorkHub Local</h1>
            </div>
            <Link
              to="/worker-dashboard"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Worker Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Find and Hire Skilled Workers Near You
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Call, No Chat Needed
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Connect directly with trusted local professionals through phone calls.
            Skip the messaging back and forth - get immediate responses and book services instantly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 max-w-md mx-auto">
          <Link
            to="/client-search"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-center"
          >
            Find Workers
          </Link>
          <Link
            to="/select-role"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-center"
          >
            Join as Worker
          </Link>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">1. Search & Browse</h4>
              <p className="text-gray-600">
                Select the service you need and browse verified local professionals in your area.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">2. Call Directly</h4>
              <p className="text-gray-600">
                Skip the chat - call the worker directly to discuss your requirements and get quotes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">3. Book & Complete</h4>
              <p className="text-gray-600">
                Schedule the service at your convenience and get quality work done by trusted professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Services */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Popular Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'Plumber', icon: Wrench, color: 'blue' },
              { name: 'Electrician', icon: Zap, color: 'yellow' },
              { name: 'Painter', icon: '🎨', color: 'purple' },
              { name: 'Carpenter', icon: '🔨', color: 'orange' },
              { name: 'Mechanic', icon: '⚙️', color: 'gray' },
              { name: 'Gardener', icon: '🌱', color: 'green' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="text-3xl mb-2">
                  {typeof service.icon === 'string' ? service.icon : <service.icon className="w-8 h-8 mx-auto text-gray-600" />}
                </div>
                <p className="text-sm font-medium text-gray-700">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">WorkHub Local</span>
          </div>
          <p className="text-gray-400">
            Connecting communities with skilled professionals, one call at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
