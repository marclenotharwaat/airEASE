const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String 
  },
  departureDate: {
    type: Date
  },
  arrivalDate: {
    type: Date
  },
  price: {
    type: Number
  },
  busSeats: {
    type: Number
  },
  ecoSeats: {
    type: Number
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;