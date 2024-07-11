import React from "react"
import {Link} from "react-router-dom"

import "../styles/Error404.css"

export default function Error404() {
	return (
		<div className="responsive-container error404-container">
			<h1 className="h2-s">The page you are looking for does not exist.</h1>

			<Link to="/">Return to the homepage</Link>
		</div>
	)
}