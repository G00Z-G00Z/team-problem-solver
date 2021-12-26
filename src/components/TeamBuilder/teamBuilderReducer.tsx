import { Member } from "../../types/interfaces";
import simpleIdGenerator from "../utils/simpleIdGenerator";

type State = {
	[key: string]: Member;
};
export type Action =
	| {
			type: "Add Teamate";
	  }
	| {
			type: "Delete Teamate";
			payload: {
				id: number;
			};
	  }
	| {
			type: "Update Teamate";
			payload: {
				id: number;
				updatedMember: Member;
			};
	  }
	| {
			type: "Save team";
			payload: {
				id: number;
			};
	  }
	| {
			type: "Set team";
			payload: {
				members: State;
			};
	  };

// Generator of id's
const idGenrator = simpleIdGenerator();

function getDefaultNewMember(): Member {
	return {
		color: "",
		photo: "",
		name: "",
		// @ts-ignore
		id: idGenrator.next().value,
	};
}

export function editTeamReducer(state: State, action: Action): State {
	let newMember: Member;

	switch (action.type) {
		case "Add Teamate":
			newMember = getDefaultNewMember();
			return { ...state, [newMember.id ?? "1"]: newMember };
		case "Delete Teamate":
			delete state[action.payload.id];
			return { ...state };
		case "Save team":
			return state;
		case "Update Teamate":
			return { ...state, [action.payload.id]: action.payload.updatedMember };
		default:
			throw new Error(
				`"${action.type} is not a valid action for edit team reducer"`
			);
	}
}
