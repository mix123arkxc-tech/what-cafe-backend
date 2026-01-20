const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['available', 'vip', 'reserved'],
    default: 'available'
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  currentBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Seat', seatSchema);
