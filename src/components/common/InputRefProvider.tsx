import { InputContext } from '@/context/inputContext';
import { PropsWithChildren, useRef } from 'react';

const InputRefProvider = ({ children }: PropsWithChildren) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <InputContext.Provider value={{ inputRef }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputRefProvider;
