import { GRID } from '@/constants/PostsGrid';
import { styled } from 'styled-system/jsx';
import { Full, Flex, Justify, Grid, Center } from '@/styles/layout';
import { cx } from 'styled-system/css';

const PostsGrid = () => {
  return (
    <div className={cx(Full, Justify)}>
      <div className={cx(Grid, Center)}>
        {Array.from({ length: GRID.numberOfItems }).map((_, index) => (
          <div
            className={Flex}
            key={index}>
            {Array.from({ length: GRID.columns }).map((__, colIndex) => (
              <Container key={colIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;

const Container = styled.div`
  width: 100px;
  height: 100px;
  margin: 15px;
  padding: 10px;
  background-color: #ddd;
  cursor: pointer;
`;
