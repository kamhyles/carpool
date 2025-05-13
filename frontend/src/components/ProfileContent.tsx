import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileContent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const name = user?.name || 'User';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-left">Profile</h1>

      {/* User Info */}
      <div className="flex items-center bg-gray-100 p-4 rounded shadow">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
        <p className="ml-4 text-lg font-medium">{name}</p>
      </div>

      {/* Navigation Options */}
      <div>
        <div
          onClick={() => navigate('/personal-info')}
          className="cursor-pointer bg-white border rounded p-4 mb-2 shadow hover:bg-gray-50"
        >
          Personal Info
        </div>
        <div
          onClick={() => navigate('/account-settings')}
          className="cursor-pointer bg-white border rounded p-4 shadow hover:bg-gray-50"
        >
          My Account
        </div>
      </div>

      {/* Log out */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileContent;
