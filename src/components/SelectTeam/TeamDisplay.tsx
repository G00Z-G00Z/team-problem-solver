import React, { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../data/dexieDatabase";
import { Team } from "../../types/interfaces";

interface Props {
	team: Team;
}
export const TeamDisplay: FC<Props> = ({ team }) => {
	const { color, members, name, id } = team;

	const navigate = useNavigate();

	const teamContainer = useRef<HTMLDivElement | null>(null);

	if (!id) return <></>;

	if (teamContainer.current) {
		teamContainer.current.style.borderColor = color;
	}

	const handleEditing = () => {
		navigate(`/team/edit/${id}`);
	};

	const handleDeleting = () => {
		db.deleteTeam(id);
	};

	return (
		<>
			<div className="border-dashed border-2 " ref={teamContainer}>
				<button className="bg-gray-900 text-gray-100" onClick={handleEditing}>
					Editar
				</button>
				<button
					className="text-danger-100 bg-danger-400"
					onClick={handleDeleting}
				>
					Borrame
				</button>
			</div>
		</>
	);
};
