import React from "react";
import { useParams } from "react-router-dom";

export const EditTeam = () => {
	const params = useParams<{
		teamId: string;
	}>();

	return <div>Voy a editar el equipo con el id de: {params.teamId}</div>;
};
