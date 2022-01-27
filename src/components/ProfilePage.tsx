import { db } from '../data/dexieDatabase'
import { RoundedCheckbox } from './General/RoundedCheckbox'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { UiContext } from '../context/uiContext'
import { useContext, useRef } from 'react'

export const Profile = () => {
  const deleteButton = useRef<HTMLButtonElement>(null);

  const { removeTeam } = useContext(SelectedTeamContext);

  const { darkmode, setDarkmode } = useContext(UiContext);

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

  const handleSettingDarkmode = () => {
    setDarkmode(!darkmode);
  };

  return (
    <div className="flex flex-col  max-w-lg mx-auto gap-4">
      <h1 className="text-3xl font-serif mb-2 text-center dark:text-gray-200 transition-all">
        Profile
      </h1>

      {/* View Options*/}
      <div
        className="
          border-2 border-CTA-400 dark:border-CTA-200 border-dashed 
          flex justify-center items-center flex-col
          transition-all
          "
      >
        <h2
          className="text-CTA-400 text-xl mb-3 bg-CTA-100 w-full text-center py-2
          dark:bg-CTA-200
          dark:text-CTA-500
          font-semibold
          transition-all"
        >
          View Settings
        </h2>
        <section className="p-4 flex flex-col gap-4 dark:text-gray-200 transition-all">
          {/* Darkmode toggle */}
          <div className="flex flex-row gap-1 items-center">
            <RoundedCheckbox
              checked={darkmode}
              onChange={handleSettingDarkmode}
            />
            <label className="text-gray-800 dark:text-gray-200 text-lg transition-all">
              Darkmode
            </label>
          </div>
        </section>
      </div>
      {/* Danger Options*/}
      <div
        className="
          border-2 border-danger-400 border-dashed 
          flex justify-center items-center flex-col
          dark:border-danger-200
          transition-all"
      >
        <h2
          className="text-danger-400 text-xl mb-3 bg-danger-100 w-full text-center py-2
        dark:bg-danger-200
        dark:text-danger-500
        transition-all
        font-semibold"
        >
          Danger zone
        </h2>
        <section className="p-4 flex flex-col gap-4 dark:text-gray-200 transition-all">
          <p className="">
            Here are some options that could potentially erase data{" "}
            <strong className="text-danger-400 dark:text-danger-200 font-semibold transition-all">
              permanently
            </strong>
            .{" "}
          </p>
          <button
            className="text-gray-100 bg-danger-300 h-8 px-3 text-xl rounded-md hover:bg-danger-400 transition-all shadow-md disabled:bg-gray-500
            dark:bg-danger-200
            transition-all"
            onClick={handleDeleting}
          >
            Delete All Teams
          </button>
        </section>
      </div>
      <div>
        <img
          src={process.env.PUBLIC_URL + "/assets/WIP.png"}
          alt="configuration work in progress"
          className="object-fill rounded-3xl shadow-sm mb-2"
        />
        <h2 className="text-xl mb-2 text-center text-gray-500">
          Sorry!! We are working on more settings to better your experience
        </h2>

        <div></div>
      </div>
    </div>
  );
};
