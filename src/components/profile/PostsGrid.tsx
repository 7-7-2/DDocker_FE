import { useNavigate } from 'react-router-dom';
import { PostsGridProps, UserProfilePostsTypes } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Grid, Center } from '@/styles/layout';
import { Cursor } from '@/styles/styles';

const PostsGrid = ({ data, postRef }: PostsGridProps) => {
  const navigate = useNavigate();
  const posts = data && data.flatMap(item => item.posts);

  const touchImg: React.TouchEventHandler<HTMLImageElement> = (
    e: React.TouchEvent<HTMLImageElement>
  ) => {
    navigate(`/post/${e.currentTarget.id}`);
  };

  return (
    <GridContainer className={cx(Grid, Center)}>
      {posts &&
        posts.map((item: UserProfilePostsTypes) => (
          <GridItemContainer key={item.postId}>
            <GridItem
              className={Cursor}
              key={item.postId}
              id={item.postId}
              onTouchEnd={touchImg}
              src={item.photo}
            />
          </GridItemContainer>
        ))}
      <Target ref={postRef} />
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

const Target = styled.div`
  width: 1px;
`;

export default PostsGrid;
