import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import { ArrowDownRight } from 'lucide-react';
import heroImage from '../assets/foodshare.webp';

const Home: React.FC = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/listings');
        if (Array.isArray(response.data)) {
          setListings(response.data);
        } else {
          console.error('API did not return an array', response.data);
          setListings([]);
        }
      } catch (error) {
        console.error('Error fetching listings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      {/* Editorial Hero Section */}
      <section style={{ 
        padding: '6rem 0', 
        borderBottom: '3px solid var(--border)',
        backgroundColor: 'var(--white)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="animate-up">
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', marginBottom: '2rem', color: 'var(--text)' }}>
              NO ONE <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>HUNGRY</span> <br /> 
              IN OUR CITY.
            </h1>
            <p style={{ fontSize: '1.4rem', maxWidth: '500px', marginBottom: '3rem', fontWeight: 500, lineHeight: 1.4 }}>
              Bridging the gap between event surplus and those in need. Simple, direct, and community-driven.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button className="primary" style={{ fontSize: '1.1rem' }}>EXPLORE LISTINGS</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <ArrowDownRight /> SCROLL DOWN
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative' }} className="animate-up">
            <div style={{ 
              width: '100%', 
              height: '500px', 
              border: '3px solid var(--border)', 
              boxShadow: '20px 20px 0 var(--accent)',
              overflow: 'hidden'
            }}>
              <img 
                src={heroImage} 
                alt="Community Food"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              left: '-20px', 
              background: 'var(--primary)', 
              color: 'var(--white)', 
              padding: '1.5rem',
              border: '3px solid var(--border)',
              fontWeight: 900,
              fontSize: '1.5rem'
            }}>
              EST. 2026
            </div>
          </div>
        </div>
      </section>

      {/* Main Listings Section */}
      <div className="container" style={{ padding: '6rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <span className="badge" style={{ marginBottom: '1rem' }}>LATEST ARRIVALS</span>
            <h2 style={{ fontSize: '3.5rem' }}>FRESH LISTINGS</h2>
          </div>
          <p style={{ maxWidth: '300px', fontSize: '0.9rem', textAlign: 'right', fontWeight: 500 }}>
            Every listing represents a meal saved. Browse the surplus from local events.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <h2 className="animate-pulse">Loading delicious surplus...</h2>
          </div>
        ) : listings.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '8rem', 
            border: '3px dashed var(--border)', 
            backgroundColor: 'var(--white)',
            boxShadow: '10px 10px 0 rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ALL FOOD HAS BEEN CLAIMED!</h3>
            <p>Check back soon or list your own excess food.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '3rem'
          }}>
            {listings.map((listing: any, index: number) => (
              <div key={listing.id} className="animate-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
