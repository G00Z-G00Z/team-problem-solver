import { createRandomTeam } from '../../seeds/teamSeeds'
import { divideUpWork, Job } from '../../problem-algorithms/divideUpWork'

export {};

/**
 * Function that creates a random job
 * @param weight number
 * @returns Job
 */
function randomJob(weight: number = 1): Job {
  return {
    desc: "",
    weight,
  };
}

describe("Tests in divide up work algorithm", () => {
  test("No member leaves with empty workload", () => {
    const team = createRandomTeam(4);

    const jobs: Job[] = [
      randomJob(1),
      randomJob(2),
      randomJob(3),
      randomJob(4),
    ];

    const result = divideUpWork(team.members, jobs);

    expect(
      result.every(({ workload, jobs }) => workload > 0 && jobs.length > 0)
    ).toBeTruthy();
  });
  test("Splits workload evenly (Jobs with same weight)", () => {
    const persons = 3;

    const team = createRandomTeam(persons);

    // List of 9 jobs with equal weight
    const jobs: Job[] = Array.from(new Array(persons * 3), () => randomJob());

    // Should divide those jobs evenly
    const result = divideUpWork(team.members, jobs);

    expect(
      result.every(({ workload, jobs }) => workload === 3 && jobs.length === 3)
    ).toBeTruthy();
  });
  test("Total workload equals the jobs weight sum", () => {
    const persons = 2;

    const team = createRandomTeam(persons);

    const jobs: Job[] = Array.from(new Array(persons * 10), () =>
      randomJob(Math.ceil(Math.random() * 10 + 1))
    );

    const result = divideUpWork(team.members, jobs);

    expect(
      result.every(
        ({ workload, jobs }) =>
          jobs.map(({ weight }) => weight).reduce((a, b) => a + b) === workload
      )
    ).toBeTruthy();
  });
  test("Splits workload evenly (different weights, but can be splited evenly)", () => {
    {
      const team = createRandomTeam(2);

      const jobs: Job[] = [randomJob(3), randomJob(2), randomJob(1)];

      const result = divideUpWork(team.members, jobs);

      // There is enough change to split the workload with 3 points each
      expect(result.every(({ workload }) => workload === 3)).toBeTruthy();
    }
    {
      const team = createRandomTeam(4);

      // Jobs that can be splited into 4 groups of 4 work load
      const jobs: Job[] = [
        // 1st
        randomJob(4),
        //2nd
        randomJob(1),
        randomJob(1),
        randomJob(2),
        //3rd
        randomJob(3),
        randomJob(1),
        //4th
        randomJob(2),
        randomJob(2),
      ];

      const result = divideUpWork(team.members, jobs);

      // There is enough change to split the workload with 3 points each
      expect(result.every(({ workload }) => workload === 4)).toBeTruthy();
    }
  });
  test("Splits workload with minimal diference (different weights, but cannot be splited evenly)", () => {
    function createCase(
      people: number,
      jobs: Job[],
      expectedMaxDiference: number
    ) {
      const team = createRandomTeam(people);

      const result = divideUpWork(team.members, jobs);

      const workload = result.map(({ workload }) => workload);

      const min = Math.min(...workload),
        max = Math.max(...workload);

      return expectedMaxDiference <= max - min;
    }

    // One extra job, expected diference of 2
    expect(
      createCase(
        2,
        [randomJob(2), randomJob(2), randomJob(2), randomJob(2), randomJob(2)],
        2
      )
    ).toBeTruthy();
    // Expected result: 5, 4, 3
    expect(
      createCase(
        3,
        [randomJob(1), randomJob(5), randomJob(2), randomJob(2), randomJob(2)],
        2
      )
    ).toBeTruthy();
    // Expected result: 5, 4, 3
    expect(
      createCase(
        5,
        [
          // 1st / 10 workload points
          randomJob(10),
          // 2nd / 9 workload points
          randomJob(9),
          // 3rd / 8 workload points
          randomJob(7),
          randomJob(1),
          // 4th / 8 workload points
          randomJob(5),
          randomJob(2),
          randomJob(1),
          // 5th / 8 workload points
          randomJob(3),
          randomJob(2),
          randomJob(1),
          randomJob(1),
          randomJob(1),
        ],
        2
      )
    ).toBeTruthy();
  });
});
