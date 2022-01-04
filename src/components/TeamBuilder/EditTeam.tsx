import getAvatarSVG from '../utils/avatarCreation'
import { appColors } from '../../types/AppColors'
import { AppColorSelector } from './AppColorSelector'
import { AvailableColorNames } from '../../types/AppColors'
import { db } from '../../data/dexieDatabase'
import { editTeamateReducer } from './teamBuilderReducer'
import { MemberBuilder } from './MemberBuilder'
import { Team } from '../../types/interfaces'
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditTeam = () => {
  const navigate = useNavigate(),
    { teamId = "new" } = useParams<{
      teamId: string;
    }>(),
    isNewTeam = teamId === "new",
    oldTeam = useRef<Team | null>(null),
    [color, setColor] = useState<AvailableColorNames>("gray"),
    [name, setName] = useState(""),
    [members, dispatch] = useReducer(editTeamateReducer, {}),
    cosa = useRef<HTMLElement | null>(null);

  // Use effect que graba y carga el equipo al principio
  useEffect(() => {
    if (!isNewTeam) {
      db.getTeam(teamId).then((team) => {
        if (team) {
          setName(team.name ?? "no name");
          setColor(team.color ?? "no color");
          oldTeam.current = team;
          dispatch({
            type: "Set team",
            payload: {
              members: team.members,
            },
          });
        }
      });
    }
  }, []);

  const handleChangingColor = (newColor: AvailableColorNames) =>
    setColor(newColor);

  const handleAdding = useCallback(() => {
    dispatch({
      type: "Add Teamate",
    });
  }, []);

  const handleDeleting = async () => {
    console.log("Estoy borrando el equiop con el ide de ", teamId);
    const seBorro = await db.deleteTeam(teamId);
    seBorro && console.log("Se pudo borrar!!");
    navigate("/team/select");
  };

  const handleSaving = async () => {
    if (savingButtonRef.current) savingButtonRef.current.disabled = true;

    let id: number;

    id = isNewTeam ? await db.createTeam() : oldTeam.current?.id ?? 0;

    await db.updateTeam(id, {
      name: name,
      color: color,
      // No permite miebros vacios
      members: Object.values(members)
        .filter(({ name }) => name)
        .sort((a, b) => (a.name < b.name ? -1 : 1)),
    });

    if (savingButtonRef.current) savingButtonRef.current.disabled = false;

    navigate("/team/select");
  };

  const savingButtonRef = useRef<HTMLButtonElement>(null);

  const shoudlSavingBeDisabled = !(
    name && Object.values(members).filter(({ name }) => name).length > 0
  );

  return (
    <div className="flex justify-center w-full h-full">
      {/* Team container */}
      <div
        className="border-dashed border-2 pb-2 max-w-screen-md w-[80vw] lg:w-[50vw]"
        style={{
          borderColor: appColors[color][400],
        }}
      >
        {/* Title */}
        <header
          className="mb-2 "
          style={{
            color: appColors[color][500],
            backgroundColor: appColors[color][100],
          }}
        >
          <input
            className="w-full 
					text-2xl font-bold text-left font-serif placeholder:italic bg-transparent py-1 px-3"
            placeholder="Nombre del equipo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </header>
        {/* Color selection */}
        <div className="my-3 flex flex-col gap-5">
          <h2
            style={{
              color: appColors[color][500],
            }}
            className="font-serif font-bold text-2xl text-center"
          >
            Team color
          </h2>
          <AppColorSelector value={color} onClick={handleChangingColor} />
        </div>

        {/* Team selection */}
        <div className="my-2 flex flex-col items-center px-5">
          <h2
            style={{
              color: appColors[color][500],
            }}
            className="font-serif font-bold text-2xl "
          >
            Teamates
          </h2>

          <ul className="w-full flex flex-row flex-wrap px-10 gap-2 mb-2 justify-evenly">
            {/* <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center px-10 gap-2 mb-2"> */}
            {Object.entries(members).map(([id, member]) => (
              <li className="max-w-[15ch] flex-shrink-1 " key={id}>
                <MemberBuilder
                  member={member}
                  teamColor={color}
                  handleDelete={() =>
                    dispatch({
                      type: "Delete Teamate",
                      payload: {
                        id,
                      },
                    })
                  }
                  handleUpdate={(updatedMember) => {
                    dispatch({
                      type: "Update Teamate",
                      payload: {
                        id,
                        updatedMember,
                      },
                    });
                  }}
                />
              </li>
            ))}
          </ul>

          <button
            className=" text-gray-100 rounded-md px-3 text-xl"
            style={{
              backgroundColor: appColors[color][300],
            }}
            onClick={handleAdding}
          >
            + New member
          </button>

          <div className="flex flex-wrap items-center justify-evenly mt-4 gap-5">
            <button
              ref={savingButtonRef}
              className="bg-CTA-400 text-gray-100 w-32 h-8 px-3 text-xl rounded-md disabled:opacity-75"
              onClick={handleSaving}
              disabled={shoudlSavingBeDisabled}
            >
              Save
            </button>
            {!isNewTeam && (
              <button
                className="text-gray-100 bg-danger-300 w-32 h-8 px-3 text-xl rounded-md"
                onClick={handleDeleting}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
