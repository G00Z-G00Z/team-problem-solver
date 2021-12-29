import React, {
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputWithLabel } from "../utils/InputWithLabel";
import { Team, AvailableColorNames } from "../../types/interfaces";
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

	const [colorr, setColorr] = useState<AvailableColorNames>("gray");
	const [namee, setNamee] = useState("");

	const [members, dispatch] = useReducer(editTeamateReducer, {});

	// Use effect que graba y carga el equipo al principio
	useEffect(() => {
		if (!isNewTeam) {
			db.getTeam(teamId).then((team) => {
				if (team) {
					setNamee(team.name ?? "no name");
					setColorr(team.color ?? "no color");
					oldTeam.current = team;
					dispatch({
						type: "Set team",
						payload: {
							members: team.members,
						},
					});
				}
			});
		}
	}, []);

	const handleAdding = useCallback(() => {
		dispatch({
			type: "Add Teamate",
		});
	}, []);

	const handleDeleting = async () => {
		console.log("Estoy borrando el equiop con el ide de ", teamId);
		const seBorro = await db.deleteTeam(teamId);
		seBorro && console.log("Se pudo borrar!!");
		navigate("/team/select");
	};

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
						setColorr(value as AvailableColorNames);
					}}
					value={colorr}
				/>
				<InputWithLabel
					name="name"
					text="Name: "
					type={"text"}
					onChange={(value) => {
						setNamee(value);
					}}
					value={namee}
				/>
			</form>
			<div>
				<h2>Members</h2>
				<button className="bg-CTA-400 text-gray-100" onClick={handleAdding}>
					Add a new Teamate
				</button>
				<ul>
					{Object.entries(members).map(([id, member]) => (
						<li key={id}>
							<MemberBuilder
								member={member}
								id={id}
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
					className="bg-CTA-400 text-gray-100"
					onClick={async () => {
						if (savingButtonRef.current)
							savingButtonRef.current.disabled = true;

						let id: number;

						id = isNewTeam ? await db.createTeam() : oldTeam.current?.id ?? 0;

						await db.updateTeam(id, {
							name: namee,
							color: colorr,
							members: Object.values(members),
						});

						if (savingButtonRef.current)
							savingButtonRef.current.disabled = false;

						navigate("/team/select");
					}}
				>
					Save team
				</button>
				{!isNewTeam && (
					<button
						className="text-gray-100 bg-danger-300"
						onClick={handleDeleting}
					>
						Borrar equipo
					</button>
				)}
			</div>
		</>
	);
};
