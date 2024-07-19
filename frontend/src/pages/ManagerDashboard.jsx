import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import Cookies from "universal-cookie"

import DashboardHeader from "../components/DashboardHeader.jsx"
import TicketCard from "../components/TicketCard.jsx"

import "../styles/Dashboard.css"

export default function ManagerDashboard() {

	const [filter, setFilter] = React.useState(0)
	const [tickets, setTickets] = React.useState("Fetching...")

	async function fetchTickets() {
		try {
			const fetchedTickets = await axios.get("http://localhost:3001/ticket/get-all")
			setTickets(fetchedTickets.data)
		}

		catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => fetchTickets, [])

	function handleFilterChange(e) {
		switch(e.target.name)  {
			case "all":
				setFilter(0)
				break

			case "claimed":
				setFilter(1)
				break

			case "unclaimed":
				setFilter(2)
				break

			case "finished":
				setFilter(3)
				break
		}
	}

	function renderTicketsList() {
		const filteredTickets = []
		for (let i = 0; i < tickets.length; i++) {
			const currentTicket = tickets[i]

			if (filter == 1) {
				if (currentTicket.claimed)
					filteredTickets.push(<TicketCard key={i} {...currentTicket} />)
			}

			else if (filter == 2) {
				if (!currentTicket.claimed)
					filteredTickets.push(<TicketCard key={i} {...currentTicket} />)
			}

			else if (filter == 3) {
				if (currentTicket.finished)
					filteredTickets.push(<TicketCard key={i} {...currentTicket} />)
			}

			else {
				filteredTickets.push(<TicketCard key={i} {...currentTicket} />)
			}
		}

		return filteredTickets
	}

	return (
		<div className="responsive-container manager-dashboard-container">
			<DashboardHeader/>

			<div className="tickets-panel">
				<div className="tickets-panel__title">
					<h3 className="tickets-panel__heading">Tickets</h3>
					<Link className="dashboard-create-ticket-button" to="/dashboard/create">Create Ticket</Link>
				</div>

				<div className="tickets-list">
					<div className="tickets-list__navbar">
						<a className={filter == 0 ? "tickets-list__navbar-link selected" : "tickets-list__navbar-link"} onClick={handleFilterChange} name="all">All</a>
						<a className={filter == 1 ? "tickets-list__navbar-link selected" : "tickets-list__navbar-link"} onClick={handleFilterChange} name="claimed">Claimed</a>
						<a className={filter == 2 ? "tickets-list__navbar-link selected" : "tickets-list__navbar-link"} onClick={handleFilterChange} name="unclaimed">Unclaimed</a>
						<a className={filter == 3 ? "tickets-list__navbar-link selected" : "tickets-list__navbar-link"} onClick={handleFilterChange} name="finished">Finished</a>
					</div>

					<div className="tickets-list__list">
						{renderTicketsList()}
					</div>
				</div>
			</div>
		</div>
	)
}