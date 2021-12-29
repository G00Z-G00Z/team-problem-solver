// db.ts
import Dexie, { Table } from "dexie";
import { DataBaseHandler, Member, Team } from "../types/interfaces";

class AppDatabase extends Dexie implements DataBaseHandler {
	teams!: Table<Team>;

	constructor() {
		super("myDatabase");
		this.version(6).stores({
			teams: "++id, color, name, members",
		});
	}

	async createTeam(team?: Team) {
		team ||= { color: "gray", members: [], name: "" };
		try {
			const id = await this.teams.add(team);
			return Number(id);
		} catch (error) {
			throw error;
		}
	}

	async deleteAllTeams(): Promise<boolean> {
		await this.teams.clear();
		return true;
	}

	async updateTeam(
		id: string | number,
		team: Team
	): Promise<number | undefined> {
		try {
			let idNumber = Number(id);
			return await this.teams.update(idNumber, team);
		} catch (error) {
			throw error;
		}
	}

	async addMemberToTeam(
		teamId: string | number,
		...memberIds: Member[]
	): Promise<boolean> {
		teamId = Number(teamId);

		const team = await this.getTeam(teamId);

		if (!team) return false;

		return !!(await this.teams.update(teamId, {
			members: [...team.members, ...memberIds],
		}));
	}

	async deleteTeam(id: string | number): Promise<boolean> {
		await this.teams.delete(Number(id));
		return true;
	}

	async getAllTeams(): Promise<Team[]> {
		return await this.teams.toArray();
	}

	async getTeam(id: string | number): Promise<Team | undefined> {
		return await this.teams.get(Number(id));
	}
}

export const db = new AppDatabase();
export const dbTest = new AppDatabase();
