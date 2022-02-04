import React, { FC, useContext } from 'react'
import { appColors, AvailableColorNames } from '../../types/AppColors'
import { JobWeight, weightColors } from './TaskWeightSelector'
import { MemberWithJobs, Task } from '../../problem-algorithms/divideUpWork'
import { UiContext } from '../../context/uiContext'

export const hashMapWeightData: {
  [key: number]: JobWeight;
} = Object.assign(
  {},
  ...weightColors.map((val) => ({
    [val.weight]: val,
  }))
);

export const MemberWithJobsDisplay: FC<
  MemberWithJobs & {
    color: AvailableColorNames;
    allTasksHaveTheSameWeight: boolean;
  }
> = ({ member, jobs, workload, color, allTasksHaveTheSameWeight }) => {
  const { darkmode } = useContext(UiContext);

  // Sortea los trabajos de mayor a menor
  jobs.sort((a, b) => b.weight - a.weight);

  return (
    <div
      style={{
        borderColor: darkmode ? appColors[color][100] : appColors[color][500],
      }}
      className="w-full border-2 border-dashed max-w-sm flex flex-col"
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
      <div className="p-4 text-gray-800 dark:text-gray-200 flex flex-col justify-between align-middle flex-1 ">
        {jobs.length > 0 ? (
          <>
            <div className="flex flex-col h-full justify-between gap-2 ">
              <div>
                <b>Tasks: </b>
                <ul>
                  {jobs.map((job, idx) => (
                    <li key={idx} className="">
                      {allTasksHaveTheSameWeight ? (
                        `${job.desc}`
                      ) : (
                        <div className="w-full p-2 grid grid-cols-[70%_30%] justify-items-start items-center gap-1">
                          <span className="break-words w-full">{job.desc}</span>
                          <span
                            className="rounded-full px-2 "
                            style={{
                              backgroundColor:
                                appColors[
                                  hashMapWeightData[job.weight].color
                                ][200],
                              color:
                                appColors[
                                  hashMapWeightData[job.weight].color
                                ][500],
                            }}
                          >
                            {hashMapWeightData[job.weight].name}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {
                <p className="border-t-2 border-t-solid dark:border-t-gray-800 border-t-gray-200  py-2  grid grid-cols-[70%_30%] justify-items-start items-center gap-1">
                  {allTasksHaveTheSameWeight ? (
                    <>
                      <b>Number of Tasks:</b>
                      <span>{jobs.length}</span>
                    </>
                  ) : (
                    <>
                      <b>Total Workload: </b>
                      <span>{workload}pts</span>
                    </>
                  )}
                </p>
              }
            </div>
          </>
        ) : (
          <div className="w-full text-center text-gray-800 dark:text-gray-200">
            Lucky!! You have nothing assigned!
          </div>
        )}
      </div>
    </div>
  );
};
