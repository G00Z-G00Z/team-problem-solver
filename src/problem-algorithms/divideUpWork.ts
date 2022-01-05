import { Member } from '../types/interfaces'

export interface Job {
  desc: string;
  weight: number;
}

export const divideUpWork = (
  members: Member[],
  jobs: Job[]
): [Member, Job[]][] => {
  return [];
};
