import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Base = () => {
	return (
		<main className="">
			{/* Nav bar */}
			<nav className="w-full bg-CTA-300 fixed bottom-0 border-b-2 font-sans text-2xl">
				<ul className="flex justify-evenly">
					<Link to="/">Home</Link>
					<Link to="/profile">Profile</Link>
					<Link to="/help">Help</Link>
					<Link to="/team">Teams</Link>
				</ul>
			</nav>
			{/* Status */}
			<section className="fixed top-0 w-full">
				<div className="bg-CTA-100 flex justify-evenly">
					No hay un equipo todavia
				</div>
			</section>
			{/* Main content */}
			<div>
				<Outlet />
			</div>
		</main>
	);
};
