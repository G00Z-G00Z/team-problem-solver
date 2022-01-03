import React, { FC, useContext } from 'react'
import { appColors } from '../types/AppColors'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { Team } from '../types/interfaces'

interface Props {
  team: Team | undefined;
}

export const TeamStatusBar: FC<Props> = ({ team }) => {
  if (!team)
    return (
      <div className="bg-gray-300 flex justify-evenly relative">
        Selecciona un equipo
      </div>
    );

  const { color, name } = team;

  return (
    <div
      style={{
        backgroundColor: appColors[color][100],
        color: appColors[color][500],
      }}
      className="bg-CTA-100 flex justify-evenly relative font-bold"
    >
      {name}
    </div>
  );
};
