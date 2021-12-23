import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { InputWithLabel } from "../utils/InputWithLabel";

export const EditTeam = () => {
	const navigate = useNavigate();

	const { teamId } = useParams<{
		teamId: string;
	}>();

	const { color, name, onChange } = useForm({
		color: "",
		name: "",
	});

	!teamId && navigate("/");

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
		</>
	);
};
