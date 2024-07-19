import React from "react"
import Cookies from "universal-cookie"

import "../styles/TicketCard.css"

export default function TicketCard(props) {
	const cookies = new Cookies()
	const accountType = cookies.get("account_type")

	function renderTicketStatus() {
		if (props.claimed)
			return <p className="ticket-card__claimed"><span className="highlight-bold">Claimed by:</span> {props.claimedBy}</p>

		else if (props.finished)
			return <p className="ticket-card__claimed"><span className="highlight-bold">Finished by:</span> {props.finishedBy}</p>

		else
			return <p className="ticket-card__claimed"><span className="highlight-bold">Not claimed</span></p>
	}

	function renderTicketButtons() {
		return <button>test function</button>
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
				<p>will be done later</p>
			</div>
		</div>
	)
}