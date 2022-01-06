import { DivideUpWork } from './DivideUpWork/DivideUpWork'
import { ProblemPageInfo } from './interface'

export const ProblemList: ProblemPageInfo[] = [];

ProblemList.push({
  imageUrl: process.env.PUBLIC_URL + "/assets/divde_work.png",
  Component: DivideUpWork,
  route: "divideWork",
  description:
    "Given a set of tasks, it tries to spread the workload evenly amongst the team",
  name: "Divide Work",
});
