import React, { useState } from 'react';

export const useSortOption = (initial: string) => {
  const [isSelected, setIsSelected] = useState(initial);
  const [isModal, setIsModal] = useState(false);

  const handleSortOption = () => {
    setIsModal(!isModal);
  };
  const selectSortOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(e.currentTarget?.value);
    setIsModal(!isModal);
  };

  return { isSelected, selectSortOption, isModal, handleSortOption };
};
