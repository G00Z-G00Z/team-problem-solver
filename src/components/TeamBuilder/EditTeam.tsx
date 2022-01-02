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

  getAvatarSVG("ohla", 10);

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
      members: Object.values(members),
    });

    if (savingButtonRef.current) savingButtonRef.current.disabled = false;

    navigate("/team/select");
  };

  const savingButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Team container */}
      <div
        className="border-dashed border-2 pb-2 "
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
					text-2xl font-bold text-left font-serif placeholder:italic bg-transparent"
            placeholder="Nombre del equipo"
          />
        </header>
        <div className="col-span-full">
          <h2 className="font-serif font-bold text-2xl">Team color</h2>
          <AppColorSelector value={color} onClick={handleChangingColor} />
        </div>
        <div>
          <h2 className="font-serif font-bold text-2xl">Teamates</h2>
          <button className="bg-CTA-400 text-gray-100" onClick={handleAdding}>
            Add a new Teamate
          </button>
          <ul>
            {Object.entries(members).map(([id, member]) => (
              <li key={id}>
                <MemberBuilder
                  member={member}
                  id={id}
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
            ref={savingButtonRef}
            className="bg-CTA-400 text-gray-100"
            onClick={handleSaving}
          >
            Save team
          </button>
          {!isNewTeam && (
            <button
              className="text-gray-100 bg-danger-300"
              onClick={handleDeleting}
            >
              Borrar equipo
            </button>
          )}
        </div>
      </div>
    </>
  );
};
