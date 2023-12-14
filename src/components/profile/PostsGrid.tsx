import { GRID } from '@/constants/PostsGrid';
import { Flex, Justify, Grid, Center } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const PostsGrid = () => {
  const handleClick = () => {
    console.log('1');
  };

  return (
    <div className={Justify}>
      <div className={cx(Grid, Center)}>
        {Array.from({ length: GRID.numberOfItems }).map((_, index) => (
          <div
            className={Flex}
            key={index}>
            {Array.from({ length: GRID.columns }).map((__, colIndex) => (
              <Container
                key={colIndex}
                onTouchEnd={handleClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;

const Container = styled.div`
  width: 109px;
  height: 109px;
  margin: 2px;
  background-color: var(--colors-tertiary);
  cursor: pointer;
`;
