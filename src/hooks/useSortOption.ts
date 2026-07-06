import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import React, { useState } from 'react';

export const useSortOption = (initial: string) => {
  const [isSelected, setIsSelected] = useState(initial);
  const { isModal, setIsModal } = useVerifyModalCTA();

  const handleSortOption = () => {
    setIsModal(!isModal);
  };
  const selectSortOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(e.currentTarget?.value);
  };
  return { isSelected, selectSortOption, isModal, handleSortOption };
};
