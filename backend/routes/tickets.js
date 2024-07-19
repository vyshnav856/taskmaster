const express = require("express")

const TicketModel = require("../models/TicketModel.js")

const router = express.Router()

router.post("/create", async (req, res) => {
	console.log("Ticket creation request received")
	const newTicket = new TicketModel(req.body)
	await newTicket.save()

	return res.json({success: true, message: "Ticket creation successful!"})
})

router.post("/delete", async (req, res) => {
	console.log("Ticket delete request received")
	
	try {
		const response = await TicketModel.deleteOne({_id: req.body.id})
		return res.json({success: true, message: response})
	}
	
	catch (error) {
		console.log(error)
	}

})

router.get("/get-all", async (req, res) => {
	console.log("Ticket get all request received")

	const allTickets = await TicketModel.find()

	return res.json(allTickets)
})

module.exports = router