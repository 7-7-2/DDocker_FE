import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState
} from 'recoil';
import { validateNickname } from '@/utils/validateNickname';
import { CheckNicknameState, authState } from '@/atoms/atoms';

export const useValidateNickname = (
  value: string,
  setIsapproval: SetterOrUpdater<boolean | null>,
  initValue?: string | undefined
) => {
  const [isInsufficient, setIsInsufficient] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [userInit, setUserInit] = useRecoilState(authState);
  const resetIsapproval = useResetRecoilState(CheckNicknameState);
  const noneEdit = initValue && (initValue === value || value.length === 0);
  const setNickname = () => {
    const nickname = noneEdit ? '' : value;
    setUserInit({ ...userInit, nickname: nickname });
  };

  useEffect(() => {
    userInit.nickname !== value && resetIsapproval();
    noneEdit ? setIsapproval(true) : resetIsapproval();
    !noneEdit && setIsInvalid(!validateNickname(value));
    !noneEdit && setIsInsufficient(value.length <= 1);
  }, [value]);

  return { isInvalid, isInsufficient, noneEdit, setNickname };
};
