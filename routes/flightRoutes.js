const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const verifyToken = require('../middleware/verify_token');
const allow_to = require('../middleware/allow_to');
const userRole = require('../utility/userRole');


// Route for creating a new flight
router.post('/createFlight',verifyToken,allow_to(userRole.ADMIN), flightController.createFlight);

// Route for retrieving all flights
router.get('/getAllFlights',verifyToken,flightController.getAllFlights);
 
// Route for retrieving a specific flight by ID
router.get('/:id', flightController.getFlightById);

// Route for updating a flight
router.put('/:id',verifyToken,allow_to(userRole.ADMIN), flightController.updateFlight);

// Route for deleting a flight
router.delete('/:id',verifyToken,allow_to(userRole.ADMIN), flightController.deleteFlight);

module.exports = router;
