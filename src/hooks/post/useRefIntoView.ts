import { useEffect, useRef } from 'react';

export const useRefIntoView = (
  dep: any,
  action = 'smooth' as ScrollBehavior
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: action,
        block: 'center',
        inline: 'center'
      });
    }
  }, [dep]);
  return { ref };
};
