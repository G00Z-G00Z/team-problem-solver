import { AvailableColorNames } from '../../types/AppColors'

/**
 * This is how to add a job weight
 */
export interface JobWeight {
  name: string;
  weight: number;
  color: AvailableColorNames;
}

/**
 * This is the list of weights in the divide up work app
 */
export const weightColors: JobWeight[] = [
  { name: "tiny", weight: 1, color: "gray" },
  { name: "small", weight: 2, color: "yellow" },
  { name: "normal", weight: 3, color: "CTA" },
  { name: "big", weight: 4, color: "pink" },
  { name: "giant", weight: 5, color: "danger" },
];

/**
 * This is a hashMapWeight data
 */
export const hashMapWeightData: {
  [key: number]: JobWeight;
} = Object.assign(
  {},
  ...weightColors.map((val) => ({
    [val.weight]: val,
  }))
);
