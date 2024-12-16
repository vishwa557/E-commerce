import React from 'react';

type AuthToggleProps = {
  authType: 'login' | 'signup';
  onToggle: (type: 'login' | 'signup') => void;
};

export const AuthToggle: React.FC<AuthToggleProps> = ({ authType, onToggle }) => (
  <div className="flex gap-4 mb-8">
    <button
      onClick={() => onToggle('login')}
      className={`flex-1 py-2 text-center rounded-lg transition-all ${
        authType === 'login'
          ? 'bg-purple-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      Login
    </button>
    <button
      onClick={() => onToggle('signup')}
      className={`flex-1 py-2 text-center rounded-lg transition-all ${
        authType === 'signup'
          ? 'bg-purple-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      Sign Up
    </button>
  </div>
);