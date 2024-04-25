import { useState, ChangeEvent, useEffect } from 'react';

export const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    setValue,
    onChange: handleChange
  };
};
