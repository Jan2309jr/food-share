import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    phone_number: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: formData.username,
          password: formData.password
        });
        login(response.data.token, response.data.user);
        navigate('/');
      } else {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        setIsLogin(true);
        setError('Account created! Sign in below.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex' }}>
      {/* Left Decoration - Desktop Only */}
      <div style={{ flex: 1, backgroundColor: 'var(--primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', color: 'var(--white)' }}>
        <h1 style={{ fontSize: '5rem', marginBottom: '2rem' }}>JOIN THE <br/> MOVEMENT.</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.8, maxWidth: '400px' }}>
          By sharing your surplus, you're not just giving food—you're building a stronger community.
        </p>
      </div>

      {/* Right Form */}
      <div style={{ flex: 1, backgroundColor: 'var(--secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text)' }}>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</h2>
            <div style={{ width: '60px', height: '6px', background: 'var(--primary)', marginTop: '0.5rem' }}></div>
          </div>

          {error && <div style={{ padding: '1rem', background: '#fee2e2', border: '2px solid #ef4444', marginBottom: '2rem', fontWeight: 700 }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>FULL NAME</label>
                <input type="text" placeholder="Jane Doe" onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
                
                <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>PHONE NUMBER</label>
                <input type="text" placeholder="+1 (555) 000-0000" onChange={(e) => setFormData({...formData, phone_number: e.target.value})} required />
              </>
            )}
            
            <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>USERNAME</label>
            <input type="text" placeholder="janedoe" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            
            <label style={{ fontWeight: 700, fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>PASSWORD</label>
            <input type="password" placeholder="••••••••" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            
            <button className="primary" style={{ width: '100%', fontSize: '1.1rem', marginTop: '1rem' }}>
              {isLogin ? 'ENTER FOODSHARE' : 'REGISTER NOW'}
            </button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center', fontWeight: 500 }}>
            {isLogin ? "NEW HERE?" : "ALREADY REGISTERED?"} {' '}
            <span 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline' }}
            >
              {isLogin ? 'CREATE AN ACCOUNT' : 'LOG IN INSTEAD'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
