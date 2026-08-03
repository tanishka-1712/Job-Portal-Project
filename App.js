import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './Register';
import JobListings from './JobListings';
import Profile from './Profile';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <nav style={styles.nav}>
          <h2 style={{ margin: 0, color: '#fff' }}>Job-Portal</h2>
          <div style={styles.navLinks}>
            <Link to="/jobs" style={styles.link}>Job Listings</Link>
            
            {user ? (
              <>
                <Link to="/profile" style={styles.link}>Profile ({user.fullName.split(' ')[0]})</Link>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <Link to="/register" style={styles.link}>Sign In / Sign Up</Link>
            )}
          </div>
        </nav>

        {/* Routes */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<JobListings />} />
            <Route path="/jobs" element={<JobListings user={user} />} />
            <Route 
              path="/register" 
              element={<Register user={user} setUser={setUser} />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/register" replace />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '15px 30px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default App;