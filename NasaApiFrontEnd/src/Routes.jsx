// routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Component/NasaComponent';
import NasaPage from './Component/NasaPage';

// Define a component that includes all your routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nasa" element={<NasaPage />} />
      {/*we can addmore routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
