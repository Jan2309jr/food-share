import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
            <Link to="/" className="nav-logo">
              🍽️ FoodShare
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/add-donation" className="nav-link">Add Donation</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
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
