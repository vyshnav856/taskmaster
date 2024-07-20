const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const UserModel = require("../models/UserModel.js")

const router = express.Router()

router.post("/signup", async (req, res) => {
	console.log("signup request received")
	const {username, password, accountType} = req.body
	const userExists = await UserModel.findOne({username})

	if (userExists) {
		return res.json({success: false, message: "Username already exists!"})
	}
	
	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = new UserModel({username, password: hashedPassword, accountType})
	await newUser.save()

	return res.json({success: true, message: "New account creation successful!"})
})

router.post("/login", async (req, res) => {
	console.log("login request received")
	const {username, password} = req.body;

	const userExists = await UserModel.findOne({username})
	if (!userExists) {
		return res.json({success: false, message: "Username does not exist!"})
	}

	const passwordCheck = bcrypt.compare(userExists.password, password)
	if (!passwordCheck) {
		return res.json({success: false, message: "Wrong password!"})
	}

	const token = jwt.sign({username, accountType: userExists.accountType}, process.env.JWT_SECRET_KEY)

	res.json({success: true, message: "Login successful!", token, accountType: userExists.accountType})
})

module.exports = router