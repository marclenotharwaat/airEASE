const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId
const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true
    },
    from: {
      type: String
    },
    distination: {
      type: String
    },
    price: {
      type: Number
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    departureDate: {
      type: Date
    },
    abbreviationDistination: String,
    abbreviationFrom: String,
    kindOfTicket: {
      type: String,
    },

    ticktOwner: {
      type: objectId,
      ref: 'User'
    },

    Flight: {
      type: objectId,
      ref: 'Flight'
    },
    numOfFlightHour: String

  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;