const express = require("express")

const TicketModel = require("../models/TicketModel.js")

const router = express.Router()

router.post("/create", async (req, res) => {
	console.log("Ticket creation request received")
	console.log(req.body)
	const newTicket = new TicketModel(req.body)
	await newTicket.save()

	return res.json({success: true, message: "Ticket creation successful!"})
})

router.get("/get-all", async (req, res) => {
	console.log("Ticket all get request received")

	const allTickets = await TicketModel.find()

	return res.json(allTickets)
})

module.exports = router