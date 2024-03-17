export const validateNickname = (nickname: string) => {
  const regex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
  const spaceRegex = /\s/;
  const min = nickname.length >= 1;

  return regex.test(nickname) && !spaceRegex.test(nickname) && min;
};
