export interface Member {
    color: string,
    name: string,
    id?: number,
    photo: string,
}

export interface Team {
    color: string,
    name: string,
    members: string[],
    id?: number
}

/**
 * Database Handler for the teams
 */
export interface DataBaseHandler {

    addTeam(team: Team | undefined): Promise<string>
    addMember(member: Member | undefined): Promise<string>
    addMemberToTeam(teamId: string | number, ...memberIds: string[]): Promise<boolean>
    deleteTeam(id: string | number): Promise<boolean>

    getTeams(): Promise<Team[]>
    getMembers(): Promise<Member[]>

    getTeamMembers(teamId: string | number): Promise<Member[] | undefined>
    getTeam(id: string | number): Promise<Team | undefined>

}
