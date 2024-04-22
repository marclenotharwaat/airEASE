require('dotenv').config({ path: 'config.env' });
const express = require('express');
const connectDb = require('./config/db');
const port = process.env.PORT;
const startWebSocketServer = require('./wsServer');
const flight = require('./models/flight_model');
const flightRoutes = require("./routes/flightRoutes")
const userRoutes = require("./routes/userRoutes")
const httpStatus = require("./utility/https_status");
connectDb();

const app = express();
// Middleware
app.use(express.json());
app.post('/flight', async (req, res) => {
    const { from, to, departureDate, arrivalDate, price, busSeats, ecoSeats, flightNumber } = req.body;
    const journey = new flight({ from, to, departureDate, arrivalDate, price, busSeats, ecoSeats, flightNumber })
    await journey.save();
    res.send("Flight added");
})
//routes flight
app.use('/flight', flightRoutes);
//routes User
app.use('/users', userRoutes);
//middleware for  not found routes
app.use("*", (req, res, next) => {
    return res.status(404).json({ statue: httpStatus.Error, message: "this resourse is not valid" })
})
//error handler for all 
app.use((err, req, res, next) => {
    res.status(500).json({ status: err.statusText || httpStatus.Error, message: err.message, code: err.statusCode || 500, data: null })
})
// Start the server
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
});
startWebSocketServer();
