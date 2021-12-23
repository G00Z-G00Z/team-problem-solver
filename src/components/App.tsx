import React from "react";
import { Base } from "./Base";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Base />}></Route>
			</Routes>
		</Router>
	);
}
