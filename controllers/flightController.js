const Flight = require('../models/flight_model');

class FlightController {
  // Create a new flight
  async createFlight(req, res) {
    try {
      const flightData = req.body;
  
      // Check if the required fields are present in the request body
      if (!flightData.from || !flightData.to || !flightData.departureDate || !flightData.arrivalDate || !flightData.price || !flightData.busSeats || !flightData.ecoSeats || !flightData.flightNumber) {
        return res.status(400).json({ error: 'Missing required fields in request body' });
      }

     // Check if arrival date is before departure date
    if (flightData.arrivalDate < flightData.departureDate) {
      return res.status(400).json({ error: 'Arrival date cannot be before departure date' });
    }

      const flight = new Flight(flightData);
      const savedFlight = await flight.save();
      res.status(201).json(savedFlight);
    } catch (error) {
      
      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      // Handle other unexpected errors
      console.error('An error occurred while creating a flight:', error);
      res.status(500).json({ error: 'An error occurred while creating a flight' });
    }

  }

  // Retrieve all flights
  async getAllFlights(req, res) {
    try {
      const flights = await Flight.find();
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving flights.' });
    }
  }

  // Retrieve a specific flight by ID
  async getFlightById(req, res) {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        return res.status(404).json({ error: 'Flight not found.' });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the ID flight.' });
    }
  }

  // Update a flight
  async updateFlight(req, res) {
    try {
      const flightData = req.body;
      const flight = await Flight.findByIdAndUpdate(req.params.id, flightData, { new: true });
      if (!flight) {
        return res.status(404).json({ error: 'Flight not found.' });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the flight.' });
    }
  }

  // Delete a flight
  async deleteFlight(req, res) {
    try {
      const flight = await Flight.findByIdAndDelete(req.params.id);
      if (!flight) {
        return res.status(404).json({ error: 'Flight not found.' });
      }
      // If flight is successfully deleted, send a success message
    res.status(200).json({ message: 'Flight deleted successfully.' });

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the flight.' });
    }
  }
}

module.exports = new FlightController();
