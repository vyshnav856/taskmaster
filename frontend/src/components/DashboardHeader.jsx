import React from "react"
import {Link, useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"

import "../styles/DashboardHeader.css"

export default function DashboardHeader(props) {
	const [cookie, setCookie] = useCookies(["access_token"]) // 1 28 25
	const navigate = useNavigate()

	function logout() {
		setCookie("access_token", "")
		window.localStorage.clear()
		navigate("/")
	}

	return (
		<div className="dashboard-header-container">
			<h2 className="dashboard-header__title highlight">TaskMaster</h2>

			<div className="dashboard-header__user-details-container">
				<p className="dashboard-header__username">{window.localStorage.getItem("username")}</p>
				<a className="dashboard-header__logout" href="#" onClick={logout}>Logout</a>
			</div>
		</div>
	)
}