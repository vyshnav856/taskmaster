const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {type: String},
	password: {type: String},
	accountType: {type: String}
})

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel