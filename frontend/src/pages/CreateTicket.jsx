import React from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

import DashboardHeader from "../components/DashboardHeader.jsx"
import LoadingButton from "../components/LoadingButton.jsx"

import "../styles/CreateTicket.css"

export default function CreateTicket() {
	const navigate = useNavigate()
	const [formData, setFormData] = React.useState({
		title: "",
		desc: "",
		createdBy: window.localStorage.getItem("username"),
		issued: new Date(),
		claimed: false,
		claimedBy: "",
		finished: false,
		finishedBy: ""
	})

	function handleChange(e) {
		const {name, value} = e.target
		setFormData(prev => {
			return {...prev, [name]: value}
		})
	}

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			const response = await axios.post("http://localhost:3001/ticket/create", formData)
			if (response.data.success) {
				alert(response.data.message)
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
		<div className="responsive-container create-ticket-container">
			<DashboardHeader />
			
			<div className="create-ticket__sub-container">
				<div className="create-ticket__header">
				<Link className="create-ticket__return-link" to="/dashboard/manager">Return to dashboard</Link>	
					<h3 className="create-ticket__section-title">Create new ticket</h3>
				</div>

				<form onSubmit={handleSubmit} className="create-ticket__form">
					<input onChange={handleChange} value={formData.title} name="title" required type="text" placeholder="title" />
					<input onChange={handleChange} value={formData.desc} name="desc" required type="text" placeholder="description" />

					<LoadingButton type="submit" defaultText="Create" classes="create-ticket-button" loadingText="Creating ticket..." />
				</form>
			</div>
		</div>
	)
}