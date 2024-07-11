const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dbUtils = require("./db.js")

require("dotenv").config()
const app = express()

app.use(cors({origin: "*"}))
app.use(express.json())

app.listen(3001, () => console.log("Server listening on port 3001, http://localhost:3001"))
dbUtils.connectToMongo(process.env.MONGO_URI)

app.get("/", (req, res) => {
	res.send({message: "hello world!"})
})

app.post("/login", (req, res) => {
	console.log("login request received")
})

app.post("/signup", (req, res) => {
	console.log("signup request received")

	const {email, username, password} = req.body

	
})