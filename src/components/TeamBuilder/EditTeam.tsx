import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputWithLabel } from "../utils/InputWithLabel";
import { Team } from "../../types/interfaces";
import { MemberBuilder } from "./MemberBuilder";
import { db } from "../../data/dexieDatabase";
import { editTeamateReducer } from "./teamBuilderReducer";
import appColors from "../../types/AppColors";
import { AvailableColorNames } from "../../types/AppColors";
import useAppColorRefs from "../../hooks/useAppColorRefs";

export const EditTeam = () => {
  const navigate = useNavigate();

  const { teamId = "new" } = useParams<{
    teamId: string;
  }>();

  const isNewTeam = teamId === "new";

  const oldTeam = useRef<Team | null>(null);

  const [colorr, setColorr] = useState<AvailableColorNames>("gray");
  const [namee, setNamee] = useState("");

  const [members, dispatch] = useReducer(editTeamateReducer, {});

  const cosa = useRef<HTMLElement | null>(null);

  // Use effect que graba y carga el equipo al principio
  useEffect(() => {
    if (!isNewTeam) {
      db.getTeam(teamId).then((team) => {
        if (team) {
          setNamee(team.name ?? "no name");
          setColorr(team.color ?? "no color");
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

  const savingButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="border-dashed hover:border-solid transition-all ease-in border-2 grid grid-cols-4 grid-rows-2 pb-2 cursor-pointer">
        <header
          className="mb-2 flex flex-row px-4 py-2 col-span-full "
          ref={cosa}
        >
          <input
            className="w-full 
					text-2xl font-bold text-left font-serif placeholder:italic bg-transparent"
            placeholder="Nombre del equipo"
          />

          <button className="hover:scale-105 transition-all"></button>
        </header>
        <p className="truncate px-4 col-span-3 text-gray-700 text-sm"></p>
      </div>
      <h2>Voy a editar el equipo con el id de: {teamId}</h2>
      <div>Este es el equipo: </div>
      <div>
        <pre>{JSON.stringify(oldTeam.current)}</pre>
      </div>
      <form action="">
        <InputWithLabel
          name="color"
          text="Color: "
          type={"text"}
          onChange={(value) => {
            setColorr(value as AvailableColorNames);
          }}
          value={colorr}
        />
        <InputWithLabel
          name="name"
          text="Name: "
          type={"text"}
          onChange={(value) => {
            setNamee(value);
          }}
          value={namee}
        />
      </form>
      <div>
        <h2>Members</h2>
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
          onClick={async () => {
            if (savingButtonRef.current)
              savingButtonRef.current.disabled = true;

            let id: number;

            id = isNewTeam ? await db.createTeam() : oldTeam.current?.id ?? 0;

            await db.updateTeam(id, {
              name: namee,
              color: colorr,
              members: Object.values(members),
            });

            if (savingButtonRef.current)
              savingButtonRef.current.disabled = false;

            navigate("/team/select");
          }}
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
    </>
  );
};
