import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    experience: 'Entry Level',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user to state & localStorage so JobListings and Profile can access it
        setUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        alert(isLogin ? 'Logged in successfully!' : 'Registration successful!');
        navigate('/profile');
      } else {
        alert(data.error || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Could not connect to the backend server. Make sure "node server.js" is running!');
    }
  };

  return (
    <div style={styles.card}>
      <h2>{isLogin ? 'Sign In to Your Account' : 'Create an Account'}</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <div style={styles.group}>
            <label>Full Name:</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              style={styles.input}
            />
          </div>
        )}

        <div style={styles.group}>
          <label>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={styles.input}
          />
        </div>

        {!isLogin && (
          <>
            <div style={styles.group}>
              <label>Phone Number:</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.group}>
              <label>Experience Level:</label>
              <select 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                style={styles.input}
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" style={styles.btn}>
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span 
          onClick={() => setIsLogin(!isLogin)} 
          style={styles.toggle}
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
    </div>
  );
};

const styles = {
  card: { maxWidth: '400px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'left', backgroundColor: '#fdfdfd' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  group: { display: 'flex', flexDirection: 'column', gap: '5px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  btn: { padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  toggle: { color: '#007bff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }
};

export default Register;