import { GRID } from '@/constants/PostsGrid';
import { Grid, Center } from '@/styles/layout';
import { Cursor } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const PostsGrid = () => {
  const handleClick = () => {};

  return (
    <GridContainer className={cx(Grid, Center)}>
      {Array.from({ length: GRID.numberOfItems }).map((_, index) => (
        <GridItemContainer>
          <GridItem
            className={Cursor}
            key={index}
            onTouchEnd={handleClick}
            src="https://img.kbs.co.kr/kbs/620/news.kbs.co.kr/data/fckeditor/new/image/2022/09/15/332631663220505444.jpg"
          />
        </GridItemContainer>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
`;

const GridItemContainer = styled.div`
  width: 100%;
  position: relative;
  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const GridItem = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--colors-tertiary);
`;

export default PostsGrid;
