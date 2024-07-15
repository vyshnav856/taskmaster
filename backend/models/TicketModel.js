const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
	title: {type: String},
	desc: {type: String},
	issued: {type: Date},
	claimed: {type: Boolean},
	claimedBy: {type: String}
})

const TicketModel = mongoose.model("tickets", ticketSchema)

module.exports = TicketModel