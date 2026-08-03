const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/jobPortalDB')
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// --- Database Schemas ---

// User Schema (includes Profile & Resume Metadata)
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  experience: { type: String, default: 'Entry Level' },
  resumeName: { type: String, default: 'No resume uploaded' },
  uploadedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Job Application Schema
const applicationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Application = mongoose.model('Application', applicationSchema);

// --- API Endpoints ---

// 1. User Registration
app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Update User Profile & Upload Resume
app.put('/api/user/profile', async (req, res) => {
  try {
    const { email, phone, experience, resumeName } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { phone, experience, resumeName, uploadedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Profile updated in database!', user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Submit Job Application
app.post('/api/apply', async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- Developer View Endpoints ---

// Developer Route: Get All Registered Users & Resumes
app.get('/api/admin/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Developer Route: Get All Job Applications
app.get('/api/admin/applications', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});