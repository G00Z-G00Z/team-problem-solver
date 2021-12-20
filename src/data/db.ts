// db.ts
import Dexie, { Table } from 'dexie';
import { Member, Team } from '../types/interfaces';

export class MyDatabase extends Dexie {

    people!: Table<Member>;
    teams!: Table<Team>;

    constructor() {
        super('myDatabase');
        this.version(1).stores({
            people: '++id, name, color, photo',
            teams: "++id, color, name, members",
        }
        );
    }
}

export const db = new MyDatabase();