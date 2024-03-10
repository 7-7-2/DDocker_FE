import { useState, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { inputNicknameAlertState } from '@/atoms/atoms';

export const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [isAlert, setIsAlert] = useRecoilState(inputNicknameAlertState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    {
      e.target.value && setIsAlert(false);
    }
  };

  return {
    value,
    setValue,
    onChange: handleChange,
    isAlert
  };
};
