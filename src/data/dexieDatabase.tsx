// db.ts
import Dexie, { Table } from "dexie";
import { DataBaseHandler, Member, Team } from "../types/interfaces";

class AppDatabase extends Dexie implements DataBaseHandler {
	people!: Table<Member>;
	teams!: Table<Team>;

	constructor() {
		super("myDatabase");
		this.version(1).stores({
			people: "++id, name, color, photo",
			teams: "++id, color, name, members",
		});
	}

	async addMember(member?: Member | undefined): Promise<string> {
		member ||= {
			color: "",
			name: "",
			photo: "",
		};

		try {
			const id = await db.people.add(member);
			return id as string;
		} catch (error) {
			throw error;
		}
	}

	async addTeam(team?: Team | undefined) {
		team ||= { color: "", members: [], name: "" };
		try {
			const id = await db.teams.add(team);
			return id as string;
		} catch (error) {
			throw error;
		}
	}

	async addMemberToTeam(
		teamId: string | number,
		...memberIds: string[]
	): Promise<boolean> {
		teamId = Number(teamId);
		const team = await this.teams.get(teamId);

		if (!team) return false;

		return !!(await this.teams.update(teamId, {
			members: [...team.members, ...memberIds],
		}));
	}

	async deleteTeam(id: string | number): Promise<boolean> {
		const team = await this.teams.get(Number(id));

		const deleteTeamate = this.people.delete(id);

		await Promise.all([deleteAllReferencesInTeams, deleteTeamate]);
		return true;
	}
}

export const db = new AppDatabase();
export const dbTest = new AppDatabase();
