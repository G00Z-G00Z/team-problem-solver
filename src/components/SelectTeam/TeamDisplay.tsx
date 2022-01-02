import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../data/dexieDatabase";
import appColors from "../../types/AppColors";
import { Team } from "../../types/interfaces";
import { ReactComponent as EyeIcon } from "../../assets/eye.svg";
import { getSpecificAppColor } from "../../utils/getSpecificAppColor";

// todo falta poner cuantos integrantes tiene el equipo
interface Props {
  team: Team;
}
export const TeamDisplay: FC<Props> = ({ team }) => {
  const { color, members, name, id } = team;

  const navigate = useNavigate();

  const teamContainer = useRef<HTMLDivElement | null>(null);
  const teamNameH1 = useRef<HTMLElement | null>(null);
  const eyeIcon = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (teamContainer.current) {
      teamContainer.current.style.borderColor = appColors[color][400];
    }
    if (teamNameH1.current) {
      teamNameH1.current.style.color = appColors[color][500];
      teamNameH1.current.style.backgroundColor = appColors[color][100];
    }
    if (eyeIcon.current) {
      eyeIcon.current.style.fill = appColors[color][400];
      eyeIcon.current.style.strokeWidth = "0px";
    }
  }, []);

  if (!id) return <></>;

  const handleEditing = () => {
    navigate(`/team/edit/${id}`);
  };

  return (
    <>
      <div
        className="border-dashed hover:border-solid transition-all ease-in border-2 grid grid-cols-4 grid-rows-2 pb-2 cursor-pointer"
        ref={teamContainer}
      >
        <header
          className="mb-2 flex flex-row px-4 py-2 col-span-full "
          ref={teamNameH1}
        >
          <h1
            className="w-full 
					text-2xl font-bold text-left font-serif
					 
					"
          >
            {name}
          </h1>
          <button
            className="hover:scale-105 transition-all"
            onClick={handleEditing}
          >
            <EyeIcon ref={eyeIcon} />
          </button>
        </header>
        <p className="truncate px-4 col-span-3 text-gray-700 text-sm">
          {members.map(({ name }) => name).join(", ")}
        </p>
      </div>
    </>
  );
};
