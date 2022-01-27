import React, { FC, useContext } from 'react'
import { appColors } from '../types/AppColors'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { Team } from '../types/interfaces'
import { UiContext } from '../context/uiContext'

interface Props {
  team: Team | undefined;
}

export const TeamStatusBar: FC<Props> = ({ team }) => {
  const { darkmode } = useContext(UiContext);

  if (!team)
    return (
      <div className="bg-gray-300 flex justify-evenly relative dark:bg-gray-700 dark:text-gray-200">
        Selecciona un equipo
      </div>
    );

  const { color, name } = team;

  return (
    <div
      style={{
        backgroundColor: darkmode
          ? appColors[color][200]
          : appColors[color][100],
        color: appColors[color][500],
      }}
      className="flex justify-evenly relative font-bold"
    >
      {name}
    </div>
  );
};
