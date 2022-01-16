import React, { FC } from 'react'

interface Props {
  weight: number;
  onChange: (newWeight: string) => void;
}

export const TaskWeightSelector: FC<Props> = ({ weight, onChange }) => {
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
