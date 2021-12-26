import React, { FC } from "react";
import { Member } from "../../types/interfaces";

interface Props {
	member: Member;
	onDelete: (id: number) => void;
}
export const MemberBuilder: FC<Props> = ({ member, onDelete }) => {
	const { color, name, id = 1 } = member;

	return (
		<>
			<h3>{name}</h3>
			<h3>Id : {id}</h3>
			<h3>mi color : {color}</h3>
			<button onClick={(e) => onDelete(id)}>Borrame a la chingada</button>
		</>
	);
};
