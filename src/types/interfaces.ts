export interface Member {
    color: string,
    name: string,
    id?: number,
    photo: string,
}

export interface Team {
    color: string,
    name: string,
    members: Member[],
    id?: number
}