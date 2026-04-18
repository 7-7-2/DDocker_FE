import { useNavigate } from 'react-router-dom';

import Icon from '@/components/common/Icon';

import { PostsGridProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Grid, Center, DVW } from '@/styles/layout';
import { Cursor } from '@/styles/styles';

const PostsGrid = ({ data: posts, postRef, handleOnError }: PostsGridProps) => {
  const navigate = useNavigate();

  const touchImg: React.MouseEventHandler<HTMLImageElement> = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    navigate(`/post/${e.currentTarget.id}`);
  };

  return (
    <GridContainer className={cx(Grid, Center, DVW)}>
      {posts &&
        posts.map(item => (
          <GridItemContainer key={item.postId}>
            <GridItem
              className={Cursor}
              key={item.postId}
              id={item.postId}
              onClick={touchImg}>
              {item.visibility === 0 && (
                <PrivateIcon>
                  <Icon {...iconPropsGenerator('lock-grid', '20')} />
                </PrivateIcon>
              )}
              <PostImg
                src={item.photo || '기본_이미지_경로.jpg'}
                onError={handleOnError}
              />
            </GridItem>
          </GridItemContainer>
        ))}
      <Target ref={postRef} />
    </GridContainer>
  );
};

const GridContainer = styled.div`
  margin: 0 -20px;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
`;

const GridItemContainer = styled.div`
  width: 100%;

  position: relative;
  padding-top: 1px;
  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
const PrivateIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GridItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: var(--colors-tertiary);
`;

const Target = styled.div`
  height: 1px;
`;

export default PostsGrid;
