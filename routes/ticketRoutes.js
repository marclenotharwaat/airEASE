const express = require('express');
const ticketController = require('../controllers/ticketController');
const verifyToken = require('../middleware/verify_token');
const router = express.Router();

router.post('/', ticketController.createTicket)
router.get('/getAllTickets', ticketController.getAllTickets)
router.get("/getTicket/:id", ticketController.getTicket)
router.delete('/', ticketController.deleteTicket)
router.put("/:id", ticketController.updateTicket)


module.exports = router; 