import React, { FC, useRef } from 'react'
import useForm from '../../hooks/useForm'
import { AvailableColorNames } from '../../types/AppColors'
import { InputWithUnderline } from '../../components/General/InputWithUnderline'
import { ReactComponent as AddIcon } from '../../assets/queue.svg'
import { Task } from '../../problem-algorithms/divideUpWork'
import { TaskWeightSelector } from './TaskWeightSelector'

interface Props {
  handleAdding: (task: Task) => void;
  color?: AvailableColorNames;
}

export const TaskInput: FC<Props> = ({ handleAdding, color = "gray" }) => {
  const { desc, weight, onChange, reset } = useForm({
    desc: "",
    weight: "3",
  });

  const handleClick = () => {
    if (desc === "") return;

    handleAdding({ desc, weight: Number(weight) });
    reset();
  };

  const handleKeyDownEvent = (e: { key: string }) => {
    switch (e.key) {
      case "Enter":
        handleClick();
        HTMLInput.current?.focus();
        return;

      case "ArrowUp":
        onChange(String(Number(weight) + 1), "weight");
        return;
      case "ArrowDown":
        onChange(String(Number(weight) - 1), "weight");
        return;
    }
  };

  const HTMLInput = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full grid grid-cols-[70%_20%_10%] gap-4 p-4">
      <InputWithUnderline
        onChange={(v) => onChange(v, "desc")}
        value={desc}
        onKeyDown={handleKeyDownEvent}
        color={color}
      />
      <TaskWeightSelector
        onChange={(newWeight) => onChange(newWeight, "weight")}
        weight={weight}
      />
      <button
        onClick={handleClick}
        className="flex justify-center items-center disabled:fill-gray-400 fill-CTA-400 transition-all hover:fill-CTA-500"
        disabled={desc === ""}
      >
        <AddIcon className="fill-inherit stroke-1" />
      </button>
    </div>
  );
};
