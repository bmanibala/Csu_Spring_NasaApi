import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';
import Nasacomponent from './Component/NasaComponent';
import NasaPage from './Component/NasaPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Route path="/" element={<Nasacomponent />}>,
        <Route path="/nasa" element={<NasaPage />} />,
        </Route>
    </BrowserRouter>
  </React.StrictMode>
);
