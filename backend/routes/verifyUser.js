const jwt = require("jsonwebtoken")
require("dotenv").config()

const key = process.env.JWT_SECRET_KEY

function verifyUser(req, res, next) {
	const auth = req.headers.authorization

	if (auth) {
		const token = auth.split(" ")[1]
		jwt.verify(token, key, (error, decoded) => {
			if (error) {
				res.status(403).json({success: false, message: "Unauthorized"})
			}

			else {
				next()
			}
		})
	}	

	else {
		res.status(403).json({success: false, message: "Unauthorized"})
	}
}

module.exports = verifyUser