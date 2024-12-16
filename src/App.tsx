import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthForm } from './components/AuthForm';
import { Logo } from './components/Logo';
import { AuthToggle } from './components/AuthToggle';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <Logo />

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <AuthToggle authType={authType} onToggle={setAuthType} />
          <AuthForm type={authType} />
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;