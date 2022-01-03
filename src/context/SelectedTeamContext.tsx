import { createContext } from 'react'
import { Team } from '../types/interfaces'

/**
 * Selected team context
 *
 * Takes the info of the team, and some utilities function to change it
 */
export const SelectedTeamContext = createContext<{
  selectedTeam?: Team;
  setTeam: (t: Team) => void;
  removeTeam: () => void;
}>({
  setTeam: (t) => {},
  removeTeam: () => {},
});
