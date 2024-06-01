import { useEffect, useState } from 'react';

export const useSelectBox = (selectRef: React.RefObject<HTMLButtonElement>) => {
  const [isSelect, setIsSelect] = useState(false);

  const handleSelectClick = () => {
    setIsSelect(!isSelect);
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelect(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { isSelect, handleSelectClick };
};
