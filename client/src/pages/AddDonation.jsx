import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';

const API_URL = 'http://localhost:5000/api';

export default function AddDonation({ setDonations }) {
  const [form, setForm] = useState({
    dishName: '',
    servesCount: '',
    date: '',
    time: '',
    venue: '',
    donorPhone: '',
    donorName: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.dishName || !form.servesCount || !form.date || !form.time || !form.venue || !form.donorPhone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Phone validation (basic)
    if (!/^\+?[\d\s\-()]{10,}$/.test(form.donorPhone)) {
      showToast('Please enter a valid phone number', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/donations`, form);
      showToast('Donation added successfully! 🎉', 'success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      showToast('Failed to add donation. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <div className="card card-secondary" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎁 Share Your Food</h1>
        <p>Fill in the details of your food donation</p>
      </div>

      {/* Form */}
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem', padding: '2rem', background: 'white' }}>
        <form onSubmit={handleSubmit}>
          {/* Donor Information */}
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>👤 Your Information</h3>
          
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="donorName"
              placeholder="Your name (optional)"
              value={form.donorName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Your Phone Number * (WhatsApp preferred)</label>
            <input
              type="tel"
              name="donorPhone"
              placeholder="e.g., +91XXXXXXXXXX or 9XXXXXXXXXX"
              value={form.donorPhone}
              onChange={handleChange}
              required
            />
            <small style={{ marginTop: '0.3rem', color: '#666' }}>Receivers will contact you on this number</small>
          </div>

          {/* Food Information */}
          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #E0E0E0' }} />
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>🍽️ Food Details</h3>

          <div className="form-group">
            <label>Dish Name *</label>
            <input
              type="text"
              name="dishName"
              placeholder="e.g., Biryani, Samosa, Cake, etc."
              value={form.dishName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Number of People It Serves *</label>
            <input
              type="number"
              name="servesCount"
              placeholder="e.g., 4"
              value={form.servesCount}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          {/* Date & Time */}
          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #E0E0E0' }} />
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>📅 When & Where</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Time *</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Venue/Location *</label>
            <input
              type="text"
              name="venue"
              placeholder="e.g., Sector 5, Delhi or Restaurant name, Address"
              value={form.venue}
              onChange={handleChange}
              required
            />
          </div>

          {/* Optional Notes */}
          <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #E0E0E0' }} />
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>📝 Additional Information</h3>

          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea
              name="notes"
              placeholder="Any special instructions? e.g., Vegetarian, Contains nuts, Best if consumed by 3 PM, etc."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Publishing...' : '✨ Publish Donation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
