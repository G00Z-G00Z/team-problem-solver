import React from "react";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import { Home } from "./Home";
import { SelectTeam } from "./SelectTeam";
import { EditTeam } from "./TeamBuilder/EditTeam";
import { Help } from "./Help";
import { Profile } from "./Profile";

export default function App() {
	return (
		<div className="">
			{/* Nav bar */}
			<nav className="w-full bg-CTA-300 fixed bottom-0 border-b-2 font-sans text-2xl">
				<ul className="flex justify-evenly">
					<Link to="/">Home</Link>
					<Link to="/profile">Profile</Link>
					<Link to="/help">Help</Link>
					<Link to="/team/select">Teams</Link>
				</ul>
			</nav>
			{/* Status */}
			<section className="fixed top-0 w-full">
				<div className="bg-CTA-100 flex justify-evenly">
					No hay un equipo todavia
				</div>
			</section>
			{/* Main content */}
			<div className="p-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/help" element={<Help />} />
					<Route path="/profile" element={<Profile />} />

					<Route path="/team" element={<Outlet />}>
						<Route path="select" element={<SelectTeam />} />
						<Route path="edit" element={<Outlet />}>
							<Route path=":teamId" element={<EditTeam />} />
						</Route>
					</Route>
				</Routes>
			</div>
		</div>
	);
}
