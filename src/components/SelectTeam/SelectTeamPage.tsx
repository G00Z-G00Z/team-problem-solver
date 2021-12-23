import React, { FC, useState } from "react";
import { db } from "../../data/dexieDatabase";
import { Team } from "../../types/interfaces";
import { TeamDisplay } from "./TeamDisplay";

interface Props {
	teams: Team[];
}

export const SelectTeamPage: FC<Props> = ({ teams }) => {
	const [query, setQuery] = useState("");

	return (
		<div>
			<h1>Select a Team</h1>
			<input
				type="text"
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<section>
				{teams.map((t, idx) => (
					<TeamDisplay team={t} key={idx} />
				))}
			</section>
			<section>
				<button onClick={() => db.addTeam()}>Add new team</button>
			</section>
		</div>
	);
};
