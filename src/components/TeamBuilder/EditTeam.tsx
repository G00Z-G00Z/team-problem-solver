import React, { useCallback, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { InputWithLabel } from "../utils/InputWithLabel";
import { Member } from "../../types/interfaces";
import { MemberBuilder } from "./MemberBuilder";
import { db } from "../../data/dexieDatabase";
import { editTeamReducer } from "./teamBuilderReducer";

export const EditTeam = () => {
	const navigate = useNavigate();

	const { teamId } = useParams<{
		teamId: string;
	}>();

	!teamId && navigate("/");

	const [team, dispatch] = useReducer(editTeamReducer, {});

	// Use effect que graba y carga el equipo al principio
	useEffect(() => {
		if (teamId !== "new") {
			db.getTeamMembers(teamId as string)
				.then((members) => {
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

	const { color, name, onChange } = useForm({
		color: "",
		name: "",
	});

	return (
		<>
			<h2>Voy a editar el equipo con el id de: {teamId}</h2>
			<form action="">
				<InputWithLabel
					name="name"
					text="Name: "
					type={"text"}
					onChange={(value) => {
						onChange(value, "name");
					}}
					value={name}
				/>
				<InputWithLabel
					name="color"
					text="Color: "
					type={"color"}
					onChange={(value) => {
						onChange(value, "color");
					}}
					value={color}
				/>
			</form>
			<div>
				<h2>Members</h2>
				<button className="bg-CTA-400 text-gray-10" onClick={handleAdding}>
					Add a new Teamate
				</button>
				<ul>
					{Object.entries(team).map(([id, member]) => (
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
			</div>
		</>
	);
};
