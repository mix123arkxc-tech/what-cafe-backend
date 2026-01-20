const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - Allow CORS from Netlify and other origins
const allowedOrigins = [
  'https://celebrated-puppy-9f63aa.netlify.app',
  'http://localhost:3000',
  'http://localhost:5000',
  '*'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/seats', require('./routes/seats'));
app.use('/api/menu', require('./routes/menu'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to What Café API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'NOT SET'}`);
  console.log(`✅ Node Env: ${process.env.NODE_ENV}`);
});
