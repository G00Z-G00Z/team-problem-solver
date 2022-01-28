import React, { FC, useContext } from 'react'
import { appColors, AvailableColorNames } from '../../types/AppColors'
import { MemberWithJobs } from '../../problem-algorithms/divideUpWork'
import { UiContext } from '../../context/uiContext'

export const MemberWithJobsDisplay: FC<
  MemberWithJobs & { color: AvailableColorNames }
> = ({ member, jobs, workload, color }) => {
  const { darkmode } = useContext(UiContext);

  return (
    <div
      style={{
        borderColor: darkmode ? appColors[color][100] : appColors[color][500],
      }}
      className="w-full border-2 border-dashed  max-w-sm"
    >
      <h2
        style={{
          backgroundColor: darkmode
            ? appColors[color][200]
            : appColors[color][100],
          color: appColors[color][500],
        }}
        className="text-center font-bold "
      >
        {member.name}
      </h2>
      <div className="p-4 text-gray-800 dark:text-gray-200">
        {jobs.length > 0 ? (
          <>
            <p>
              <b>Workload: </b>
              <span>{Number(workload)}</span>
            </p>
            <div>
              <b>Tasks: </b>
              <ul>
                {jobs.map((job, idx) => (
                  <li key={idx} className="">
                    {job.desc} : {job.weight}{" "}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="w-full text-center text-gray-800 dark:text-gray-200">
            ¡Felicidades! No te tocó nada!
          </div>
        )}
      </div>
    </div>
  );
};
