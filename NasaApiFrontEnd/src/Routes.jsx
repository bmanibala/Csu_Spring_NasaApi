// routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Component/NasaComponent'; // Assume you have a HomePage component
import NasaPage from './Component/NasaPage'; // Your newly created NasaPage component

// Define a component that includes all your routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nasa" element={<NasaPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
