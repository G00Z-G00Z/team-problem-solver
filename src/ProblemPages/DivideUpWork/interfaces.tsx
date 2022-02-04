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
  { name: "tiny", weight: 1, color: "teal" },
  { name: "small", weight: 2, color: "CTA" },
  { name: "normal", weight: 3, color: "yellow" },
  { name: "big", weight: 4, color: "danger" },
  { name: "giant", weight: 5, color: "purple" },
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
