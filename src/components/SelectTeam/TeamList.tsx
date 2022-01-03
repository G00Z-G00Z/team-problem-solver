import React, { FC, useContext } from 'react'
import { SelectedTeamContext } from '../../context/SelectedTeamContext'
import { Team } from '../../types/interfaces'
import { TeamDisplay } from './TeamDisplay'

interface Props {
  nameQuery: string;
  teamList: Team[];
}

export const TeamList: FC<Props> = ({ nameQuery, teamList }) => {
  if (!nameQuery)
    return (
      <>
        {teamList.map((t, idx) => (
          <TeamDisplay team={t} key={idx} />
        ))}
      </>
    );

  const parsedQuery = nameQuery.toLocaleLowerCase() as string;

  const filteredTeam = teamList.filter(({ name }) =>
    name.toLowerCase().includes(parsedQuery)
  );

  if (filteredTeam.length === 0)
    return (
      <>
        <h1>No se encontro ningun equipo :(</h1>
      </>
    );

  return (
    <>
      {teamList.map((t, idx) =>
        t.name.toLowerCase().startsWith(parsedQuery) ? (
          <TeamDisplay team={t} key={idx} />
        ) : null
      )}
    </>
  );
};
