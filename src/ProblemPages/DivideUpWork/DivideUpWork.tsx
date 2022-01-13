import React, { useCallback, useReducer, useState } from 'react'
import { MemberWithJobsDisplay } from './MemberWithJobsDisplay'
import { ProblemPage } from '../interface'
import { TaskElement } from './TaskElement'
import { TaskReducer } from './TasksReducer'
import {
  divideUpWork,
  MemberWithJobs,
  Task,
} from "../../problem-algorithms/divideUpWork";

export const DivideUpWork: ProblemPage = ({ team }) => {
  const [tasksWithCheckbox, dispatch] = useReducer(TaskReducer, []);

  const [dividedTasks, setDividedTasks] = useState<MemberWithJobs[]>([]);

  const handleAddingTask = () => {
    dispatch({
      type: "Add",
    });
  };

  const handleDelete = (idx: number) => {
    dispatch({
      type: "Delete",
    });
  };

  const handleUpdate = (idx: number, { desc, weight }: Partial<Task>) => {
    dispatch({
      type: "Update",
      payload: {
        idx,
        desc,
        weight,
      },
    });
  };

  const handleToggleCheck = (idx: number) => {
    dispatch({
      type: "Toggle Selection",
      payload: {
        idx,
      },
    });
  };

  const handleDividing = () => {
    setDividedTasks(
      divideUpWork(
        team.members,
        tasksWithCheckbox.map(({ task }) => task)
      )
    );
  };

  return (
    <div className="pb-10">
      <h1 className="w-full text-5xl font-serif text-center font-bold ">
        Divide Up Work
      </h1>

      <table className="mt-2 w-full">
        <colgroup>
          <col span={1} className="w-1/12 " />
          <col span={1} className="w-8/12" />
          <col span={1} className="w-3/12" />
        </colgroup>
        <thead className="border-b-2 border-b-CTA-400 border-b-double">
          <tr className="">
            <th className="">
              <input
                type="checkbox"
                checked={tasksWithCheckbox.some(({ checked }) => checked)}
                onChange={() =>
                  dispatch({
                    type: "Toggle Selection All",
                  })
                }
              />
            </th>
            <th className="">Descripcion</th>
            <th className="">Weight</th>
          </tr>
        </thead>
        <tbody>
          {tasksWithCheckbox.map((element, idx) => (
            <TaskElement
              handleUpdate={handleUpdate}
              handleToggleCheck={handleToggleCheck}
              idx={idx}
              {...element}
              key={idx}
            />
          ))}

          <tr>
            <td colSpan={3}>
              <button
                className="w-full bg-gray-200 p-4 hover:bg-gray-300"
                onClick={handleAddingTask}
              >
                + New task
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button className="text-2xl bg-CTA-400 " onClick={handleDividing}>
        Divide up Work
      </button>
      <section className="flex flex-wrap gap-3 justify-center my-2">
        {dividedTasks.map((member, idx) => (
          <MemberWithJobsDisplay key={idx} {...member} color={team.color} />
        ))}
      </section>
    </div>
  );
};
