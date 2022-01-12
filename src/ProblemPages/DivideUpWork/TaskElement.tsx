import React, {
  FC,
  useEffect,
  useRef,
  useState
  } from 'react'
import { Task } from '../../problem-algorithms/divideUpWork'

interface Props {
  handleDelete: (idx: number) => void;
  handleUpdate: (idx: number, newValue: Task) => void;
  idx: number;
  task: Task;
}

function deleteContextMenu(e: MouseEvent) {
  e.preventDefault();
}

export const TaskElement: FC<Props> = ({
  handleDelete,
  handleUpdate,
  idx,
  task,
}) => {
  const HTMLtask = useRef<HTMLTableRowElement | null>(null);

  return (
    <tr className="" ref={HTMLtask}>
      <td>{idx + 1}.</td>
      <td>
        <input
          type="text"
          name="desc"
          value={task.desc}
          onChange={(e) => handleUpdate(idx, { ...task, desc: e.target.value })}
        />
      </td>
      <td>
        <select
          value={task.weight}
          onChange={(e) =>
            handleUpdate(idx, { ...task, weight: Number(e.target.value) })
          }
          name="weight"
        >
          <option value="1">small</option>
          <option value="2">medium</option>
          <option value="3">big</option>
        </select>
      </td>
    </tr>
  );
};
