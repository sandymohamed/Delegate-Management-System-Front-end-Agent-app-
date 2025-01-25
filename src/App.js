import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/path';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;