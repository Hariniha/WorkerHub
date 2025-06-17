import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const Layout = ({
  children,
  showBackButton = false,
  showHomeButton = false,
  title
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {!isHomePage && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              {title && <h1 className="text-xl font-semibold text-gray-800">{title}</h1>}
            </div>
            {showHomeButton && (
              <Link
                to="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 text-gray-600" />
              </Link>
            )}
          </div>
        </header>
      )}
      <main className={isHomePage ? '' : 'max-w-4xl mx-auto px-4 py-6'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
