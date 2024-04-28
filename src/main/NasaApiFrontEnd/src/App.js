import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';

import NasaComponent from "./Component/NasaComponent";
import NasaPage from './Component/NasaPage';
// Import the Header component if it exists
import Header from './Component/Header'; // Adjust the path as necessary

const App = () => {
  return (
    <Router>
      <div>
        {/* Ensure Header is imported if you are using it */}
        <Header />
        <Routes>
          <Route path="/" element={<NasaComponent />} />
          <Route path="/nasa" element={<NasaPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
