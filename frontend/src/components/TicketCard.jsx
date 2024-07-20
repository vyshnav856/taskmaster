import React from "react"
import Cookies from "universal-cookie"
import axios from "axios"

import "../styles/TicketCard.css"

export default function TicketCard(props) {
	const cookies = new Cookies()
	const accountType = cookies.get("account_type")
	const username = cookies.get("username")

	function renderTicketStatus() {
		if (props.finished)
			return <p className="ticket-card__claimed"><span className="highlight-bold">Finished by:</span> {props.finishedBy}</p>

		else if (props.claimed)
			return <p className="ticket-card__claimed"><span className="highlight-bold">Claimed by:</span> {props.claimedBy}</p>

		else
			return <p className="ticket-card__claimed"><span className="highlight-bold">Not claimed</span></p>
	}

	async function handleTicketDelete() {
		const id = props._id
		const headers = {
			'Authorization': `Bearer ${cookies.get("access_token")}`
		}

		try {
			const response = await axios.post("http://localhost:3001/ticket/delete", {id}, {headers})

			if (response.data.success) {
				props.setRefresh(prev => !prev)
			}
		}

		catch (error) {
			console.log(error)
		}
	}

	async function handleClaimTicket() {
		const id = props._id
		const headers = {
			'Authorization': `Bearer ${cookies.get("access_token")}`
		}

		try {
			const response = await axios.post("http://localhost:3001/ticket/modify", {id, username, action: true}, {headers})
			if (response.data.success) {
				props.setRefresh(prev => !prev)
			}
		}

		catch (error) {
			console.log(error)
		}
	}

	async function handleUnclaimTicket() {
		const id = props._id
		const headers = {
			'Authorization': `Bearer ${cookies.get("access_token")}`
		}

		try {
			const response = await axios.post("http://localhost:3001/ticket/modify", {id, username, action: false}, {headers})
			if (response.data.success) {
				props.setRefresh(prev => !prev)
			}
		}

		catch (error) {
			console.log(error)
		}
	}

	async function handleFinishTicket() {
		const id = props._id
		const headers = {
			'Authorization': `Bearer ${cookies.get("access_token")}`
		}

		try {
			const response = await axios.post("http://localhost:3001/ticket/modify", {id, username, action: "finish"}, {headers})
			if (response.data.success) {
				props.setRefresh(prev => !prev)
			}
		}

		catch (error) {
			console.log(error)
		}
	}

	function renderTicketButtons() {
		if (accountType == "man") {
			return <button className="delete-ticket-button" onClick={handleTicketDelete}>Delete ticket</button>
		}

		else {
			if (props.finished) {
				return;
			}

			else if (props.claimed) {
				if (props.claimedBy != username)
					return;

				return (
					<div className="claimed-ticket-button-container">
						<button onClick={handleUnclaimTicket} className="delete-ticket-button">Unclaim ticket</button>
						<button onClick={handleFinishTicket} className="finish-ticket-button">Finish ticket</button>
					</div>
				)
			}

			else {
				return <button onClick={handleClaimTicket}>Claim ticket</button>
			}
		}
	}

	return (
		<div className="ticket-card-container">
			<div className="ticket-card__left">
				<h4 className="ticket-card__title">{props.title}</h4>
				<p className="ticket-card__desc">{props.desc}</p>
				<p className="ticket-card__issued"><span className="highlight-bold">Created:</span> {props.issued}</p>
				{renderTicketStatus()}
			</div>

			<div className="ticket-card__right">
				{renderTicketButtons()}
			</div>
		</div>
	)
}