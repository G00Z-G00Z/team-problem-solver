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
				members: Member[];
			};
	  };

// Generator of id's
const idGenrator = simpleIdGenerator();

function getDefaultNewMember(): Member {
	return {
		color: "gray",
		profileSeed: "",
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
			} while (state[id]);
			return { ...state, [id]: newMember };
		case "Delete Teamate":
			delete state[action.payload.id];
			return { ...state };

		case "Update Teamate":
			return { ...state, [action.payload.id]: action.payload.updatedMember };
		case "Set team":
			const newMembers: State = {};

			action.payload.members.forEach((member) => {
				newMembers[idGenrator.next().value ?? 1] = member;
			});
			return newMembers;
	}
}
