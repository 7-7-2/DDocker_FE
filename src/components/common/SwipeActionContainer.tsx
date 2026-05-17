import React, { useEffect, useRef } from 'react';
import SwipeButton from '@/components/common/SwipeButton';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';

const SwipeActionContainer = ({
  itemId,
  handleOnClick,
  handleOnSwipe,
  children
}: {
  itemId: number;
  handleOnClick: () => void;
  handleOnSwipe?: (id: string) => void;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const endDetectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !endDetectorRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const currentId = containerRef.current?.id;
          handleOnSwipe && currentId && handleOnSwipe(currentId);
        }
      },
      {
        root: containerRef.current,
        threshold: 0.5
      }
    );

    observer.observe(endDetectorRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        !containerRef.current ||
        containerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      containerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  return (
    <Container
      key={itemId}
      id={String(itemId)}
      ref={containerRef}
      className={Flex}>
      {children}
      <div ref={endDetectorRef}>
        <SwipeButton handleOnClick={handleOnClick} />
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: calc(100% + 20px);
  padding-right: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`;

export default SwipeActionContainer;
