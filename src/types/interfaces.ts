import appColors from './AppColors';

export type AvailableColorNames = keyof typeof appColors
export interface Member {
    color: AvailableColorNames,
    name: string,
    // Profile seed for generating abatar
    profileSeed: string,
}

export interface Team {
    color: AvailableColorNames,
    name: string,
    members: Member[],
    id?: number
}

/**
 * Database Handler for the teams
 */
export interface DataBaseHandler {

    // Adders
    createTeam(team?: Team): Promise<number>
    addMemberToTeam(teamId: string | number, ...memberIds: Member[]): Promise<boolean>

    // Deleters
    deleteTeam(id: string | number): Promise<boolean>
    deleteAllTeams(): Promise<boolean>

    // Update
    updateTeam(id: string | number, team: Team): Promise<number | undefined>

    // Getters
    getAllTeams(): Promise<Team[]>
    getTeam(id: string | number): Promise<Team | undefined>


}
