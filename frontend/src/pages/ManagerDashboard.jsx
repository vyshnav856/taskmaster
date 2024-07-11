import React from "react"

import DashboardHeader from "../components/DashboardHeader.jsx"

import "../styles/Dashboard.css"

export default function ManagerDashboard() {
	return (
		<div className="responsive-container manager-dashboard-container">
			<DashboardHeader username="John Smith" logoutLink="" />
		</div>
	)
}