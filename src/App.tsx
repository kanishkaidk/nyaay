import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import AIResponse from './pages/AIResponse';
import GenerateDraft from './pages/GenerateDraft';
import ConnectHelp from './pages/ConnectHelp';

interface User {
  id: string;
  name: string;
  email: string;
  // add other user fields here
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('nyaayai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('nyaayai_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nyaayai_user');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={
            user ? <Navigate to="/" /> : <Auth onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/" 
          element={
            user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />
          } 
        />
        <Route 
          path="/ai-response" 
          element={
            user ? <AIResponse user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />
          } 
        />
        <Route 
          path="/generate-draft" 
          element={
            user ? <GenerateDraft user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />
          } 
        />
        <Route 
          path="/connect-help" 
          element={
            user ? <ConnectHelp user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
