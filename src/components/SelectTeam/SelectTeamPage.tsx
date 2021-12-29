import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../data/dexieDatabase";
import { createTeamSeeds } from "../../seeds/teamSeeds";
import { Team } from "../../types/interfaces";
import { TeamDisplay } from "./TeamDisplay";
import { ReactComponent as SearchLogo } from "../../assets/search.svg";

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
			<h1 className="w-full text-5xl font-serif text-center font-bold ">
				Select a Team
			</h1>
			{/* Search bar */}
			<div className="relative p-0">
				<input
					type="text"
					placeholder="Search..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="text-CTA-400 
					border-2 border-CTA-500 
					bg-CTA-100 w-full rounded-lg my-2 px-8 py-1 text-lg"
				/>
				<div className="absolute top-4 left-2">
					<SearchLogo />
				</div>
			</div>

			<section>
				{/* Add new team btn */}
				<button
					className="text-gray-800 border-dashed border-2 border-gray-800 p-8 bg-gray-200 w-full text-2xl font-bold hover:bg-gray-300 focus:bg-red-50"
					onClick={(e) => handleNavigation()}
				>
					Add new team
				</button>
			</section>
			{/* Teams */}
			<section>
				{teams.map((t, idx) => (
					<TeamDisplay team={t} key={idx} />
				))}
			</section>
		</div>
	);
});
