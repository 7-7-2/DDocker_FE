import DailyTrendImage from '@/components/posts/trend/DailyTrendImage';
import PostMeta from '@/components/common/PostMeta';
import Icon from '@/components/common/Icon';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { DailyTrendCardProps, PostMetaData } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { PaddingR8, Semibold } from '@/styles/styles';
import { Between, Column, Flex, FlexGrow } from '@/styles/layout';

const DailyTrendCard = ({ post }: { post: DailyTrendCardProps }) => {
  const navigate = (path: string) => useNavigateTo(`/post/${path}`);
  const toPost = navigate(post.postId);
  const postMetaProps: PostMetaData = {
    commentCount: post.commentCount,
    likeCount: post.likeCount,
    createdAt: post.createdAt
  };

  return (
    <Container
      className={cx(Column, PaddingR8)}
      onClick={toPost}>
      <div className={cx(Flex, FlexGrow, Between)}>
        <div className={Column}>
          <TrendProfile className={Flex}>
            {post.profileUrl ? (
              <ProgfileImg src={post.profileUrl} />
            ) : (
              <Icon {...iconPropsGenerator('xs-user')} />
            )}
            <span className={Semibold}>{post.nickname}</span>
          </TrendProfile>
          <Description>{post.description}</Description>
        </div>
        {post.photo && (
          <DailyTrendImage
            src={post.photo}
            onClick={toPost}
          />
        )}
      </div>
      <PostMeta
        postData={postMetaProps}
        handleLikeOnPost={toPost}
      />
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  height: 128px;
  padding: 16px;
  border-radius: 10px;
  border: solid 1px var(--colors-border-grey);
`;
const Description = styled.div`
  font-size: var(--font-size-sm);
  margin: 12px 0;
`;

const TrendProfile = styled.div`
  gap: 8px;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-sm);
`;
const ProgfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--colors-border-grey);
`;
export default DailyTrendCard;
