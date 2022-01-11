import React, { useState } from 'react'
import { ProblemPage } from '../interface'
import { Task } from '../../problem-algorithms/divideUpWork'
import { TaskElement } from './TaskElement'

const defaultTask: Task = {
  desc: "",
  weight: 1,
};

export const DivideUpWork: ProblemPage = ({ team }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddingTask = () => {
    setTasks((list) => [...list, { ...defaultTask }]);
  };

  const handleDelete = (idx: number) => {
    setTasks((list) => list.filter((_, idxTaks) => idxTaks !== idx));
  };

  return (
    <>
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
            <th className="">#</th>
            <th className="">Descripcion</th>
            <th className="">Weight</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <TaskElement
              handleDelete={() => handleDelete(idx)}
              idx={idx}
              task={task}
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
    </>
  );
};
