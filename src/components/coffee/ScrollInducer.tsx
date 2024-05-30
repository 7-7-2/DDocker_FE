import { useEffect, useState } from 'react';
import { SCROLL_INDUCER_TEXTS } from '@/constants/common';
import { Regular } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Justify } from '@/styles/layout';

const { text } = SCROLL_INDUCER_TEXTS;
const ScrollInducer = ({
  targetRef
}: {
  targetRef: React.RefObject<HTMLDivElement>;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  return (
    <Container className={isVisible ? Default : undefined}>
      <Text className={cx(Regular, Justify)}>{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  height: 80px;
  position: sticky;
  margin: 0 -20px;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(#f5f5f530, #e9e9e9df);
  opacity: 100;
  transition: opacity 0.5s ease;
`;

const Default = css`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
`;

const Text = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 40px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;

export default ScrollInducer;
