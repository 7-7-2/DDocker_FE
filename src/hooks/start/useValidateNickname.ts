import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { validateNickname } from '@/utils/validateNickname';
import { CheckNicknameState, authState } from '@/atoms/atoms';

function useValidateNickname(value: string) {
  const [isValidate, setIsValidate] = useState(false);
  const [userInit, setUserInit] = useRecoilState(authState);
  const resetIsapproval = useResetRecoilState(CheckNicknameState);

  useEffect(() => {
    setIsValidate(validateNickname(value));
    setUserInit({ ...userInit, nickname: '' });
    resetIsapproval();
  }, [value]);

  return isValidate;
}

export default useValidateNickname;
