import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginErrorMessage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          It looks like you're not logged in!
        </h2>
        <p className="text-gray-600 mb-6">
          Please log in to access this page.
        </p>
        <button
          onClick={() => navigate("/logins")}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default LoginErrorMessage;
