import React, { FC, useCallback, useMemo } from 'react'
import { appColors } from '../../types/AppColors'

interface Props {
  checked: boolean;
  name?: string;
  onChange: () => void;
  disabled?: boolean;
}

export const RoundedCheckbox: FC<Props> = ({
  checked,
  name = "checkbox",
  onChange,
  disabled = false,
}) => {
  const style = useMemo(() => {
    if (disabled)
      return {
        backgroundColor: appColors.gray[300],
        borderColor: "",
      };

    return {
      backgroundColor: checked ? appColors["CTA"][300] : "",
      borderColor: !checked ? appColors["CTA"][400] : "transparent",
    };
  }, [disabled, checked]);

  return (
    <>
      <div
        className={`h-5 w-5 
        rounded-full border-4 border-double transition-all
        `}
        style={style}
        onClick={onChange}
      >
        <input
          className="hidden"
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </>
  );
};
