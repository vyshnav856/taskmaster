import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import LoadingButton from "../components/LoadingButton.jsx"

import "../styles/shared.css"
import "../styles/LoginSignup.css"

export default function Signup() {
	const [formData, setFormData] = React.useState({
		password:"",
		username: ""
	})

	const [accountType, setAccountType] = React.useState("dev");

	function handleChange(e) {
		const {name, value} = e.target;

		setFormData(prev => {
			return {...prev, [name]: value}
		})
	}

	function handleAccountTypeChange(e) {
		setAccountType(e.target.value);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		
		// if (formData.password.length < 8) {
		// 	alert("Password length should be greater than 8!")
		// 	return
		// }

		if (formData.username.indexOf(" ") != -1) {
			alert("Username should not contain spaces!")
			return
		}

		const signupData = {...formData, accountType}
		const response = await axios.post("http://localhost:3001/auth/signup", signupData)
		
		if (response.data.success) {
			alert("Signup successful! Your account has been created.")
		}

		else {
			alert(response.data.message)
		}
	}

	return (
		<div className="responsive-container login-container">
			<h1 className="login-title">Sign up for <span className="highlight">TaskMaster</span></h1>

			<form className="login-container__form" onSubmit={handleSubmit}>
				<input name="username" type="text" placeholder="username" value={formData.username} onChange={handleChange} />
				<input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange} />

				<div className="radio-buttons-container">
					<label className="radio-button-label">
						<input name="account-radio" value="dev" checked={accountType == "dev"} onChange={handleAccountTypeChange} type="radio" />
						Create developer account
					</label>

					<label className="radio-button-label">
					<input name="account-radio" value="man" checked={accountType == "man"} onChange={handleAccountTypeChange} type="radio" />
						Create manager account
					</label>
				</div>
				<button>submit (for dev only)</button>
				<LoadingButton classes="login-button" buttonType="submit" defaultText="Sign up" loadingText="Signing up, please wait..." />
			</form>

			<p>Already have an account? <Link to="/login">Log in</Link></p>

			<Link className="homelink" to="/">Return to Home</Link>
		</div>
	)
}