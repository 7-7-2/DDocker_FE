import { createContext } from 'react';

type InputRefState = {
  inputRef: React.RefObject<HTMLInputElement> | null;
};

export const InputContext = createContext<InputRefState>({
  inputRef: null
});

type SearchState = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchState>({
  setSearch: () => {}
});
