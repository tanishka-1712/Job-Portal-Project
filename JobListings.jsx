import React, { useState } from 'react';

const initialJobs = [
  { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'Remote', salary: '₹90,000', type: 'Full-time' },
  { id: 2, title: 'Frontend Developer', company: 'WebWorks', location: 'Bhubaneswar,Odisha', salary: '₹85,000', type: 'Full-time' },
  { id: 3, title: 'Backend Developer', company: 'DataFlow', location: 'Mumbai,Maharashtra', salary: '₹95,000', type: 'Full-time' },
  { id: 4, title: 'Full Stack Developer', company: 'DevStudio', location: 'Remote', salary: '₹1,00,000', type: 'Contract' },
  { id: 5, title: 'DevOps Engineer', company: 'CloudScale', location: 'Hyderabad,Telangana', salary: '₹1,05,000', type: 'Full-time' },
  { id: 6, title: 'Data Scientist', company: 'Insight AI', location: 'Kolkata,West Bengal', salary: '₹1,10,000', type: 'Full-time' },
  { id: 7, title: 'Machine Learning Engineer', company: 'NeuralNet', location: 'Remote', salary: '₹1,20,000', type: 'Full-time' },
  { id: 8, title: 'Cybersecurity Analyst', company: 'SecureShield', location: 'Jaipur,Rajasthan', salary: '₹90,000', type: 'Full-time' },
  { id: 9, title: 'Cloud Engineer', company: 'SkyOps', location: 'Lucknow,Uttar Pradesh', salary: '₹1,00,000', type: 'Full-time' },
  { id: 10, title: 'Database Administrator', company: 'BaseData', location: 'Ahmedabad,Gujrat', salary: '₹85,000', type: 'Part-time' },
];

const JobListings = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = async (job) => {
    // Check state first, then fallback to localStorage if refreshed
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserEmail = user?.email || savedUser?.email;

    if (!currentUserEmail) {
      alert('Please sign in or create an account before applying!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: currentUserEmail,
          jobTitle: job.title,
          company: job.company,
        }),
      });

      if (response.ok) {
        setAppliedJobs([...appliedJobs, job.id]);
        alert(`Successfully applied for ${job.title}! Recorded for ${currentUserEmail}`);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Could not connect to backend server. Make sure "node server.js" is running!');
    }
  };

  const filteredJobs = initialJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div style={styles.container}>
      <h2>Available Job Opportunities</h2>
      
      {/* Search & Filter Controls */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={styles.selectInput}>
          <option value="All">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Job Card Grid */}
      <div style={styles.list}>
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs.includes(job.id);
          return (
            <div key={job.id} style={styles.card}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <button 
                onClick={() => handleApply(job)} 
                disabled={isApplied}
                style={{
                  ...styles.applyBtn,
                  backgroundColor: isApplied ? '#6c757d' : '#28a745',
                  cursor: isApplied ? 'not-allowed' : 'pointer'
                }}
              >
                {isApplied ? 'Applied ✓' : 'Apply Now'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '20px auto', padding: '20px' },
  filterBar: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: { flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  selectInput: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  list: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' },
  card: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'left', backgroundColor: '#f9f9f9' },
  applyBtn: { marginTop: '10px', padding: '8px 15px', color: '#fff', border: 'none', borderRadius: '4px' }
};

export default JobListings;