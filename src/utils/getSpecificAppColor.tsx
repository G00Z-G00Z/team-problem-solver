import appColors from "../types/AppColors";
import { AvailableColorNames } from "../types/interfaces";

/**
 * Gets the colors in the theme of the app
 * @param color Available Color Names
 * @returns Color Pallette
 */
export function getSpecificAppColor(color: AvailableColorNames) {
	return appColors[color] ?? appColors.CTA;
}
