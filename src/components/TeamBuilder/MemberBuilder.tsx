import React, { FC, useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import { Member } from "../../types/interfaces";
import { InputWithLabel } from "../utils/InputWithLabel";

interface Props {
	member: Member;
	handleDelete: () => void;
	handleUpdate: (value: Member) => void;
}
export const MemberBuilder: FC<Props> = ({
	member,
	handleDelete,
	handleUpdate,
}) => {
	const { name, color, onChange } = useForm({
		name: member.name,
		color: member.color,
	});

	const timeoutId = useRef<NodeJS.Timeout | null>(null);

	// This updates the state every 200 seconds, instead of instant
	useEffect(() => {
		timeoutId.current && clearTimeout(timeoutId.current);

		timeoutId.current = setTimeout(() => {
			handleUpdate({ ...member, name, color });
		}, 500);
	}, [name, color]);

	return (
		<>
			<InputWithLabel
				name="name"
				onChange={(value) => onChange(value, "name")}
				text="Name"
				type={"text"}
				value={name}
			/>
			<InputWithLabel
				name="color"
				onChange={(value) => onChange(value, "color")}
				text="Color"
				type={"color"}
				value={color}
			/>

			<button onClick={handleDelete}>Borrame a la chingada</button>
		</>
	);
};
