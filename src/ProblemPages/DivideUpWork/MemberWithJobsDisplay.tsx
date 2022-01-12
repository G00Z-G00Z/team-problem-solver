import React, { FC } from 'react'
import { MemberWithJobs } from '../../problem-algorithms/divideUpWork'

export const MemberWithJobsDisplay: FC<MemberWithJobs> = ({
  member,
  jobs,
  workload,
}) => {
  return (
    <div className="w-full border-2 border-dashed border-CTA-500 max-w-sm">
      <h2 className="text-center bg-CTA-100 font-bold ">{member.name}</h2>
      <div className="p-4">
        <p>
          <b>Workload: </b>
          <span>{workload}</span>
        </p>
        <p>
          <b>Tasks: </b>
          <ul>
            {jobs.map((job, idx) => (
              <li key={idx}>
                {job.desc} : {job.weight}{" "}
              </li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  );
};
