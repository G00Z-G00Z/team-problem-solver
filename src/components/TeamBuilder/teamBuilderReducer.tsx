import { db } from "../../data/dexieDatabase";
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
				id: string;
			};
	  }
	| {
			type: "Update Teamate";
			payload: {
				id: string;
				updatedMember: Member;
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
	};
}

export function editTeamateReducer(state: State, action: Action): State {
	let newMember: Member;

	switch (action.type) {
		case "Add Teamate":
			newMember = getDefaultNewMember();

			let id: string;
			do {
				// @ts-ignore
				id = String(idGenrator.next().value);
			} while (Object.keys(state).includes(id));

			newMember.id = Number(id);

			return { ...state, [id]: newMember };
		case "Delete Teamate":
			delete state[action.payload.id];
			return { ...state };

		case "Update Teamate":
			return { ...state, [action.payload.id]: action.payload.updatedMember };
		case "Set team":
			return action.payload.members;
	}
}
