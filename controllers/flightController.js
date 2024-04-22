const asyncWrapper = require('../middleware/asyncWrapper');
const Flight = require('../models/flight_model');
const AppError = require("../utility/app_error");
const httpStatus = require("../utility/https_status");


// Create a new flight
const createFlight = async (req, res, next) => {
  try {
    const flightData = req.body;

    // Check if the required fields are present in the request body
    if (!flightData.from || !flightData.to || !flightData.departureDate || !flightData.arrivalDate || !flightData.price || !flightData.busSeats || !flightData.ecoSeats || !flightData.flightNumber) {
      const error = AppError.create('Missing required fields in request body', 400, httpStatus.FAIL)
      return next(error);
    }

    // Check if arrival date is before departure date
    if (flightData.arrivalDate < flightData.departureDate) {
      const error = AppError.create("Arrival date cannot be before departure date", 400, httpStatus.FAIL)
      return next(error);
    }

    const flight = new Flight(flightData);
    const savedFlight = await flight.save();
    res.status(201).json({ status: httpStatus.SUCCESS, data: { savedFlight } });
  } catch (error) {

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const error = AppError.create(error.message, 400, httpStatus.FAIL)
      return next(error);
    }
  }
}

// Retrieve all flights
const getAllFlights = async (req, res) => {
  const flights = await Flight.find();
  res.json({ status: httpStatus.SUCCESS, data: flights });

}

// Retrieve a specific flight by ID
const getFlightById = asyncWrapper(
  async (req, res) => {

    const flight = await Flight.findById(req.params.id);
    if (!flight) {

      const error = AppError.create("flight not found", 404, httpStatus.FAIL)
      return next(error)

    }
    res.json({ status: httpStatus.SUCCESS, data: flight });

  })

// Update a flight
const updateFlight = async (req, res) => {
  try {
    const flightData = req.body;
    const flight = await Flight.findByIdAndUpdate(req.params.id, flightData, { new: true });
    if (!flight) {
      const error = AppError.create("Flight not found", 404, httpStatus.FAIL)
      return next(error);
    }
    res.json({ status: httpStatus.SUCCESS, data: flight });
  } catch (error) {
    const err = AppError.create('An error occurred while updating the flight.', 500, httpStatus.Error)
    return next(err);
  }
}

// Delete a flight
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      const error = AppError.create("Flight not found", 404, httpStatus.FAIL)
      return next(error);

    }
    // If flight is successfully deleted, send a success message
    res.status(200).json({ status: httpStatus.SUCCESS, message: 'Flight deleted successfully.' });

    res.sendStatus(204);
  } catch (error) {
    const err = AppError.create('An error occurred while deleting the flight.', 500, httpStatus.Error)
    return next(err);

  }
}


module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight
}
