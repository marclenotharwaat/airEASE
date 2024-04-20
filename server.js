require('dotenv').config({ path: 'config.env' });
const express = require('express');
const connectDb = require('./config/db');
const port = process.env.PORT; 
const startWebSocketServer = require('./wsServer');
const flight =require('./models/flight_model');
connectDb();

const app = express();
// Middleware
app.use(express.json());
app.post('/flight',async(req,res) =>{
   const { from , to , departureDate , arrivalDate , price , busSeats , ecoSeats , flightNumber } =req.body;
   const journey = new flight({ from , to , departureDate , arrivalDate , price , busSeats , ecoSeats , flightNumber })
   await journey.save();
   res.send("Flight added");
})

// Start the server
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
});
startWebSocketServer();
