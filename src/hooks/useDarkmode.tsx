import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

const localStorageDarkmodeName = "darkmode";

/**
 * Handles changing the darkmode in the app
 * @returns [darkmode, setDarkmode]
 */
export function useDarkmode(): [boolean, (m: boolean) => void] {
  const isDarkmodeSet =
    !(localStorageDarkmodeName in localStorage) &&
    window.window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [darkmode, setDarkmode] = useLocalStorage("darkmode", isDarkmodeSet);

  useEffect(() => {
    darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkmode]);

  return [!!darkmode, setDarkmode];
}
