import React, { FC, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../data/dexieDatabase";
import { Team } from "../../types/interfaces";
import { TeamDisplay } from "./TeamDisplay";

interface Props {
	teams: Team[];
}

export const SelectTeamPage: FC<Props> = React.memo(({ teams }) => {
	const [query, setQuery] = useState("");

	const navigate = useNavigate();

	const handleNavigation = (id?: string) => {
		navigate(`/team/edit/${id ?? "new"}`);
	};

	return (
		<div>
			<h1 className="w-full text-5xl font-serif text-center">Select a Team</h1>
			<input
				type="text"
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<section>
				<button
					className="text-gray-80 border-dashed border-2 border-gray-80 p-8 bg-gray-20 w-full text-2xl font-bold hover:bg-gray-30 focus:bg-red-50"
					onClick={(e) => handleNavigation()}
				>
					Add new team
				</button>
			</section>
			<section>
				{teams.map((t, idx) => (
					<TeamDisplay team={t} key={idx} />
				))}
			</section>
		</div>
	);
});
