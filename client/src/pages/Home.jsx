import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DonationCard from '../components/DonationCard';
import Toast from '../components/Toast';

const API_URL = 'http://localhost:5000/api';

export default function Home({ donations, setDonations }) {
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [toast, setToast] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${API_URL}/donations`);
      setDonations(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      showToast('Failed to load donations', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAvail = (donation) => {
    if (!userName || !userPhone) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }

    const message = `Hi, I am ${userName}.\nI would like to avail the food donation:\n\nDish: ${donation.dishName}\nServes: ${donation.servesCount}\nLocation: ${donation.venue}\nDate & Time: ${donation.date} ${donation.time}\n\nPlease confirm availability.`;

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
      <div className="card card-accent" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🍽️ Share Food, Share Love</h1>
        <p style={{ fontSize: '1.1rem' }}>Find and avail excess food from donors in your community</p>
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
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Available Donations</h2>
        {locations.length > 0 && (
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', border: '2px solid #E0E0E0', fontSize: '1rem' }}
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
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
