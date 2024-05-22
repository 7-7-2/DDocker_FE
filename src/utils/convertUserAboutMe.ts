export const convertUserAboutMe = (aboutMe: string | undefined | null) => {
  if (aboutMe === null) return undefined;
  return aboutMe;
};
