import { Member } from '../types/interfaces'
import { PriorityQueue } from './priorityQueue'
import { shuffleArray } from '../utils/shuffleArray'

export interface Job {
  desc: string;
  weight: number;
}

export interface MemberWithJobs {
  member: Member;
  jobs: Job[];
  workload: number;
}

/**
 * Divides up the work using this method:
 *
 * 1. Shuffles the members
 * 2. Sorts the jobs in descending order
 * 3. Gives the heaviest job to the member with the lowest workload
 * 4. Updates the total workload of the meber
 * 5. Repeats 3 - 4 until all jobs have been assigned
 *
 * @param members List of members
 * @param jobs List of jobs
 * @returns MembersWithJobs
 */
export const divideUpWork = (
  members: Member[],
  jobs: Job[]
): MemberWithJobs[] => {
  // Jobs sorted in descending order, to pop the last job
  const sortedJobs = jobs.sort((a, b) => a.weight - b.weight);

  // Shuffles the members
  const randomOrderMembers = shuffleArray(members);

  const minPriorityQueue = new PriorityQueue<MemberWithJobs>(
    ({ workload: a }, { workload: b }) => a < b
  );

  // Put all the values in the priority queue
  minPriorityQueue.push(
    ...randomOrderMembers.map((member) => ({
      member,
      jobs: [],
      workload: 0,
    }))
  );

  // The lowest index, is the heaviest job
  for (let i = 0; i < sortedJobs.length; i++) {
    const job = sortedJobs[i];
    const member = minPriorityQueue.pop();
    if (!member) break;

    // update member
    member.jobs.push(job);
    member.workload += job.weight;

    // reinsert in queue
    minPriorityQueue.push(member);
  }

  return minPriorityQueue.toArray();
};
