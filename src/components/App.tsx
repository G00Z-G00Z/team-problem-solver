import React, { useCallback, useEffect, useRef } from 'react'
import { createTeamSeeds } from '../seeds/teamSeeds'
import { db } from '../data/dexieDatabase'
import { EditTeam } from './TeamBuilder/EditTeam'
import { Help } from './HelpPage'
import { Home } from './HomePage'
import { MustHaveTeamRoutes } from '../routes/MustHaveTeamRoutes'
import { NavBar } from './NavBar'
import {
  Outlet,
  Route,
  Routes,
  useNavigate
  } from 'react-router-dom'
import { ProblemList } from '../ProblemPages/ProblemList'
import { Profile } from './ProfilePage'
import { SelectedTeamContext } from '../context/SelectedTeamContext'
import { SelectTeamPage } from './SelectTeam/SelectTeamPage'
import { Team } from '../types/interfaces'
import { TeamStatusBar } from './TeamStatusBar'
import { UiContext } from '../context/uiContext'
import { useDarkmode } from '../hooks/useDarkmode'
import { useLiveQuery } from 'dexie-react-hooks'
import { useLocalStorage, useSessionStorage } from '../hooks/useLocalStorage'

export default function App() {
  const teams = useLiveQuery(async () => {
    return await db.getAllTeams();
  });

  const [selectedTeam, setTeam, removeTeam] = useSessionStorage<
    Team | undefined
  >("selected-team", undefined);

  const [darkmode, setDarkmode] = useDarkmode();

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedTeam: selectedTeam ?? undefined,
        setTeam,
        removeTeam,
      }}
    >
      <UiContext.Provider
        value={{
          darkmode: !!darkmode,
          setDarkmode,
        }}
      >
        <div className="bg-gray-100 font-sans min-h-screen dark:bg-gray-900 transition-all">
          {/* Nav bar */}
          <NavBar />
          {/* Status */}
          <section className="fixed top-0 w-full z-10">
            <TeamStatusBar team={selectedTeam} />
          </section>
          {/* Main content */}
          <div className="py-20 md:py-14 px-[10vw] md:px-[15vw]">
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
              {ProblemList.map((info, idx) => {
                const { route, Component: Page } = info;
                return (
                  <Route
                    path={`/${route}`}
                    key={idx}
                    element={
                      <MustHaveTeamRoutes team={selectedTeam}>
                        {/* @ts-ignore */}
                        <Page team={selectedTeam} />
                      </MustHaveTeamRoutes>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </div>
      </UiContext.Provider>
    </SelectedTeamContext.Provider>
  );
}
