import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddDonation from './pages/AddDonation';
import './App.css';

function App() {
  const [donations, setDonations] = useState([]);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <a href="/" className="nav-logo">
              🍽️ FoodShare
            </a>
            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/dashboard" className="nav-link">My Dashboard</a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home donations={donations} setDonations={setDonations} />} />
          <Route path="/dashboard" element={<Dashboard donations={donations} setDonations={setDonations} />} />
          <Route path="/add-donation" element={<AddDonation setDonations={setDonations} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
