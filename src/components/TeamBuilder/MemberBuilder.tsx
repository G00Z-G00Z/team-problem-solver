import React, {
  FC,
  useEffect,
  useRef,
  useState
  } from 'react'
import useForm from '../../hooks/useForm'
import { appColors, AvailableColorNames } from '../../types/AppColors'
import { InputWithLabel } from '../utils/InputWithLabel'
import { Member } from '../../types/interfaces'
import { ReactComponent as CloseIcon } from '../../assets/close.svg'

interface Props {
  member: Member;
  handleDelete: () => void;
  handleUpdate: (value: Member) => void;
  teamColor: AvailableColorNames;
}
export const MemberBuilder: FC<Props> = ({
  member,
  handleDelete,
  handleUpdate,

  teamColor = "gray",
}) => {
  const { name, color, onChange } = useForm({
    name: member.name,
    color: member.color,
  });

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // This updates the state every 200 seconds, instead of instant
  useEffect(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      handleUpdate({ ...member, name, color });
    }, 500);
  }, [name, color]);

  return (
    <div className="relative max-w-sm group hover:border-0 focus-visible:outline-danger-200">
      <input
        type="text"
        name="name"
        className="text-xl bg-transparent text-center  decoration-gray-200 
        dark:text-gray-200
        w-full p-1 transition-all focus-visible:outline-0"
        onChange={(e) => onChange(e.target.value, "name")}
        value={name}
      />

      <button
        onClick={handleDelete}
        className=" bg-danger-300 rounded-full h-3 w-3 flex justify-center items-center absolute top-0 right-0"
      >
        <CloseIcon className="fill-danger-100 stroke-1 h-3 w-3" />
      </button>
      {/* underline active*/}
      <div
        style={{
          backgroundColor: appColors[teamColor][300],
        }}
        className="absolute w-0 group-hover:w-full h-[2px]  bottom-0 left-0 transition-all rounded-sm "
      ></div>
      <div className="absolute group-hover:w-0 w-full h-[2px] bg-gray-200 bottom-0 left-0  "></div>
    </div>
  );
};
