const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  abbreviationFrom: String,
  abbreviationTo: String,
  departureDate: {
    type: Date,
  },
  arrivalDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
  busSeats: {
    type: Number,
  },
  ecoSeats: {
    type: Number,
  },
  numOfFlightHour: String,
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
