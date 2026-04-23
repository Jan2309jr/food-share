import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DonationCard from '../components/DonationCard';
import Toast from '../components/Toast';
import { API_URL } from '../config.js';

export default function Home({ donations, setDonations }) {
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [toast, setToast] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    async function loadDonations() {
      try {
        const response = await axios.get(`${API_URL}/donations`);
        setDonations(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch {
        showToast('Failed to load donations', 'error');
      }
    }

    loadDonations();
  }, [setDonations]);

  const handleAvail = (donation) => {
    if (!userName || !userPhone) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }

    const message = `Hi, I am ${userName}.\nI would like to avail this food:\n\nDish: ${donation.dishName}\nServes: ${donation.servesCount}\nLocation: ${donation.venue}\nDate & Time: ${donation.date} ${donation.time}\n\nMy contact: ${userPhone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${donation.donorPhone}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
    showToast('Opening WhatsApp...', 'success');
  };

  const filteredDonations = selectedLocation === 'all' 
    ? donations 
    : donations.filter(d => d.venue === selectedLocation);

  const locations = [...new Set(donations.map(d => d.venue))];

  return (
    <div className="container">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Hero Section */}
      <div className="card hero-card hero-banner">
        <div>
          <h1>🍽️ Share food with ease</h1>
          <p>Discover fresh meals donated by neighbours, claim your meal quickly, and coordinate pickup via WhatsApp.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/add-donation')}>Donate now</button>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>View my donations</button>
          </div>
        </div>
        <div className="hero-tiles">
          <div className="hero-tile">
            <span>Fresh Meals</span>
            <p>Home-cooked food ready to share.</p>
          </div>
          <div className="hero-tile">
            <span>Kind Neighbors</span>
            <p>Local donors offering extra servings.</p>
          </div>
          <div className="hero-tile">
            <span>Instant Avail</span>
            <p>Connect via WhatsApp instantly.</p>
          </div>
          <div className="hero-tile">
            <span>Safe Pickup</span>
            <p>Easy handoff locations.</p>
          </div>
          <div className="hero-tile">
            <span>Easy Donate</span>
            <p>Publish your meal in minutes.</p>
          </div>
          <div className="hero-tile">
            <span>Community</span>
            <p>Support local food sharing.</p>
          </div>
          <div className="hero-tile">
            <span>Soft Design</span>
            <p>Pastel visuals for calm browsing.</p>
          </div>
          <div className="hero-tile">
            <span>Quick Filter</span>
            <p>Search by venue with ease.</p>
          </div>
        </div>
      </div>

      {/* User Info Form */}
      <div className="card" style={{ marginBottom: '2rem', padding: '2rem', background: 'var(--cream)' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>👤 Your Details (to request food)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Your Phone (WhatsApp) *</label>
            <input
              type="tel"
              placeholder="e.g., +91XXXXXXXXXX"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Available Donations</h2>
          <p className="section-copy">Browse all shared meals and choose the one that fits your schedule.</p>
        </div>
        {locations.length > 0 && (
          <div className="location-filter">
            <label>Filter by location</label>
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="all">All locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Donations Grid */}
      {filteredDonations.length > 0 ? (
        <div className="grid">
          {filteredDonations.map(donation => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onAvail={() => handleAvail(donation)}
              showEdit={false}
            />
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', background: 'var(--light-blue)' }}>
          <h2>😢 No donations available yet</h2>
          <p>Check back soon or become a donor yourself!</p>
          <button className="btn btn-primary" onClick={() => navigate('/add-donation')}>
            Add a Donation
          </button>
        </div>
      )}
    </div>
  );
}
