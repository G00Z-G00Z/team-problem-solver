import { appColors } from '../../types/AppColors'
import { FC, useContext } from 'react'
import { hashMapWeightData, weightColors } from './interfaces'
import { UiContext } from '../../context/uiContext'

const allWeights = weightColors.map(({ weight }) => weight);

const maxWeight = Math.max(...allWeights);
const minWeight = Math.min(...allWeights);

const isValidWeight = (n: number) => !!hashMapWeightData[n];
interface Props {
  weight: number | string;
  onChange: (newWeight: string) => void;
}

export const TaskWeightSelector: FC<Props> = ({
  weight: taskWeigth,
  onChange,
}) => {
  const { darkmode } = useContext(UiContext);
  if (!isValidWeight(Number(taskWeigth)))
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
        background: darkmode ? appColors[color][200] : appColors[color][100],
        borderColor: darkmode ? appColors[color][500] : appColors[color][400],
        outlineColor: darkmode ? appColors[color][500] : appColors[color][400],
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
