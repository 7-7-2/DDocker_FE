import { useState, useRef, useEffect } from 'react';

export const useCarousel = () => {
  const [curPage, setCurPage] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollPosition = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const currentPage = Math.round(scrollPosition / containerWidth);
    if (curPage !== currentPage) {
      setCurPage(currentPage);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPosition = container?.scrollLeft;
    const containerWidth = container?.offsetWidth;
    const currentPage = Math.round(scrollPosition / containerWidth);
    if (container && curPage !== currentPage) {
      container.scrollLeft = containerWidth * curPage;
    }
  }, [curPage]);
  return { curPage, setCurPage, containerRef, handleScroll };
};
