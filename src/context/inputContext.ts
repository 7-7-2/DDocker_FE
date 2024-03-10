import { createContext } from 'react';

type InputRefState = {
  inputRef: React.RefObject<HTMLInputElement> | null;
};

export const InputContext = createContext<InputRefState>({
  inputRef: null
});
