import React, { FC, useContext, useState } from 'react'
import { createTeamSeeds } from '../../seeds/teamSeeds'
import { db } from '../../data/dexieDatabase'
import { ReactComponent as SearchLogo } from '../../assets/search.svg'
import { SelectedTeamContext } from '../../context/SelectedTeamContext'
import { Team } from '../../types/interfaces'
import { TeamDisplay } from './TeamDisplay'
import { TeamList } from './TeamList'
import { useNavigate } from 'react-router-dom'

interface Props {
  teams: Team[];
}

export const SelectTeamPage: FC<Props> = React.memo(({ teams }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleNavigation = (id?: string) => {
    navigate(`/team/edit/${id ?? "new"}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="w-full text-5xl font-serif text-center font-bold ">
        Select a Team
      </h1>
      {/* Search bar */}
      <div className="relative p-0 max-w-screen-md  w-full">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-CTA-500 
					border-2 border-CTA-500 
					bg-CTA-100 w-full rounded-lg my-2 px-8 py-1 text-lg
					placeholder:italic placeholder:text-CTA-300"
        />
        <div className="absolute top-4 left-2">
          <SearchLogo className="stroke-CTA-500 stroke-0 fill-CTA-500" />
        </div>
      </div>

      <section className="max-w-screen-md  w-full">
        {/* Add new team btn */}
        <button
          className="text-gray-800 border-dashed border-2 border-gray-800 p-8 bg-gray-200 w-full text-2xl font-bold hover:bg-gray-300 focus:bg-red-50 hover:border-solid transition-all ease-in"
          onClick={(e) => handleNavigation()}
        >
          Add new team
        </button>
      </section>
      {/* Teams */}
      <section className="grid grid-cols-1 sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-3 w-full max-w-screen-md ">
        <TeamList teamList={teams} nameQuery={query} />
      </section>
    </div>
  );
});
