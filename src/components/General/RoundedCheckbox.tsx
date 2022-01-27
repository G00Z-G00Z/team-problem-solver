import React, {
  FC,
  useCallback,
  useContext,
  useMemo
  } from 'react'
import { appColors } from '../../types/AppColors'
import { ReactComponent as SelectedIcon } from '../../assets/done.svg'
import { UiContext } from '../../context/uiContext'

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
  const { darkmode } = useContext(UiContext);

  const style = useMemo(() => {
    if (disabled)
      return {
        backgroundColor: darkmode ? appColors.gray[100] : appColors.gray[200],
        border: `2px solid ${appColors.gray[300]}`,
      };

    if (checked) return undefined;

    return {
      backgroundColor: darkmode ? appColors.CTA[100] : appColors.CTA[100],
      border: `2px solid ${appColors.CTA[400]}`,
    };
  }, [disabled, checked]);

  return (
    <>
      <div
        className="h-5 w-5 
        rounded-md  transition-all 
        flex justify-center items-center
        fill-CTA-500
        dark:fill-CTA-400  
        "
        style={style}
        onClick={onChange}
      >
        {checked && (
          <SelectedIcon className="fill-inherit stroke-1 scale-125" />
        )}

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
