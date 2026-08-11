import { getAnchorPosition } from '@/utils/getAnchorPosition';
import { useLayoutEffect, useRef, useState } from 'react';

export const useTooltip = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [anchor, setAnchor] = useState(0);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  useLayoutEffect(() => {
    setAnchor(getAnchorPosition(anchorRef));
  }, [isTooltipOpen === true]);

  return { isTooltipOpen, handleToggleTooltip, anchorRef, anchor };
};
