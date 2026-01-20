const express = require('express');
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get all bookings for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('userId', 'fullname email');
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { seatNumber, startTime, endTime, bookingDate } = req.body;

    // Validate
    if (!seatNumber || !startTime || !endTime || !bookingDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if seat is available
    const seat = await Seat.findOne({ seatNumber });
    if (seat && seat.isOccupied) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      seatNumber,
      startTime,
      endTime,
      bookingDate
    });

    // Update seat status
    if (seat) {
      seat.isOccupied = true;
      seat.currentBookingId = booking._id;
      await seat.save();
    }

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update seat status
    const seat = await Seat.findOne({ seatNumber: booking.seatNumber });
    if (seat) {
      seat.isOccupied = false;
      seat.currentBookingId = null;
      await seat.save();
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
