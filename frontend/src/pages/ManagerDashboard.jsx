import React from "react"
import {Link} from "react-router-dom"

import DashboardHeader from "../components/DashboardHeader.jsx"

import "../styles/Dashboard.css"

export default function ManagerDashboard() {
	return (
		<div className="responsive-container manager-dashboard-container">
			<DashboardHeader/>

			<div className="tickets-panel">
				<div className="tickets-panel__title">
					<h3 className="tickets-panel__heading">Tickets</h3>
					<Link className="dashboard-create-ticket-button" to="/dashboard/create">Create Ticket</Link>
				</div>

			</div>
		</div>
	)
}