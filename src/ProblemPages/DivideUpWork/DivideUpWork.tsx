import React, { useState } from 'react'
import { ProblemPage } from '../interface'
import { Task } from '../../problem-algorithms/divideUpWork'

export const DivideUpWork: ProblemPage = ({ team }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <h1 className="w-full text-5xl font-serif text-center font-bold ">
        Divide Up Work
      </h1>

      <table className="mt-2 w-full">
        <thead className="border-b-2 border-b-CTA-400 border-b-double">
          <tr className="grid grid-cols-7 ">
            <th className="col-span-1">#</th>
            <th className="col-span-4">Descripcion</th>
            <th className="col-span-2">Weight</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};
