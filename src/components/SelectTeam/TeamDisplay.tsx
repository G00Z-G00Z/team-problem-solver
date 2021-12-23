import React, { FC } from "react";
import { Team } from "../../types/interfaces";

interface Props {
	team: Team;
}
export const TeamDisplay: FC<Props> = ({ team }) => {
	return <div>{JSON.stringify(team)}</div>;
};
