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
		teamId: string,
		...memberIds: string[]
	): Promise<boolean> {
		const team = await this.teams.get(teamId);

		if (!team) return false;

		return !!(await this.teams.update(teamId, {
			members: [...team.members, ...memberIds],
		}));
	}

	async deleteMember(id: string): Promise<boolean> {
		try {
			const cosa = this.transaction(
				"rw",
				[this.people, this.teams],
				async () => {
					const deleteAllReferencesInTeams = this.teams
						.toCollection()
						.modify((team) => {
							const newIds = team.members.filter((i) => i !== id);
							team.members = newIds;
						});

					const deleteTeamate = this.people.delete(id);

					await Promise.all([deleteAllReferencesInTeams, deleteTeamate]);
					return true;
				}
			);

			return cosa;
		} catch (error) {
			throw error;
		}
	}

	async deleteTeam(id: string): Promise<boolean> {
		await this.teams.delete(id);
		return true;
	}

	async getTeams(): Promise<Team[]> {
		return await this.teams.toArray();
	}
	async getMembers(): Promise<Member[]> {
		return await this.people.toArray();
	}

	async getTeam(id: string): Promise<Team | undefined> {
		return await this.teams.get(id);
	}
}

export const db = new AppDatabase();
export const dbTest = new AppDatabase();
