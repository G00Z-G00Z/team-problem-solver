const gridy = require("gridy-avatars");

export default function getAvatarSVG(seed: string, width: number) {
  console.log(gridy(seed, width));
}
