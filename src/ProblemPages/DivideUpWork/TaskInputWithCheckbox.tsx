import React, { FC } from 'react'
import { RoundedCheckbox } from '../../components/General/RoundedCheckbox'
import { Task } from '../../problem-algorithms/divideUpWork'
import { TaskInput } from './TaskInput'
import { TaskWeightSelector } from './TaskWeightSelector'

interface Props {
  handleWeightChange: (w: string) => void;
  handleDescChange: (w: string) => void;
  task: Task;
  checked: boolean;
  handleToggleCheck: () => void;
}

export const TaskInputWithCheckbox: FC<Props> = ({
  handleWeightChange,
  handleDescChange,
  task,
  checked,
  handleToggleCheck,
}) => {
  const handleOnKeyDownEvent = (e: { key: string }) => {
    switch (e.key) {
      case "ArrowUp":
        handleWeightChange(String(task.weight + 1));
        return;
      case "ArrowDown":
        handleWeightChange(String(task.weight - 1));
        return;
      default:
        break;
    }
  };
  return (
    <section className="w-full grid grid-cols-[5%_60%_25%] gap-4 border-b-2 border-solid border-gray-200 py-4 justify-center items-center">
      <RoundedCheckbox
        name="selected"
        checked={checked}
        onChange={handleToggleCheck}
      />
      <input
        type="text"
        name="desc"
        onChange={(e) => handleDescChange(e.target.value)}
        onKeyDown={handleOnKeyDownEvent}
        autoComplete="off"
        className="break-words bg-transparent"
        value={task.desc}
      />
      <TaskWeightSelector onChange={handleWeightChange} weight={task.weight} />
    </section>
  );
};
