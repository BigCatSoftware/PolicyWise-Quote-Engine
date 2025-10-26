import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage, QuotePage } from './pages';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="info-panel">
        <h1>Find Your Perfect Policy</h1>
        <p>Our smart engine provides fast, accurate, and transparent quotes. Fill out the form to get your personalized insurance estimate in minutes.</p>
      </div>
      <div className="form-panel">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quote" element={<QuotePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

