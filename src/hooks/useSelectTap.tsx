import { useState } from 'react';

export const useSelectTap = (initial: string) => {
  const [seletedTap, setSelectedTap] = useState(initial);

  const handleSelectTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedTap(e.currentTarget?.value);
  };

  return { seletedTap, handleSelectTap };
};
