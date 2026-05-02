import { RefObject } from 'react';

export const getAnchorPosition = (bodyRef: RefObject<HTMLDivElement>) => {
  const rect = bodyRef.current?.getBoundingClientRect();
  const left = (rect && rect.left - 20) || 0;
  const center = (rect && rect.width / 2) || 0;
  const location = left + center - 10;
  return location;
};
