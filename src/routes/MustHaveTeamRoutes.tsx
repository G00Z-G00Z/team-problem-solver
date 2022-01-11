import { Navigate, Route, RouteProps } from 'react-router'
import { Team } from '../types/interfaces'
// https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4

export type ProtectedRouteProps = {
  team: Team | undefined;
  noTeamPath: string;
} & RouteProps;

/**
 * Here you can put routes that must have teams
 * @param ProtectedRouteProps
 * @returns React.FC
 */
export default function MustHaveTeamRoutes({
  team: isAuthenticated,
  noTeamPath: authenticationPath,
  ...routeProps
}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
