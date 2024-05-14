const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: {
    type: String
  },
  distination : {
    type: String
  },
  abbreviationFrom:String ,
  abbreviationDistination:String,
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
  numOfFlightHour :String 
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;