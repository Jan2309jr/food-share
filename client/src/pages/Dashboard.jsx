import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DonationCard from '../components/DonationCard';
import Toast from '../components/Toast';

const API_URL = 'http://localhost:5000/api';

export default function Dashboard({ donations, setDonations }) {
  const [donorPhone, setDonorPhone] = useState('');
  const [donorName, setDonorName] = useState('');
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFetchMyDonations = async () => {
    if (!donorPhone) {
      showToast('Please enter your phone number', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/donations/donor/${donorPhone}`);
      setMyDonations(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      if (response.data.length === 0) {
        showToast('No donations found for this phone number', 'error');
      }
    } catch (error) {
      showToast('Failed to fetch donations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/donations/${id}`);
      setMyDonations(myDonations.filter(d => d.id !== id));
      showToast('Donation deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete donation', 'error');
    }
  };

  const handleEdit = (donation) => {
    setEditingId(donation.id);
    setEditForm(donation);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_URL}/donations/${editingId}`, editForm);
      setMyDonations(myDonations.map(d => d.id === editingId ? response.data : d));
      setEditingId(null);
      showToast('Donation updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update donation', 'error');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="container">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Hero Section */}
      <div className="card card-primary" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊 Donor Dashboard</h1>
        <p>Manage your food donations</p>
      </div>

      {!myDonations.length && !donorPhone ? (
        <>
          {/* Login Section */}
          <div className="card" style={{ marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', padding: '2rem', background: 'var(--cream)' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>🔑 Access Your Donations</h2>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Your Phone Number *</label>
              <input
                type="tel"
                placeholder="e.g., +91XXXXXXXXXX"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
              />
            </div>
            <button 
              className="btn btn-primary" 
              onClick={handleFetchMyDonations}
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Access My Donations'}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Donor Info */}
          <div className="card" style={{ marginBottom: '2rem', background: 'var(--light-blue)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>Welcome, {donorName || 'Donor'}! 👋</h3>
              <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>Phone: {donorPhone}</p>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setDonorPhone('');
                setDonorName('');
                setMyDonations([]);
                setEditingId(null);
              }}
            >
              Logout
            </button>
          </div>

          {/* Add New Donation Button */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <button 
              className="btn btn-primary"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
              onClick={() => navigate('/add-donation')}
            >
              ➕ Add New Donation
            </button>
          </div>

          {/* My Donations */}
          <h2 className="section-title">My Donations ({myDonations.length})</h2>
          
          {myDonations.length > 0 ? (
            <div className="grid">
              {myDonations.map(donation => (
                <div key={donation.id}>
                  {editingId === donation.id ? (
                    // Edit Form
                    <div className="card" style={{ padding: '1.5rem', background: 'var(--cream)' }}>
                      <h3 style={{ marginBottom: '1rem' }}>Edit Donation</h3>
                      <div className="form-group">
                        <label>Dish Name</label>
                        <input
                          type="text"
                          value={editForm.dishName || ''}
                          onChange={(e) => setEditForm({ ...editForm, dishName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Serves Count</label>
                        <input
                          type="number"
                          value={editForm.servesCount || ''}
                          onChange={(e) => setEditForm({ ...editForm, servesCount: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          value={editForm.date || ''}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Time</label>
                        <input
                          type="time"
                          value={editForm.time || ''}
                          onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Venue/Location</label>
                        <input
                          type="text"
                          value={editForm.venue || ''}
                          onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Notes</label>
                        <textarea
                          value={editForm.notes || ''}
                          onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" onClick={handleSaveEdit} style={{ flex: 1 }}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel} style={{ flex: 1 }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Card
                    <>
                      <DonationCard
                        donation={donation}
                        showEdit={true}
                        onEdit={() => handleEdit(donation)}
                        onDelete={() => handleDelete(donation.id)}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', background: 'var(--light-blue)' }}>
              <h2>📭 No donations yet</h2>
              <p>Start sharing food! Click "Add New Donation" to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
