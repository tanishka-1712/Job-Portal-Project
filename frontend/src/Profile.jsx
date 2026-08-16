import React, { useState } from 'react';

const Profile = ({ user, setUser }) => {
  const [resumeName, setResumeName] = useState(user?.resumeName || '');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && user?.email) {
      const fileName = file.name;
      setResumeName(fileName);
      
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            phone: user.phone || '',
            experience: user.experience || 'Entry Level',
            resumeName: fileName,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setUploadStatus('Saved to MongoDB successfully!');
          // Sync current React user state
          setUser({ ...user, resumeName: fileName });
        } else {
          setUploadStatus(data.error || 'Failed to save to database.');
        }
      } catch (error) {
        console.error('Error saving resume to server:', error);
        setUploadStatus('Server error: Could not reach backend.');
      }
    }
  };

  if (!user) {
    return <h2>Please log in to view your profile.</h2>;
  }

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <div style={styles.card}>
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Experience Level:</strong> {user.experience || 'Entry Level'}</p>
      </div>

      <div style={styles.card}>
        <h3>Resume Upload</h3>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
        {resumeName && <p style={{ color: 'green', marginTop: '10px' }}>Uploaded: {resumeName}</p>}
        {uploadStatus && <p style={{ color: '#007bff', fontSize: '14px', marginTop: '5px' }}>{uploadStatus}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '20px auto', textAlign: 'left' },
  card: { padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }
};

export default Profile;