import React, { useContext } from 'react'
import { db } from '../data/dexieDatabase'
import { Link, useNavigate } from 'react-router-dom'
import { ProblemList } from '../ProblemPages/ProblemList'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { Team } from '../types/interfaces'

export const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-serif mb-2 text-center">
        What's Your Problem ?
      </h1>
      <section className="grid grid-cols-1 sm:grid-col-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center">
        {ProblemList.map(({ route, imageUrl, description, name }, idx) => (
          <Link
            key={idx}
            to={`/${route}`}
            className="flex flex-col justify-center items-stretch gap-2"
          >
            <img src={imageUrl} alt={`${description}`} />

            <p className="text-center font-bold text-CTA-400">{name}</p>
          </Link>
        ))}
      </section>
    </>
  );
};
