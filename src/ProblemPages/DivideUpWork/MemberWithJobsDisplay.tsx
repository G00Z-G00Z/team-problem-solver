import React, { FC } from 'react'
import { appColors, AvailableColorNames } from '../../types/AppColors'
import { MemberWithJobs } from '../../problem-algorithms/divideUpWork'

export const MemberWithJobsDisplay: FC<
  MemberWithJobs & { color: AvailableColorNames }
> = ({ member, jobs, workload, color }) => {
  return (
    <div
      style={{
        borderColor: appColors[color][400],
      }}
      className="w-full border-2 border-dashed  max-w-sm"
    >
      <h2
        style={{
          backgroundColor: appColors[color][100],
          color: appColors[color][500],
        }}
        className="text-center font-bold "
      >
        {member.name}
      </h2>
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
