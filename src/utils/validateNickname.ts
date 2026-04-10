export const validateNickname = (nickname: string) => {
  const regex = /^[a-zA-Z가-힣]+$/;
  const spaceRegex = /\s/;
  return regex.test(nickname) && !spaceRegex.test(nickname);
};
