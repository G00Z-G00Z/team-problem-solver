import { appColors, AvailableColorNames } from '../../types/AppColors'
import { FC, useContext } from 'react'
import { UiContext } from '../../context/uiContext'

interface Props {
  weight: number | string;
  onChange: (newWeight: string) => void;
}

const maxWeight = 5;
const minWeight = 1;

const isInRange = (n: number) => minWeight <= n && n < maxWeight + 1;

export interface JobWeight {
  name: string;
  weight: number;
  color: AvailableColorNames;
}

export const weightColors: JobWeight[] = [
  { name: "tiny", weight: 1, color: "gray" },
  { name: "small", weight: 2, color: "yellow" },
  { name: "normal", weight: 3, color: "CTA" },
  { name: "big", weight: 4, color: "pink" },
  { name: "giant", weight: 5, color: "danger" },
];

export const TaskWeightSelector: FC<Props> = ({
  weight: taskWeigth,
  onChange,
}) => {
  const { darkmode } = useContext(UiContext);
  if (!isInRange(Number(taskWeigth)))
    onChange(String(Number(taskWeigth) > maxWeight ? maxWeight : minWeight));

  const color =
    weightColors.find(({ weight }) => taskWeigth == weight)?.color ?? "gray";

  return (
    <select
      value={taskWeigth}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      style={{
        background: darkmode ? appColors[color][300] : appColors[color][200],
        borderColor: darkmode ? appColors[color][200] : appColors[color][400],
        outlineColor: darkmode ? appColors[color][200] : appColors[color][400],
        color: appColors[color][500],
      }}
      name="weight"
      className="rounded-md text-center hover:shadow-md transition-all  py-0 text-base md:text-md lg:text-lg"
    >
      {weightColors.map(({ color, weight, name }, idx) => (
        <option
          key={idx}
          style={{
            backgroundColor: appColors[color][200],
            color: appColors[color][500],
          }}
          value={weight}
        >
          {name}
        </option>
      ))}
    </select>
  );
};
