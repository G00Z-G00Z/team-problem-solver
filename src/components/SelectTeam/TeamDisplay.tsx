import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "../../types/interfaces";

interface Props {
	team: Team;
}
export const TeamDisplay: FC<Props> = ({ team }) => {
	const navigate = useNavigate();

	const handleEditing = (id: string | number) => {
		navigate(`/team/edit/${id}`);
	};

	return (
		<div className="flex gap-2">
			<div>{JSON.stringify(team)}</div>
			<button
				className="bg-gray-90 text-gray-10"
				onClick={() => {
					handleEditing(team.id ?? "new");
				}}
			>
				Editar
			</button>
		</div>
	);
};
