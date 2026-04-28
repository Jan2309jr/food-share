import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Camera, MapPin, Info, Upload } from 'lucide-react';

const Donate: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_name: '',
    description: '',
    quantity: '',
    location: '',
    event_type: 'Wedding'
  });
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const data = new FormData();
    data.append('food_name', formData.food_name);
    data.append('description', formData.description);
    data.append('quantity', formData.quantity);
    data.append('location', formData.location);
    data.append('event_type', formData.event_type);
    if (image) {
      data.append('image', image);
    }

    try {
      await axios.post('/api/listings', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating listing', error);
      alert('Failed to submit listing');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem' }}>
        <div className="animate-up">
          <span className="badge" style={{ marginBottom: '1.5rem' }}>CONTRIBUTION</span>
          <h2 style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>SHARE YOUR <br/> SURPLUS.</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, opacity: 0.8 }}>
            Whether it's a few portions or a full banquet, your donation makes a real difference. Upload a photo so others can see the quality of the food.
          </p>
          <div style={{ marginTop: '3rem', padding: '2rem', border: '3px solid var(--border)', background: 'var(--accent)' }}>
            <h4 style={{ marginBottom: '1rem' }}>QUICK TIPS</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontWeight: 500 }}>
              <li>• Mention if food is vegetarian</li>
              <li>• Be specific about the location</li>
              <li>• Provide accurate quantity details</li>
            </ul>
          </div>
        </div>

        <div className="animate-up" style={{ backgroundColor: 'var(--white)', padding: '4rem', border: '3px solid var(--border)', boxShadow: '20px 20px 0 var(--border)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <Info size={16} /> FOOD ITEM NAME
              </label>
              <input 
                placeholder="e.g. Traditional Platter / Fresh Croissants" 
                onChange={(e) => setFormData({...formData, food_name: e.target.value})} 
                required 
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: 800, fontSize: '0.8rem', display: 'block', marginBottom: '0.8rem' }}>DESCRIPTION</label>
              <textarea 
                placeholder="Briefly describe the food and any allergen info..." 
                rows={4} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ fontWeight: 800, fontSize: '0.8rem', display: 'block', marginBottom: '0.8rem' }}>QUANTITY</label>
                <input placeholder="e.g. 15kg / 20 Boxes" onChange={(e) => setFormData({...formData, quantity: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontWeight: 800, fontSize: '0.8rem', display: 'block', marginBottom: '0.8rem' }}>EVENT TYPE</label>
                <select onChange={(e) => setFormData({...formData, event_type: e.target.value})}>
                  <option value="Wedding">WEDDING</option>
                  <option value="Social Gathering">SOCIAL GATHERING</option>
                  <option value="Corporate">CORPORATE</option>
                  <option value="Other">OTHER</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <MapPin size={16} /> PICKUP LOCATION
              </label>
              <input placeholder="e.g. Downtown, Hall 4, Landmark" onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <label style={{ fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <Camera size={16} /> FOOD IMAGE
              </label>
              <div style={{ position: 'relative', height: '100px', border: '3px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}>
                <Upload size={24} />
                <span style={{ fontWeight: 700 }}>{image ? image.name : 'CLICK TO UPLOAD PHOTO'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                />
              </div>
            </div>

            <button className="primary" style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem' }} disabled={uploading}>
              {uploading ? 'UPLOADING...' : 'SUBMIT LISTING'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;
