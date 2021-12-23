import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
	return (
		<nav className="w-full bg-CTA-300 fixed bottom-0 border-b-2 font-sans text-2xl">
			<ul className="flex justify-evenly">
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/help">Help</Link>
				<Link to="/team/select">Teams</Link>
			</ul>
		</nav>
	);
};
