import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { db } from "../data/dexieDatabase";

export const Home = () => {
	return (
		<>
			<h1 className="text-3xl font-serif">What's Your Problem ?</h1>
			<section>
				<button
					className="rounded-sm bg-CTA-300 text-gray-20 border-2"
					onClick={(e) => db.addMember()}
				>
					Agregar alguien al equipo
				</button>

				<div></div>
			</section>
		</>
	);
};
