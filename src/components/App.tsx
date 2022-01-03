import React, { useEffect, useRef } from 'react'
import { createTeamSeeds } from '../seeds/teamSeeds'
import { db } from '../data/dexieDatabase'
import { EditTeam } from './TeamBuilder/EditTeam'
import { Help } from './HelpPage'
import { Home } from './HomePage'
import { NavBar } from './NavBar'
import {
  Outlet,
  Route,
  Routes,
  useNavigate
  } from 'react-router-dom'
import { Profile } from './ProfilePage'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { SelectTeamPage } from './SelectTeam/SelectTeamPage'
import { Team } from '../types/interfaces'
import { TeamStatusBar } from './TeamStatusBar'
import { useLiveQuery } from 'dexie-react-hooks'
import { useLocalStorage, useSessionStorage } from '../hooks/useLocalStorage'

export default function App() {
  const teams = useLiveQuery(async () => {
    return await db.getAllTeams();
  });

  const [selectedTeam, setTeam, removeTeam] = useSessionStorage<
    Team | undefined
  >("selected-team", undefined);

  const navigate = useNavigate();

  useEffect(() => {
    createTeamSeeds(db, {
      teams: 10,
      maxPersonsPerTeam: 10,
    });
    return () => {
      db.deleteAllTeams();
    };
  }, []);

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedTeam: selectedTeam ?? undefined,
        setTeam,
        removeTeam,
      }}
    >
      <div className="bg-gray-100 font-sans h-full">
        {/* Nav bar */}
        <NavBar />
        {/* Status */}
        <section className="fixed top-0 w-full z-10">
          <TeamStatusBar team={selectedTeam} />
          {/* icon */}
          <img
            className="absolute w-20 h-20 top-0 left-0 
					-translate-x-6 -translate-y-6
					cursor-pointer"
            src="./assets/Goose-icon.png"
            alt="icono"
            onClick={(e) => navigate("/")}
          />
        </section>
        {/* Main content */}
        <div className="py-10 px-[10vw] md:px-[15vw]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/team" element={<Outlet />}>
              <Route
                path="select"
                element={<SelectTeamPage teams={teams ?? []} />}
              />
              <Route path="edit" element={<Outlet />}>
                <Route path=":teamId" element={<EditTeam />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </SelectedTeamContext.Provider>
  );
}
