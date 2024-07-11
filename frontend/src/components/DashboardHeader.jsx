import React from "react"

import {Link} from "react-router-dom"

export default function DashboardHeader(props) {
	return (
		<div className="dashboard-header-container">
			<h2 className="dashboard-header__title">TaskMaster</h2>

			<div className="dashboard-header__user-details-container">
				<p className="dashboard-header__username">{props.username}</p>
				<a className="dashboard-header__logout" href={props.logoutLink}>Logout</a>
			</div>

			<Link to="/">go to home (dev only)</Link>
		</div>
	)
}