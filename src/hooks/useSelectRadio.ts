import { useState } from 'react';

export const useSelectRadio = (init?: string) => {
  const [selectedOption, setSelectedOption] = useState(init || '');
  const handleSelectOption = (e: React.ChangeEvent<HTMLElement>) => {
    setSelectedOption(e.currentTarget.id);
  };

  return { selectedOption, handleSelectOption };
};
