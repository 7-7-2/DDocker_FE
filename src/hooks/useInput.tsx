import { useState, ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { inputNicknameAlertState, useInputState } from '@/atoms/atoms';

export const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [isAlert, setIsAlert] = useRecoilState(inputNicknameAlertState);
  const setInputState = useSetRecoilState(useInputState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInputState(e.target.value);
    {
      e.target.value && setIsAlert(false);
    }
  };

  return {
    value,
    onChange: handleChange,
    isAlert
  };
};
