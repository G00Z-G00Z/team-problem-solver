import React, {
  FC,
  useEffect,
  useRef,
  useState
  } from 'react'

interface Props {
  weight: number | string;
  onChange: (newWeight: string) => void;
}

const maxWeight = 5;
const minWeight = 1;

const isInRange = (n: number) => minWeight <= n && n < maxWeight + 1;

export const TaskWeightSelector: FC<Props> = ({ weight, onChange }) => {
  if (!isInRange(Number(weight)))
    onChange(String(Number(weight) > maxWeight ? maxWeight : minWeight));

  return (
    <select
      value={weight}
      onChange={(e) => onChange(e.target.value)}
      name="weight"
    >
      <option value="1">tiny</option>
      <option value="2">small</option>
      <option value="3">medium</option>
      <option value="4">big</option>
      <option value="5">giant</option>
    </select>
  );
};
