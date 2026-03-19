import { useState } from 'react';

export const useSelectTab = (initial: string) => {
  const [seletedTab, setSelectedTab] = useState(initial);

  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedTab(e.currentTarget?.value);
  };

  return { seletedTab, handleSelectTab };
};
