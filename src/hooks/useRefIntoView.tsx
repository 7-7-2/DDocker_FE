import { useEffect, useRef } from 'react';

export const useRefIntoView = (dep: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [dep]);
  return { ref };
};
