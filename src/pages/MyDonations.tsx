import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2, Edit, Package, ImageOff, X, AlertTriangle, Check, Upload } from 'lucide-react';

const MyDonations: React.FC = () => {
  const [listings, setListings] = useState([]);
  const { token, user } = useAuth();
  
  // Modal states
  const [editingListing, setEditingListing] = useState<any>(null);
  const [deletingListing, setDeletingListing] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/listings');
      const myListings = response.data.filter((l: any) => l.donor_id === user?.id);
      setListings(myListings);
    } catch (error) {
      console.error('Error fetching listings', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingListing) return;
    try {
      await axios.delete(`http://localhost:5000/api/listings/${deletingListing.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeletingListing(null);
      fetchMyListings();
    } catch (error) {
      console.error('Error deleting listing', error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('food_name', editForm.food_name);
    data.append('description', editForm.description);
    data.append('quantity', editForm.quantity);
    data.append('location', editForm.location);
    data.append('event_type', editForm.event_type);
    if (newImage) {
      data.append('image', newImage);
    }

    try {
      // Using POST for the update route as configured in backend
      await axios.post(`http://localhost:5000/api/listings/${editingListing.id}`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditingListing(null);
      setNewImage(null);
      fetchMyListings();
    } catch (error) {
      console.error('Error updating listing', error);
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '4rem', color: 'var(--text)' }}>YOUR CONTRIBUTIONS</h2>
        <div style={{ width: '120px', height: '8px', background: 'var(--primary)', marginTop: '0.5rem' }}></div>
      </div>
      
      {listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '6rem', background: 'var(--white)', border: '3px solid var(--border)' }}>
          <Package size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
          <h3 style={{ fontSize: '2rem' }}>NO ACTIVE LISTINGS</h3>
          <p style={{ marginTop: '1rem' }}>When you share food, it will appear here for management.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {listings.map((listing: any) => (
            <div key={listing.id} className="animate-up" style={{ 
              display: 'grid', 
              gridTemplateColumns: '150px 1.5fr 1fr 1fr auto', 
              alignItems: 'center', 
              gap: '2.5rem', 
              background: 'var(--white)', 
              padding: '2rem', 
              border: '3px solid var(--border)',
              boxShadow: '10px 10px 0 var(--border)'
            }}>
              <div style={{ 
                width: '100%', 
                height: '100px', 
                border: '2px solid var(--border)', 
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {listing.image_url ? (
                  <img 
                    src={`http://localhost:5000${listing.image_url}`} 
                    alt={listing.food_name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <ImageOff size={24} color="#999" />
                )}
              </div>
              
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)' }}>ITEM</span>
                <h4 style={{ fontSize: '1.4rem' }}>{listing.food_name.toUpperCase()}</h4>
              </div>
              
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>QUANTITY</span>
                <p style={{ fontWeight: 600 }}>{listing.quantity}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>LOCATION</span>
                <p style={{ fontWeight: 600 }}>{listing.location}</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => {
                    setEditingListing(listing);
                    setEditForm(listing);
                  }}
                  style={{ padding: '0.8rem', background: 'var(--accent)', boxShadow: 'none' }}
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => setDeletingListing(listing)}
                  style={{ padding: '0.8rem', background: '#fee2e2', border: '3px solid #ef4444', color: '#ef4444', boxShadow: 'none' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Edit Modal --- */}
      {editingListing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '2rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '3rem', position: 'relative' }}>
            <button onClick={() => setEditingListing(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', boxShadow: 'none', background: 'transparent', padding: '0.5rem' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem' }}>EDIT DONATION</h2>
            <form onSubmit={handleEditSubmit}>
              <label style={{ fontWeight: 800, fontSize: '0.7rem' }}>FOOD NAME</label>
              <input value={editForm.food_name || ''} onChange={(e) => setEditForm({...editForm, food_name: e.target.value})} required />
              
              <label style={{ fontWeight: 800, fontSize: '0.7rem' }}>DESCRIPTION</label>
              <textarea value={editForm.description || ''} rows={3} onChange={(e) => setEditForm({...editForm, description: e.target.value})} required />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 800, fontSize: '0.7rem' }}>QUANTITY</label>
                  <input value={editForm.quantity || ''} onChange={(e) => setEditForm({...editForm, quantity: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontWeight: 800, fontSize: '0.7rem' }}>LOCATION</label>
                  <input value={editForm.location || ''} onChange={(e) => setEditForm({...editForm, location: e.target.value})} required />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontWeight: 800, fontSize: '0.7rem' }}>EVENT TYPE</label>
                <select value={editForm.event_type || 'Wedding'} onChange={(e) => setEditForm({...editForm, event_type: e.target.value})}>
                  <option value="Wedding">WEDDING</option>
                  <option value="Social Gathering">SOCIAL GATHERING</option>
                  <option value="Corporate">CORPORATE</option>
                  <option value="Other">OTHER</option>
                </select>
              </div>

              <label style={{ fontWeight: 800, fontSize: '0.7rem' }}>CHANGE IMAGE (OPTIONAL)</label>
              <div style={{ 
                position: 'relative', 
                height: '60px', 
                border: '3px solid var(--border)', 
                background: 'var(--white)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '2rem',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
              }}>
                 <Upload size={18} style={{ marginRight: '0.5rem' }} />
                 <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{newImage ? newImage.name : 'CLICK TO UPLOAD NEW PHOTO'}</span>
                 <input type="file" style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} onChange={(e) => e.target.files && setNewImage(e.target.files[0])} />
              </div>

              <button className="primary" style={{ width: '100%' }}>UPDATE LISTING</button>
            </form>
          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deletingListing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem', textAlign: 'center' }}>
            <AlertTriangle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>ARE YOU SURE?</h2>
            <p style={{ marginBottom: '2.5rem', fontWeight: 500 }}>
              This will permanently delete your listing for <br/> <strong>{deletingListing.food_name.toUpperCase()}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setDeletingListing(null)} style={{ flex: 1 }}>CANCEL</button>
              <button onClick={handleDelete} style={{ flex: 1, background: 'var(--primary)', color: 'var(--white)' }}>
                YES, DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
