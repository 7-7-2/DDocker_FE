export const convertUserAboutMe = (aboutMe: string | undefined) => {
  if (aboutMe === null) return undefined;
  return aboutMe;
};
