import React, { useEffect, useRef } from 'react';

export const useSelectCard = (
  brand: string,
  selected: string,
  setSelected: (brand: string) => void
) => {
  const brandRef = useRef<HTMLDivElement>(null);
  const isSelected = brand === selected;
  const handleSelectCard = () => {
    setSelected(brand);
  };

  useEffect(() => {
    isSelected && brandRef.current && brandRef.current.scrollIntoView();
  }, [isSelected]);
  return { brandRef, isSelected, handleSelectCard };
};
