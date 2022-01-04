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
        {teamList
          .sort((t1, t2) => {
            if (t1?.lastTimeUsed && t2?.lastTimeUsed)
              return t2.lastTimeUsed - t1.lastTimeUsed;

            if (t1.lastTimeUsed) return -1;
            if (t2.lastTimeUsed) return 1;

            return 0;
          })
          .map((t, idx) => (
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
        <img src="./assets/Goose-icon.png" alt="not found image" />
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
