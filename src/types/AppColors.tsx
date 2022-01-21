// You can get them form tailwind.config.js
export const appColors = {
  CTA: {
    500: " hsla(162, 95.8%, 18.6%, 1)",
    400: " hsla(163, 79.4%, 32.4%, 1)",
    300: " hsla(163, 81.7%, 45.1%, 1)",
    200: " hsla(163, 70.3%, 51.2%, 1)",
    100: " hsla(163, 80.3%, 88%, 1)",
  },
  teal: {
    500: "hsla(184, 95.8%, 18.6%, 1)",
    400: "hsla(184, 79.4%, 32.4%, 1)",
    300: "hsla(184, 81.7%, 45.1%, 1)",
    200: "hsla(184, 91.8%, 61.6%, 1)",
    100: "hsla(184, 80.3%, 88%, 1)",
  },
  purple: {
    500: " hsla(292, 95.8%, 18.6%, 1)",
    400: " hsla(292, 79.4%, 32.4%, 1)",
    300: " hsla(292, 81.7%, 45.1%, 1)",
    200: " hsla(292, 91.8%, 61.6%, 1)",
    100: " hsla(291, 80.3%, 88%, 1)",
  },
  yellow: {
    500: " hsla(50, 95.8%, 18.6%, 1) ",
    400: " hsla(50, 79.4%, 32.4%, 1)",
    300: " hsla(50, 81.7%, 45.1%, 1)",
    200: " hsla(50, 91.8%, 61.6%, 1)",
    100: " hsla(50, 80.3%, 88%, 1)",
  },
  pink: {
    500: " hsla(331, 95.8%, 18.6%, 1)",
    400: " hsla(331, 79.4%, 32.4%, 1)",
    300: " hsla(331, 81.7%, 45.1%, 1)",
    200: " hsla(331, 91.8%, 61.6%, 1)",
    100: " hsla(331, 80.3%, 88%, 1)",
  },
  danger: {
    500: " hsla(352, 95.8%, 18.6%, 1)",
    400: " hsla(352, 79.4%, 32.4%, 1)",
    300: " hsla(352, 81.7%, 45.1%, 1)",
    200: " hsla(352, 91.8%, 61.6%, 1)",
    100: " hsla(351, 80.3%, 88%, 1)",
  },
  ocean: {
    500: "hsla(227, 95.8%, 18.6%, 1)",
    400: "hsla(227, 79.4%, 32.4%, 1)",
    300: "hsla(227, 81.7%, 45.1%, 1)",
    200: "hsla(227, 91.8%, 61.6%, 1)",
    100: "hsla(227, 80.3%, 88%, 1)",
  },
  orange: {
    500: "hsla(32, 95.8%, 18.6%, 1)",
    400: "hsla(32, 79.4%, 32.4%, 1)",
    300: "hsla(32, 81.7%, 45.1%, 1)",
    200: "hsla(32, 91.8%, 61.6%, 1)",
    100: "hsla(32, 80.3%, 88%, 1)",
  },
  gray: {
    500: "hsla(0, 0%, 10.2%, 1)",
    400: "hsla(0, 0%, 30.2%, 1)",
    300: "hsla(0, 0%, 50.2%, 1)",
    200: "hsla(0, 0%, 69.8%, 1)",
    100: "hsla(0, 0%, 89.8%, 1)",
  },
};
export const appColorNamesInArray = Object.keys(appColors);
export type AvailableColorNames = keyof typeof appColors;
export type AvailableColorIntensities = keyof typeof appColors["CTA"];

type AppColor = {
  [Property in AvailableColorNames]: {
    [Property in AvailableColorIntensities]: string;
  };
};
