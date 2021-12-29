import React, { useEffect } from "react";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import { Home } from "./HomePage";
import { SelectTeamPage } from "./SelectTeam/SelectTeamPage";
import { EditTeam } from "./TeamBuilder/EditTeam";
import { Help } from "./HelpPage";
import { Profile } from "./ProfilePage";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../data/dexieDatabase";
import { NavBar } from "./NavBar";
import { createTeamSeeds } from "../seeds/teamSeeds";

export default function App() {
	const teams = useLiveQuery(async () => {
		return await db.getAllTeams();
	});

	useEffect(() => {
		createTeamSeeds(db, {
			teams: 10,
			maxPersonsPerTeam: 5,
		});
		return () => {
			db.deleteAllTeams();
		};
	}, []);

	return (
		<div className="bg-gray-100 font-sans h-full">
			{/* Nav bar */}
			<NavBar />
			{/* Status */}
			<section className="fixed top-0 w-full z-10">
				<div className="bg-CTA-100 flex justify-evenly">
					No hay un equipo todavia
				</div>
			</section>
			{/* Main content */}
			<div className="py-10 px-[10vw] md:px-[15vw]">
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
