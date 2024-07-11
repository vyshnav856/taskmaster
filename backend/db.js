const mongoose = require("mongoose")

async function connectToMongo(mongoURI) {
	try {
		await mongoose.connect(mongoURI)
		console.log("Connected to MongoDB")
	}

	catch(error) {
		console.log("Error connecting to MongoDB!")
		console.log(error)
	}
}

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	accountType: String
})

const userModel = mongoose.model("User", userSchema)

module.exports = {connectToMongo}