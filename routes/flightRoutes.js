const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');


// Route for creating a new flight
router.post('/createFlight', flightController.createFlight);

// Route for retrieving all flights
router.get('/getAllFlights', flightController.getAllFlights);

// Route for retrieving a specific flight by ID
router.get('/:id', flightController.getFlightById);

// Route for updating a flight
router.put('/:id', flightController.updateFlight);

// Route for deleting a flight
router.delete('/:id', flightController.deleteFlight);

module.exports = router;
