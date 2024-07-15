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
		const responseData = {
			success: false,
			message: "Username already exists!"
		}

		return res.json(responseData)
	}
	
	const hashedPassword = await bcrypt.hash(password, 10)
	const newUser = new UserModel({username, password: hashedPassword, accountType})
	await newUser.save()

	const responseData = {
		success: true,
		message: "New account creation successful!"
	}

	return res.json(responseData)
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

	const token = jwt.sign({username}, process.env.JWT_SECRET_KEY)

	res.json({success: true, message: "Login successful!", token})
})

module.exports = router