import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { InputWithLabel } from "../utils/InputWithLabel";
import { Member, Team } from "../../types/interfaces";
import { MemberBuilder } from "./MemberBuilder";
import { db } from "../../data/dexieDatabase";
import { editTeamateReducer } from "./teamBuilderReducer";

export const EditTeam = () => {
	const navigate = useNavigate();

	const { teamId = "new" } = useParams<{
		teamId: string;
	}>();

	const isNewTeam = teamId === "new";

	const oldTeam = useRef<Team | null>(null);

	const [members, dispatch] = useReducer(editTeamateReducer, {});
	const { color, name, onChange } = useForm({
		color: oldTeam.current?.color ?? "",
		name: oldTeam.current?.name ?? "",
	});

	// Use effect que graba y carga el equipo al principio
	useEffect(() => {
		if (!isNewTeam) {
			db.getTeam(teamId)
				.then((team) => {
					if (team) {
						onChange(team.color, "color");
						onChange(team.name, "name");
						oldTeam.current = team;
					}

					return !!team;
				})
				.then(async (isTeam) => {
					if (!isTeam) return;

					const members = await db.getTeamMembers(teamId);

					if (!members) return;

					const teamMembers: { [key: string]: Member } = {};

					members.forEach((member) => {
						teamMembers[member?.id ?? "1"] = member;
					});

					dispatch({
						type: "Set team",
						payload: {
							members: teamMembers,
						},
					});
				})
				.catch((e) => {
					throw e;
				});
		}
	}, []);

	const handleAdding = useCallback(() => {
		dispatch({
			type: "Add Teamate",
		});
	}, []);

	const savingButtonRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<h2>Voy a editar el equipo con el id de: {teamId}</h2>
			<div>Este es el equipo: </div>
			<div>
				<pre>{JSON.stringify(oldTeam.current)}</pre>
			</div>
			<form action="">
				<InputWithLabel
					name="color"
					text="Color: "
					type={"text"}
					onChange={(value) => {
						onChange(value, "color");
					}}
					value={color}
				/>
				<InputWithLabel
					name="name"
					text="Name: "
					type={"text"}
					onChange={(value) => {
						onChange(value, "name");
					}}
					value={name}
				/>
			</form>
			<div>
				<h2>Members</h2>
				<button className="bg-CTA-400 text-gray-10" onClick={handleAdding}>
					Add a new Teamate
				</button>
				<ul>
					{Object.entries(members).map(([id, member]) => (
						<li key={id}>
							<MemberBuilder
								member={member}
								handleDelete={() =>
									dispatch({
										type: "Delete Teamate",
										payload: {
											id,
										},
									})
								}
								handleUpdate={(updatedMember) => {
									dispatch({
										type: "Update Teamate",
										payload: {
											id,
											updatedMember,
										},
									});
								}}
							/>
						</li>
					))}
				</ul>
				<button
					ref={savingButtonRef}
					className="bg-CTA-400 text-gray-10"
					onClick={async () => {
						if (savingButtonRef.current)
							savingButtonRef.current.disabled = true;

						let newId = isNewTeam
							? db.addTeam({
									color,
									name,
									members: [],
							  })
							: teamId;

						const membersId = Object.entries(members).map(([id, member]) => {
							return db.addMember(member);
						});

						const [idTeam, ...idCosa] = await Promise.all([
							newId,
							...membersId,
						]);

						await db.addMemberToTeam(idTeam, ...idCosa);

						if (savingButtonRef.current)
							savingButtonRef.current.disabled = false;

						navigate("/team/select");
					}}
				>
					Save team
				</button>
			</div>
		</>
	);
};
