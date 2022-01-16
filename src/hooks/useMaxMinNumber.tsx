import { useRef, useState } from 'react'

type StringOrNumber = number | string;

/**
 * Sets a number that can only be in the range of:
 *
 * min <= x < max
 * @param min Min number
 * @param max Max number
 * @returns {number, increase(), decrease()}
 */
export function useMaxMinNumber(min: number, max: number) {
  const [number, setNumber] = useState(min);

  const isInRangeFunction = (n: number) => {
    return min <= n && n < max;
  };

  const increase = (n: number = 1) => {
    const r = n + number;
    setNumber(isInRangeFunction(r) ? r : number);
  };
  const decrease = (n: number = 1) => {
    const r = number - n;
    setNumber(isInRangeFunction(r) ? r : number);
  };

  return {
    number,
    increase,
    decrease,
  };
}
