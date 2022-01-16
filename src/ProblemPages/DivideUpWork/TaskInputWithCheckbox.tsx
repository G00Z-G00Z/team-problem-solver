import React, { FC } from 'react'
import { Task } from '../../problem-algorithms/divideUpWork'
import { TaskInput } from './TaskInput'

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
    <section>
      <input
        type="checkbox"
        name="selected"
        checked={checked}
        onChange={handleToggleCheck}
      />
      <TaskInput
        desc={task.desc}
        weight={task.weight}
        handleOnKeyDownEvent={handleOnKeyDownEvent}
        onChangeDesc={handleDescChange}
        onChangeWeight={handleWeightChange}
      />
    </section>
  );
};
