import React, { useEffect } from "react";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import { Home } from "./HomePage";
import { SelectTeamPage } from "./SelectTeam/SelectTeamPage";
import { EditTeam } from "./TeamBuilder/EditTeam";
import { Help } from "./HelpPage";
import { Profile } from "./ProfilePage";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../data/dexieDatabase";

// ! Nav link may work
export default function App() {
	const teams = useLiveQuery(async () => {
		return await db.getTeams();
	});

	return (
		<div className="bg-gray-10 font-sans">
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
						<Route
							path="select"
							element={<SelectTeamPage teams={teams ?? []} />}
						/>
						<Route path="edit" element={<Outlet />}>
							<Route path=":teamId" element={<EditTeam />} />
						</Route>
					</Route>
				</Routes>
			</div>
		</div>
	);
}
