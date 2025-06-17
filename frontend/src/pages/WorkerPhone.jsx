import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Layout from '../components/Layout';
import { sendOtp, verifyOtp } from '../utils/storage';


const WorkerPhone = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const skill = searchParams.get('skill');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      try {
        const data = await sendOtp(phone); // ✅ await and capture response
        console.log('OTP Sent:', data);
        setOtpSent(true); // ✅ update UI state if OTP is sent successfully
      } catch (err) {
        console.error(err);
        alert('Error sending OTP');
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyOtp(phone, otp); // ✅ await and capture response
      console.log('OTP Verify Response:', data);

      if (data.verified) {
        navigate(`/worker-profile?skill=${skill}&phone=${phone}`);
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    }
  };



  return (
    <Layout showBackButton showHomeButton title="Phone Verification">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Phone Number
            </h2>
            <p className="text-gray-600">
              We'll send you a verification code to confirm your number
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Mobile Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Send Verification Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter The OTP sent"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Code sent to {phone}
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Verify & Continue
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-blue-600 hover:text-blue-700 font-medium py-2"
              >
                Change Phone Number
              </button>
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Enter 6-digit code to continue.
                </p>
              </div>
            </form>

          )}
        </div>


      </div>
    </Layout>
  );
};

export default WorkerPhone;
