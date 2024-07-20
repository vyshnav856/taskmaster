import React from "react"
import {useNavigate} from "react-router-dom"
import Cookies from "universal-cookie"

import "../styles/DashboardHeader.css"

export default function DashboardHeader() {
	const cookies = new Cookies()
	const navigate = useNavigate()

	function logout() {
		cookies.remove("access_token")
		cookies.remove("account_type")
		cookies.remove("username")
		window.localStorage.clear()
		navigate("/")
	}

	return (
		<div className="dashboard-header-container">
			<h2 className="dashboard-header__title highlight">TaskMaster</h2>

			<div className="dashboard-header__user-details-container">
				<p className="dashboard-header__username">{cookies.get("username")}</p>
				<a className="dashboard-header__logout" href="#" onClick={logout}>Logout</a>
			</div>
		</div>
	)
}