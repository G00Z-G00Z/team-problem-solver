import React, { useRef } from 'react'
import { db } from '../data/dexieDatabase'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const deleteButton = useRef<HTMLButtonElement>(null);

  const handleDeleting = async () => {
    if (deleteButton.current) deleteButton.current.disabled = true;

    await db.deleteAllTeams();

    if (deleteButton.current) deleteButton.current.disabled = false;
  };

  return (
    <>
      <h1 className="text-3xl font-serif mb-2 text-center">Profile</h1>

      <div
        className="
	 	p-5 
	  	border-2 border-danger-400 border-dashed bg-danger-100
		flex justify-center items-center flex-col"
      >
        <h2 className="text-danger-400 text-3xl mb-3">Danger zone</h2>
        <button
          className="text-gray-100 bg-danger-300 h-8 px-3 text-xl rounded-md hover:bg-danger-400 transition-all shadow-md"
          onClick={handleDeleting}
        >
          Delete All Teams
        </button>
      </div>
    </>
  );
};
