import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, Star, Languages } from 'lucide-react';

const WorkerCard = ({ worker }) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleMakeCall = () => {
    window.open(`tel:${worker.phone}`, '_self');
  };

  const handleSendSMS = () => {
    const message = `Hi ${worker.name}, I found your profile on WorkHub Local and would like to hire your ${worker.skill} services. Please let me know your availability.`;
    window.open(`sms:${worker.phone}?body=${encodeURIComponent(message)}`, '_self');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
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
            {worker.skill}
          </div>
        </div>

        <div className="space-y-3 mb-6">
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
            onClick={handleMakeCall}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now</span>
          </button>
          <button
            onClick={handleSendSMS}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send SMS</span>
          </button>
        </div>

        {/* Desktop Notice */}
        {!isMobile && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            ⚠️ You're using a desktop. Please use your mobile device to contact the worker via call or SMS.
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkerCard;
