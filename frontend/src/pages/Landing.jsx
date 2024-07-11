import React from "react"
import {Link} from "react-router-dom"

import ArrowRight from "../components/ArrowRight.jsx"

import "../styles/shared.css"
import "../styles/Landing.css"

export default function Landing() {
	return (
		<div className="responsive-container landing-container">
			<div className="landing-left">
				<div className="landing-left__textbox">
					<h1 className="h2-s">Welcome to <span className="highlight">TaskMaster</span>!</h1>
					<p>TaskMaster is a ticket-based work allocation system designed for efficiency and ease of use.</p>

					<ul>
						<li><a target="_blank" href="#">Source Code</a></li>
					</ul>
				</div>
			</div>

			<div className="landing-right">
				<ul>
					<li><Link to="/login" className="h5-s landing-right__link">Login  <ArrowRight /></Link></li>
					<li><Link to="/signup" className="h5-s landing-right__link">Signup <ArrowRight /></Link></li>
				</ul>
			</div>
		</div>
	)
}