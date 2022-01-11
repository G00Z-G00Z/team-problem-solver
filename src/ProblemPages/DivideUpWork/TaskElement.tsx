import React, { FC } from 'react'
import { Task } from '../../problem-algorithms/divideUpWork'

interface Props {
  handleDelete: () => void;
  idx: number;
  task: Task;
}

export const TaskElement: FC<Props> = ({ handleDelete, idx, task }) => {
  return (
    <tr className="">
      <td>{idx + 1}.</td>
      <td>{task.desc + "hj"}</td>
      <td>{task.weight}</td>
    </tr>
  );
};
