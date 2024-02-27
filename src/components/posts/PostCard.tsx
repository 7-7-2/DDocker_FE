import PostSocial from '@/components/post/PostSocial';
import MiniProfile from '@/components/common/MiniProfile';
import Icon from '@/components/common/Icon';
import CafeDetail from '@/components/post/CafeDetail';
import timestampToDate from '@/utils/timestampToDate';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { PostContent } from '@/styles/styles';
import { PaddingT12 } from '@/styles/styles';
import { FollowingPost } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { getSocialCounts } from '@/api/post';

const PostCard = ({ ...props }: FollowingPost) => {
  const {
    nickname,
    sum,
    postTitle,
    postId,
    userId,
    profileUrl,
    createdAt,
    photo,
    caffeine,
    shot,
    menu,
    brand
  } = props;
  const { data: socialCounts } = useQuery({
    queryKey: ['socialCounts', postId],
    queryFn: () => {
      return getSocialCounts(postId);
    },
    enabled: !!postId
  });

  return (
    <Container>
      <UserProfile className={cx(Flex, Between)}>
        {/* userId => onClick => profile Page */}
        <MiniProfile
          url={profileUrl}
          nickname={nickname}
          caffeine={sum}
        />
        <Icon {...iconPropsGenerator('user-more')} />
      </UserProfile>
      <PostContent>{postTitle}</PostContent>
      <PostImg src={photo} />
      <CafeDetail
        brand={brand}
        caffeine={caffeine}
        shot={shot}
        menu={menu}
        className={PaddingT12}
        posts={true}
      />
      <div>
        {/* useInfiniteScroll => receives likes && comments counts */}
        {socialCounts && (
          <PostSocial
            posts={true}
            likes={socialCounts.data.totalLikes}
            comments={socialCounts.data.totalComments}
            createdAt={timestampToDate(createdAt)}
            postId={postId}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* border: 1px solid #767676; */
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
`;

const UserProfile = styled.div`
  padding-bottom: 12px;
`;

const PostImg = styled.img`
  margin-top: -4px;
  border-radius: 16px;
`;

export default PostCard;
