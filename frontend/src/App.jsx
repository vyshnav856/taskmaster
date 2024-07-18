import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Landing from "./pages/Landing.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import ManagerDashboard from "./pages/ManagerDashboard.jsx"
import DeveloperDashboard from "./pages/DeveloperDashboard.jsx"
import CreateTicket from "./pages/CreateTicket.jsx"
import Error404 from "./pages/Error404.jsx"

import "./styles/App.css"

export default function App() {
 	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/dashboard/manager" element={<ManagerDashboard />} />
				<Route path="/dashboard/developer" element={<DeveloperDashboard />} />
				<Route path="/dashboard/create" element={<CreateTicket />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
  	)
}