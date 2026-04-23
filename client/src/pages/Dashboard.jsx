import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DonationCard from '../components/DonationCard';
import Toast from '../components/Toast';
import { API_URL } from '../config.js';

export default function Dashboard() {
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
    } catch {
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
    } catch {
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
    } catch {
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

      <div className="page-hero page-hero-soft">
        <div>
          <p className="eyebrow">Donor dashboard</p>
          <h1>Manage donations with ease</h1>
          <p className="section-copy">Search, edit, and remove meals from your shared list whenever you need.</p>
        </div>
      </div>

      {!myDonations.length && !donorPhone ? (
        <div className="panel-card panel-center">
          <h2>🔑 Access your donations</h2>
          <p className="section-copy">Enter the phone number you used while sharing meals.</p>
          <div className="form-grid">
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
          </div>
          <button className="btn btn-primary btn-block" onClick={handleFetchMyDonations} disabled={loading}>
            {loading ? 'Loading...' : 'Access My Donations'}
          </button>
        </div>
      ) : (
        <>
          {/* Donor Info */}
          <div className="dashboard-top">
            <div>
              <h3>Welcome, {donorName || 'Donor'}! 👋</h3>
              <p className="section-copy">Phone: {donorPhone}</p>
            </div>
            <div className="dashboard-actions">
              <button className="btn btn-secondary" onClick={() => {
                setDonorPhone('');
                setDonorName('');
                setMyDonations([]);
                setEditingId(null);
              }}>
                Logout
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/add-donation')}>
                + Add donation
              </button>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">My donations</h2>
            <p className="section-copy">Edit or remove shared meals from your list instantly.</p>
          </div>
          
          {myDonations.length > 0 ? (
            <div className="grid">
              {myDonations.map(donation => (
                <div key={donation.id}>
                  {editingId === donation.id ? (
                    <div className="card panel-card" style={{ padding: '1.5rem' }}>
                      <h3 style={{ marginBottom: '1rem' }}>Edit donation</h3>
                      <div className="form-grid">
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
                      </div>
                      <div className="form-grid">
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
                      <div className="form-actions">
                        <button className="btn btn-primary" onClick={handleSaveEdit}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <DonationCard
                      donation={donation}
                      showEdit={true}
                      onEdit={() => handleEdit(donation)}
                      onDelete={() => handleDelete(donation.id)}
                    />
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
