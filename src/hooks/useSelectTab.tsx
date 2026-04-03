import { useState } from 'react';

export const useSelectTab = (initial: string) => {
  const [selectedTab, setSelectedTab] = useState(initial);

  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedTab(e.currentTarget?.value);
  };

  const backInitialTab = () => {
    setSelectedTab(initial);
  };

  return { selectedTab, handleSelectTab, backInitialTab };
};
