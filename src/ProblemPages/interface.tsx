import { FC } from 'react'
import { Team } from '../types/interfaces'

interface Props {
  team?: Team;
}
/**
 * Type for making a page
 */
export type ProblemPage = FC<Props>;

/**
 * Problem page list
 */
export interface ProblemPageInfo {
  imageUrl: string;
  Component: ProblemPage;
  route: string;
  description: string;
  name: string;
}
