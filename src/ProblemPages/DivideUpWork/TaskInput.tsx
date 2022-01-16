import React, { FC, useRef } from 'react'
import useForm from '../../hooks/useForm'
import { Task } from '../../problem-algorithms/divideUpWork'
import { TaskWeightSelector } from './TaskWeightSelector'

interface Props {
  handleAdding: (task: Task) => void;
}

export const TaskInput: FC<Props> = ({ handleAdding }) => {
  const { desc, weight, onChange, reset } = useForm({
    desc: "",
    weight: "3",
  });

  const handleClick = () => {
    if (desc === "") return;

    handleAdding({ desc, weight: Number(weight) });
    reset();
  };

  const HTMLInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        type="text"
        name="desc"
        onChange={(e) => onChange(e.target.value, "desc")}
        value={desc}
        ref={HTMLInput}
        autoComplete="off"
        onKeyDown={(e) => {
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
        }}
      />
      <TaskWeightSelector
        onChange={(newWeight) => onChange(newWeight, "weight")}
        weight={weight}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};
