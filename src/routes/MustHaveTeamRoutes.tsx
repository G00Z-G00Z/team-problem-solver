import React from 'react'
import { Navigate } from 'react-router-dom'
import { Team } from '../types/interfaces'

/**
 * You put an element inside, and it can block whether or not is rendered
 * <MustHaveTeamRoutes team={selectedTeam}>
      <Page />
    </MustHaveTeamRoutes>
 * @param {children, team}
 * @returns JSX.Element
 */
export const MustHaveTeamRoutes = ({
  children,
  team,
}: {
  children: JSX.Element;
  team: Team | undefined;
}) => {
  if (!team) return <Navigate to="/team/select" />;

  return children;
};
