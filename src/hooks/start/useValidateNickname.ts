import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { validateNickname } from '@/utils/validateNickname';
import { CheckNicknameState, authState } from '@/atoms/atoms';

export const useValidateNickname = (value: string) => {
  const [isInsufficient, setIsInsufficient] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const { nickname } = useRecoilValue(authState);
  const resetIsapproval = useResetRecoilState(CheckNicknameState);
  const noneEdit = nickname === value;

  useEffect(() => {
    !noneEdit && setIsInvalid(!validateNickname(value));
    !noneEdit && setIsInsufficient(value.length <= 1);
    resetIsapproval();
  }, [value]);

  return { isInvalid, isInsufficient };
};
