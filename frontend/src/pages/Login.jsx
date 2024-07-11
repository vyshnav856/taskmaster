import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import LoadingButton from "../components/LoadingButton.jsx"

import "../styles/shared.css"
import "../styles/LoginSignup.css"

export default function Login() {
	const [formData, setFormData] = React.useState({
		email: "",
		password:""
	})

	function handleChange(e) {
		const {name, value} = e.target;

		setFormData(prev => {
			return {...prev, [name]: value}
		})
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await axios.post("http://localhost:3001/login", formData)
		}

		catch(error) {
			console.error(error)
		}
		
	}

	return (
		<div className="responsive-container login-container">
			<h1 className="h3-s">Login to <span className="highlight">TaskMaster</span></h1>

			<form className="login-container__form" onSubmit={handleSubmit}>
				<input name="email" type="text" placeholder="email" value={formData.email} onChange={handleChange} />
				<input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange} />

				<LoadingButton buttonType="submit" classes="login-button" defaultText="Login" loadingText="Logging in, please wait..." />
			</form>

			<p>Don't have an account? <Link to="/signup">Sign up</Link></p>

			<Link className="homelink" to="/">Return to Home</Link>
		</div>
	)
}