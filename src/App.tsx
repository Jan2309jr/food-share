import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Donate from './pages/Donate';
import MyDonations from './pages/MyDonations';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/my-donations" element={<MyDonations />} />
            </Routes>
          </main>
          <footer style={{ 
            padding: '2rem 0', 
            textAlign: 'center', 
            borderTop: '2px solid var(--border)',
            marginTop: '4rem',
            background: 'var(--secondary)'
          }}>
            <p style={{ fontWeight: 800 }}>© 2026 FOODSHARE - BAKING A BETTER WORLD</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
