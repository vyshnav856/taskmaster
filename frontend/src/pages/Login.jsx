import React from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {useCookies} from "react-cookie"

import LoadingButton from "../components/LoadingButton.jsx"

import "../styles/shared.css"
import "../styles/LoginSignup.css"

export default function Login() {
	const [formData, setFormData] = React.useState({
		username: "",
		password:""
	})

	const [_, setCookies] = useCookies(["access_token"])
	const navigate = useNavigate()

	function handleChange(e) {
		const {name, value} = e.target;

		setFormData(prev => {
			return {...prev, [name]: value}
		})
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:3001/auth/login", formData)

			if (response.data.success) {
				setCookies(response.data.token)
				window.localStorage.setItem("username", formData.username)

				if (response.accountType == 'dev')
						navigate("/dashboard/developer")

				else
					navigate("/dashboard/manager")
			}

			else {
				alert(response.data.message)
				return
			}
			
		}

		catch (error) {
			console.log(error)
		}
		
	}

	return (
		<div className="responsive-container login-container">
			<h1 className="login-title">Login to <span className="highlight">TaskMaster</span></h1>

			<form className="login-container__form" onSubmit={handleSubmit}>
				<input name="username" type="text" placeholder="username" value={formData.username} onChange={handleChange} />
				<input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange} />

				<LoadingButton buttonType="submit" classes="login-button" defaultText="Login" loadingText="Logging in, please wait..." />
			</form>

			<p>Don't have an account? <Link to="/signup">Sign up</Link></p>

			<Link className="homelink" to="/">Return to Home</Link>
		</div>
	)
}