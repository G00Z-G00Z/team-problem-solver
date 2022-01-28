import React, {
  FC,
  useContext,
  useEffect,
  useRef
  } from 'react'
import { appColors } from '../../types/AppColors'
import { db } from '../../data/dexieDatabase'
import { getSpecificAppColor } from '../../utils/getSpecificAppColor'
import { ReactComponent as EyeIcon } from '../../assets/eye.svg'
import { SelectedTeamContext } from '../../context/SelectedTeamContext'
import { Team } from '../../types/interfaces'
import { UiContext } from '../../context/uiContext'
import { useNavigate } from 'react-router-dom'

// todo falta poner cuantos integrantes tiene el equipo
interface Props {
  team: Team;
}
export const TeamDisplay: FC<Props> = ({ team }) => {
  const { setTeam } = useContext(SelectedTeamContext);

  const { darkmode } = useContext(UiContext);

  const { color, members, name, id } = team;

  const navigate = useNavigate();

  if (!id) return <></>;

  const handleEditing = () => {
    navigate(`/team/edit/${id}`);
  };

  return (
    <>
      <div
        className="border-dashed hover:border-solid transition-all ease-in border-2 grid grid-cols-4 grid-rows-2 pb-2 cursor-pointer"
        style={{
          borderColor: darkmode ? appColors[color][200] : appColors[color][400],
        }}
        onClick={(e) => {
          db.markTeamAsUsedNow(team.id ?? 1);
          setTeam(team);
          navigate("/");
        }}
      >
        <header
          className="mb-2 flex flex-row px-4 py-2 col-span-full "
          style={{
            color: appColors[color][500],
            backgroundColor: darkmode
              ? appColors[color][200]
              : appColors[color][100],
          }}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEditing();
            }}
          >
            <EyeIcon
              className="stroke-1"
              style={{
                fill: appColors[color][400],
              }}
            />
          </button>
        </header>
        <p className="truncate px-4 col-span-3 text-gray-700 text-sm dark:text-gray-400">
          {members.map(({ name }) => name).join(", ")}
        </p>
      </div>
    </>
  );
};
