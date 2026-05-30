import { useEffect, useRef, useState } from 'react';

export const useHandleHeaderBackGround = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollAnchor = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (scrollAnchor.current) {
      observer.observe(scrollAnchor.current);
    }
    return () => observer.disconnect();
  }, []);

  return { isScrolled, scrollAnchor };
};
