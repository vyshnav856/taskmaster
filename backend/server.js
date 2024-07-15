const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const userRouter = require("./routes/users.js")
const ticketRouter = require("./routes/tickets.js")

app.use(cors({origin: "*"}))
app.use(express.json())

app.use("/auth", userRouter)
app.use("/ticket", ticketRouter)

app.listen(3001, () => console.log("Server listening @ http://localhost:3001"))

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Mongoose connected"))

app.get("/test", (req, res) => {
	res.send({success: true, message: "Hello, world!"})
})