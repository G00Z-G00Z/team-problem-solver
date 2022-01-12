import React, { useReducer, useRef, useState } from 'react'
import { ProblemPage } from '../interface'
import { Task } from '../../problem-algorithms/divideUpWork'
import { TaskElement } from './TaskElement'

const defaultTask: Task = {
  desc: "",
  weight: 1,
};

type State = Task[];

type Actions =
  | {
      type: "Add";
    }
  | {
      type: "Update";
      payload: {
        idx: number;
        value: Task;
      };
    }
  | {
      type: "Delete";
      payload: {
        idx: number;
      };
    };

function divideUpWorkReducer(state: State, action: Actions): State {
  switch (action.type) {
    case "Add":
      return [...state, { ...defaultTask }];

    case "Delete":
      return state.filter((_, idx) => idx !== action.payload.idx);

    case "Update":
      let { idx, value } = action.payload;
      state[idx] = value;
      return [...state];
  }
}

export const DivideUpWork: ProblemPage = ({ team }) => {
  const [tasks, dispatch] = useReducer(divideUpWorkReducer, []);

  const handleAddingTask = () => {
    dispatch({
      type: "Add",
    });
  };

  const handleDelete = (idx: number) => {
    dispatch({
      type: "Delete",
      payload: {
        idx,
      },
    });
  };

  const handleUpdate = (idx: number, value: Task) => {
    dispatch({
      type: "Update",
      payload: {
        idx,
        value,
      },
    });
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
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
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
