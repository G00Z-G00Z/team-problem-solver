export default function getRandomAvatarSVGUrl() {
  const randomNumber = Math.ceil(Math.random() * 1000 + 1);
  const url = `https://avatars.dicebear.com/api/gridy/${randomNumber}.svg`;
  return url;
}
