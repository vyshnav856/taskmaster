const express = require("express")
const TicketModel = require("../models/TicketModel.js")
const router = express.Router()
const verifyMan = require("./verifyMan.js")
const verifyDev = require("./verifyDev.js")
const verifyUser = require("./verifyUser.js")

router.post("/create", verifyMan, async (req, res) => {
	console.log("Ticket creation request received")
	const newTicket = new TicketModel(req.body)
	await newTicket.save()

	return res.json({success: true, message: "Ticket creation successful!"})
})

router.post("/delete", verifyMan, async (req, res) => {
	console.log("Ticket delete request received")
	
	try {
		const response = await TicketModel.deleteOne({_id: req.body.id})
		return res.json({success: true, message: response})
	}
	
	catch (error) {
		console.log(error)
	}
})

router.get("/get-all", verifyUser, async (req, res) => {
	console.log("Ticket get all request received")

	const allTickets = await TicketModel.find()

	return res.json(allTickets)
})

router.post("/modify", verifyUser, async (req, res) => {
	console.log("Ticket modify request received")

	if (req.body.action == "finish") {
		const user = await TicketModel.findOneAndUpdate({_id: req.body.id}, {claimed: false, claimedBy: null, finished: true, finishedBy: req.body.username}, { new: true, useFindAndModify: false })
	}

	else {
		const newData = {
			claimed: req.body.action,
			claimedBy: req.body.action ? req.body.username : null
		}
	
		const user = await TicketModel.findOneAndUpdate({_id: req.body.id}, newData, { new: true, useFindAndModify: false })
	}
	
	return res.json({success: true, message: "Ticket modified!"})
})

module.exports = router