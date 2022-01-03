import { createContext } from 'react'
import { Team } from '../types/interfaces'

export const SelectedTeamContext = createContext<Team | null>(null);
