const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: {
    type: String
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  price: {
    type: Number
  },
  departureDate: {
    type: Date
  },
  arrivalDate: {
    type: Date
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  busSeats: {
    type: Number
  },
  ecoSeats: {
    type: Number
  },
  flightNumber: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;