import React, { useContext, useRef } from 'react'
import { db } from '../data/dexieDatabase'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const deleteButton = useRef<HTMLButtonElement>(null);

  const { removeTeam } = useContext(SelectedTeamContext);

  const handleDeleting = async () => {
    if (deleteButton.current) deleteButton.current.disabled = true;

    const deletions: Promise<any>[] = [
      (async () => {
        removeTeam();
      })(),
      db.deleteAllTeams(),
    ];

    await Promise.all(deletions);

    if (deleteButton.current) deleteButton.current.disabled = false;
  };

  return (
    <div className="flex flex-col  max-w-lg mx-auto">
      <h1 className="text-3xl font-serif mb-2 text-center">Profile</h1>
      <div>
        <img
          src={process.env.PUBLIC_URL + "/assets/WIP.png"}
          alt="configuration work in progress"
          className="object-fill rounded-3xl shadow-sm mb-2"
        />
        <h2 className="text-xl mb-2 text-center text-gray-500">
          Sorry!! We are working on that...
        </h2>

        <div></div>
      </div>
      <div
        className="
	 	
	  	border-2 border-danger-400 border-dashed 
		flex justify-center items-center flex-col"
      >
        <h2 className="text-danger-400 text-xl mb-3 bg-danger-100 w-full text-center py-2">
          Danger zone
        </h2>
        <section className="p-4 flex flex-col gap-4">
          <p>
            Here are some options that could potentially erase data{" "}
            <strong className="text-danger-400">permanently</strong>.{" "}
          </p>
          <button
            className="text-gray-100 bg-danger-300 h-8 px-3 text-xl rounded-md hover:bg-danger-400 transition-all shadow-md "
            onClick={handleDeleting}
          >
            Delete All Teams
          </button>
        </section>
      </div>
    </div>
  );
};
