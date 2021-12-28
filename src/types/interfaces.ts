export interface Member {
    color: string,
    name: string,
    // Profile seed for generating abatar
    profileSeed: string,
}

export interface Team {
    color: string,
    name: string,
    members: Member[],
    id?: number
}

/**
 * Database Handler for the teams
 */
export interface DataBaseHandler {

    // Adders
    createTeam(): Promise<number>
    addMemberToTeam(teamId: string | number, ...memberIds: Member[]): Promise<boolean>

    // Deleters
    deleteTeam(id: string | number): Promise<boolean>

    // Update
    updateTeam(id: string | number, team: Team): Promise<number | undefined>

    // Getters
    getAllTeams(): Promise<Team[]>
    getTeam(id: string | number): Promise<Team | undefined>
}
