import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../data/dexieDatabase";
import appColors from "../../types/AppColors";
import { Team } from "../../types/interfaces";

interface Props {
	team: Team;
}
export const TeamDisplay: FC<Props> = ({ team }) => {
	const { color, members, name, id } = team;

	const navigate = useNavigate();

	const teamContainer = useRef<HTMLDivElement | null>(null);
	const teamNameH1 = useRef<HTMLElement | null>(null);

	useEffect(() => {
		console.log(teamContainer.current);
		if (teamContainer.current) {
			teamContainer.current.style.borderColor = appColors[color][400];
		}
		if (teamNameH1.current) {
			teamNameH1.current.style.color = appColors[color][500];
			teamNameH1.current.style.backgroundColor = appColors[color][200];
		}
	}, []);

	if (!id) return <></>;

	const handleEditing = () => {
		navigate(`/team/edit/${id}`);
	};

	const handleDeleting = () => {
		db.deleteTeam(id);
	};

	return (
		<>
			<div className="border-dashed border-2" ref={teamContainer}>
				<header className="mb-2 flex flex-row px-4 py-2" ref={teamNameH1}>
					<h1
						className="w-full 
					text-2xl font-bold text-left font-serif
					 
					"
					>
						{name}
					</h1>
					<button className="bg-gray-800 text-gray-100" onClick={handleEditing}>
						Editar hoa
					</button>
				</header>
				<p className="text-ellipsis px-4">
					{members.map(({ name }) => name).join(", ")}
				</p>
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
