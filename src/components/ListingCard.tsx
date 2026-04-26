import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Box, Send, ImageOff } from 'lucide-react';

interface Listing {
  id: number;
  food_name: string;
  description: string;
  quantity: string;
  location: string;
  event_type: string;
  image_url: string;
  donor_name: string;
  donor_phone: string;
}

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleAvail = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const message = `Hi ${listing.donor_name}, I'm interested in "${listing.food_name}" from FoodShare! \n\nMy Details:\n- Name: ${user?.full_name}\n- Phone: ${user?.phone_number}`;
    const whatsappUrl = `https://wa.me/${listing.donor_phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const fullImageUrl = listing.image_url ? `http://localhost:5000${listing.image_url}` : null;

  return (
    <div style={{ 
      background: 'var(--white)', 
      border: '3px solid var(--border)', 
      padding: '1.5rem',
      boxShadow: 'var(--shadow)',
      transition: 'all 0.3s',
      position: 'relative'
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translate(-4px, -4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translate(0, 0)';
      e.currentTarget.style.boxShadow = 'var(--shadow)';
    }}>
      {/* Category Tag */}
      <div style={{ 
        position: 'absolute', 
        top: '-15px', 
        right: '20px', 
        background: 'var(--accent)', 
        padding: '0.4rem 1rem', 
        border: '3px solid var(--border)',
        fontWeight: 800,
        fontSize: '0.7rem',
        zIndex: 10
      }}>
        {listing.event_type.toUpperCase()}
      </div>

      {/* Image Container */}
      <div style={{ 
        width: '100%', 
        height: '240px', 
        border: '3px solid var(--border)', 
        marginBottom: '1.5rem',
        overflow: 'hidden',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#999'
      }}>
        {fullImageUrl ? (
          <img 
            src={fullImageUrl} 
            alt={listing.food_name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <ImageOff size={48} style={{ marginBottom: '0.5rem' }} />
            <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>NO IMAGE PROVIDED</span>
          </>
        )}
      </div>
      
      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text)' }}>{listing.food_name}</h3>
        
        <p style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 500, minHeight: '3rem' }}>
          {listing.description}
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '1rem 0', 
          borderTop: '2px dashed #ccc',
          borderBottom: '2px dashed #ccc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <Box size={18} color="var(--primary)" />
            <span>{listing.quantity}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <MapPin size={18} color="var(--primary)" />
            <span>{listing.location}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, display: 'block', opacity: 0.6 }}>LISTED BY</span>
            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{listing.donor_name.toUpperCase()}</span>
          </div>
          
          <button className="primary" onClick={handleAvail} style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            AVAIL <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
