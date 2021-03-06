import React, { FC, useCallback, useContext } from 'react'
import { UiContext } from '../../context/uiContext'
import {
  appColors,
  AvailableColorIntensities,
  AvailableColorNames,
} from "../../types/AppColors";

interface Props {
  value: AvailableColorNames;
  onClick: (c: AvailableColorNames) => void;
  intensity?: AvailableColorIntensities;
}

export const AppColorSelector: FC<Props> = ({
  value,
  intensity = undefined,
  onClick,
}) => {
  const { darkmode } = useContext(UiContext);

  intensity = intensity ?? darkmode ? 200 : (300 as AvailableColorIntensities);

  // Function to gell all colors intensities
  const getAllColors = useCallback(() => {
    const values: [AvailableColorNames, string][] = [];
    for (const colorName in appColors) {
      //@ts-ignore
      values.push([
        //@ts-ignore
        colorName,
        //@ts-ignore
        appColors[colorName][intensity],
      ]);
    }
    return values;
  }, [intensity]);

  const colorValues = getAllColors();

  return (
    <div className="flex gap-4 flex-wrap px-4 justify-items-center items-center justify-center max-w-lg ">
      {colorValues.map(([name, valueStr], idx) => {
        return (
          <button
            name="color"
            key={idx}
            className={`h-[20px] w-[20px] rounded-full outline-offset-4 self-center
            ${name === value ? "outline outline-2" : ""}
            hover:outline outline-2 outline-gray-700
            `}
            style={{
              backgroundColor: valueStr,
              borderColor: valueStr,
            }}
            onClick={(e) => onClick(name)}
          ></button>
        );
      })}
    </div>
  );
};
