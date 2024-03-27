import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 700) => {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const fn = () => {
      setDebounceVal(value);
    };
    const timeoutId = setTimeout(fn, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debounceVal;
};
