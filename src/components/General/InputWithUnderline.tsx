import React, { FC, useContext } from 'react'
import { appColors, AvailableColorNames } from '../../types/AppColors'
import { UiContext } from '../../context/uiContext'

interface Props {
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: { key: string }) => void;
  color?: AvailableColorNames;
  ref?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
}

export const InputWithUnderline: FC<Props> = ({
  value,
  onChange,
  onKeyDown,
  color = "gray",
  placeholder = "",
}) => {
  const { darkmode } = useContext(UiContext);

  return (
    <div
      className="relative group 
      hover:border-0   
      h-10 
      w-full max-w-md"
    >
      <input
        type="text"
        name="name"
        autoComplete="off"
        placeholder={placeholder}
        className="
             text-base md:text-md lg:text-lg  text-center  
             bg-transparent
              decoration-gray-200 p-1 transition-all focus-visible:outline-0 
              absolute top-1/2 left-1/2 transform -translate-x-1/2 
              -translate-y-1/2
              w-fit"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onKeyDown={onKeyDown}
      />

      {/* underline active*/}
      <div
        style={{
          backgroundColor: darkmode
            ? appColors[color][200]
            : appColors[color][300],
        }}
        className="absolute w-0 group-hover:w-full h-[2px]  bottom-0 left-0 transition-all rounded-sm "
      ></div>
      <div className="absolute group-hover:w-0 w-full h-[2px] bg-gray-200 bottom-0 left-0  "></div>
    </div>
  );
};
