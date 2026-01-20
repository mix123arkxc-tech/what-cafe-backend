const express = require('express');
const Seat = require('../models/Seat');

const router = express.Router();

// @route   GET /api/seats
// @desc    Get all seats
// @access  Public
router.get('/', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json({ success: true, seats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/seats/init
// @desc    Initialize seats (run once)
// @access  Public
router.post('/init', async (req, res) => {
  try {
    // Clear existing seats
    await Seat.deleteMany({});

    // Create seats A1-A10, B1-B10, C1-C10
    const seats = [];
    const rows = ['A', 'B', 'C'];
    
    for (let row of rows) {
      for (let i = 1; i <= 10; i++) {
        const seatNumber = `${row}${i}`;
        const type = seatNumber.startsWith('B') ? 'vip' : 'available';
        seats.push({ seatNumber, type });
      }
    }

    await Seat.insertMany(seats);
    res.status(201).json({ success: true, message: 'Seats initialized' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
