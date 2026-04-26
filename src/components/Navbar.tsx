import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ 
      padding: '2rem 0', 
      position: 'sticky', 
      top: 0, 
      backgroundColor: 'rgba(249, 242, 231, 0.9)', 
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '3px solid var(--border)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          <div style={{ lineHeight: 0.8 }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Playfair Display', color: 'var(--primary)' }}>FOOD</span>
            <br />
            <span style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Playfair Display' }}>SHARE</span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--text)', fontWeight: 700, fontSize: '0.9rem' }}>BROWSE</Link>
          
          <button className="accent" onClick={() => navigate(isAuthenticated ? '/donate' : '/login')} style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>
            <PlusCircle size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            DONATE NOW
          </button>
          
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '2px solid var(--border)', paddingLeft: '1.5rem' }}>
              <Link to="/my-donations" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} />
                <span>MY LISTINGS</span>
              </Link>
              <button onClick={logout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', background: 'transparent', boxShadow: 'none', border: 'none' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>LOGIN</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
