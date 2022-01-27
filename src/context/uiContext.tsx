import { createContext } from 'react'

/**
 * Ui context
 *
 * Takes the ui context to all the app
 */
export const UiContext = createContext<{
  darkmode: boolean;
  setDarkmode: (m: boolean) => void;
}>({
  setDarkmode: (m) => {},
  darkmode: false,
});
