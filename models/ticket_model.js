const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId
const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

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
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;