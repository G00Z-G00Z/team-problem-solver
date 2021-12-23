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
    addMemberToTeam(teamId: string, ...memberIds: string[]): Promise<boolean>
    deleteMember(id: string): Promise<boolean>
    deleteTeam(id: string): Promise<boolean>

    getTeams(): Promise<Team[]>
    getMembers(): Promise<Member[]>

    getTeam(id: string): Promise<Team | undefined>

}
