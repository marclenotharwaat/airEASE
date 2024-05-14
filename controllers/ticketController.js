const asyncWrapper = require('../middleware/asyncWrapper');
const flightModel = require('../models/flight_model');
const ticketModel = require('../models/ticket_model');
const httpStatus = require("../utility/https_status");
const userModel = require('../models/user_model');
const AppError = require('../utility/app_error');

const createTicket = asyncWrapper(async (req, res, next) => {
    const { kindOfTicket, ticktOwner, Flight } = req.body;
    console.log(ticktOwner);
    const currentUser = await userModel.findById(ticktOwner);
    if (!currentUser) {
        const error = AppError.create('user not found', 404, httpStatus.FAIL)
        return next(error);
    }
    const currentFlight = await flightModel.findById(Flight);
    if (!currentFlight) {
        const error = AppError.create('flight not found', 404, httpStatus.FAIL)
        return next(error);
    }

    if (!kindOfTicket || !ticktOwner || !Flight) {
        const error = AppError.create('Missing required fields in request body', 400, httpStatus.FAIL)
        return next(error);
    }



    let seatField = null;
    if (kindOfTicket === 'business') {
        seatField = { busSeats: -1 };
    } else if (kindOfTicket === 'economic') {
        seatField = { ecoSeats: -1 };
    }
    if (seatField) {
        const updatedFlight = await flightModel.findOneAndUpdate(
            { _id: Flight },
            { $inc: seatField },
            { new: true }
        );
    }




    let ticketNumber = null;
    if (kindOfTicket == "business") {
        ticketModel.ticketNumber = currentFlight.busSeats.toString();
        ticketNumber = ticketModel.ticketNumber

        if (currentFlight.busSeats == 0) {
            const error = AppError.create("the business ticket is complet", 400, httpStatus.FAIL)
            return next(error);
        }
    }

    if (kindOfTicket == "economic") {
        ticketModel.ticketNumber = currentFlight.ecoSeats.toString();
        ticketNumber = ticketModel.ticketNumber
        if (currentFlight.ecoSeats == 0) {
            const error = AppError.create("the economic ticket is complet", 400, httpStatus.FAIL)
            return next(error);
        }
    }
    ticketModel.departureDate = currentFlight.departureDate;
    const departureDate = ticketModel.departureDate
    ticketModel.abbreviationDistination = currentFlight.abbreviationDistination;
    const abbreviationDistination = ticketModel.abbreviationDistination;
    ticketModel.abbreviationFrom = currentFlight.abbreviationFrom;
    const abbreviationFrom = ticketModel.abbreviationFrom;
    ticketModel.price = currentFlight.price;
    const price = ticketModel.price;
    ticketModel.from = currentFlight.from;
    const from = ticketModel.from;
    ticketModel.distination = currentFlight.distination;
    const distination = ticketModel.distination;


    ticketModel.numOfFlightHour = currentFlight.numOfFlightHour
    const numOfFlightHour = ticketModel.numOfFlightHour;

    const ticket = await new ticketModel({ ticktOwner, Flight, ticketNumber, kindOfTicket, departureDate, abbreviationDistination, abbreviationFrom, price, from, distination,numOfFlightHour }).save();
    res.json({ status: httpStatus.SUCCESS, data: ticket })

})


const deleteTicket = asyncWrapper(async (req, res, next) => {
    const { kindOfTicket, ticktOwner, Flight } = req.body;
    const currentUser = await userModel.findById(ticktOwner);
    if (!currentUser) {
        const error = AppError.create('user not found', 404, httpStatus.FAIL)
        return next(error);
    }
    const currentFlight = await flightModel.findById(Flight);
    if (!currentFlight) {
        const error = AppError.create('flight not found', 404, httpStatus.FAIL)
        return next(error);
    }

    if (!kindOfTicket || !ticktOwner || !Flight) {
        const error = AppError.create('Missing required fields in request body', 400, httpStatus.FAIL)
        return next(error);
    }

    const ticket = await new ticketModel({ ticktOwner, Flight }).deleteOne();


    let seatField;
    if (kindOfTicket === 'business') {
        seatField = { busSeats: +1 };
    } else if (kindOfTicket === 'economic') {
        seatField = { ecoSeats: +1 };
    }
    if (seatField) {
        const updatedFlight = await flightModel.findOneAndUpdate(
            { _id: Flight },
            { $inc: seatField },
            { new: true }
        );
    }
    res.json({ status: httpStatus.SUCCESS, data: ticket })

})


const getTicket = asyncWrapper(async (req, res, next) => {
    const userId = req.params; // Assuming userId is provided in the request parameters
    try {       
        const tickets = await ticketModel.find({ ticktOwner: userId.id });
        if (tickets.length > 0) {
            res.json({ status: httpStatus.SUCCESS, data: tickets });
        } else {
            res.json({ status: httpStatus.NOT_FOUND, message: "No tickets found for the specified user." });
        }
    } catch (error) {
        next(error);}
});

const getAllTickets = asyncWrapper(
    async (req, res, next) => {
        const _id = req.params.id
        const tickets = await ticketModel.find();
        res.json({ status: httpStatus.SUCCESS, data: tickets })
    })

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByIdAndUpdate(id, req.body);
        if (!ticket) {
            return res.status(404).json({ message: "ticket not found" })
        }
        const updateTicket = await Ticket.findById(id).res.status(200).json(updateTicket)
    } catch (error) {
        res.status(500).json({ message: "error happend while updating tickets" })
    }
}

module.exports = {
    createTicket,
    getTicket,
    deleteTicket,
    getAllTickets,
    updateTicket
}