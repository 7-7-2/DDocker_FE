import PostSocial from '@/components/post/PostSocial';
import MiniProfile from '@/components/common/MiniProfile';
import Icon from '@/components/common/Icon';
import timestampToDate from '@/utils/timestampToDate';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { FollowingPost } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { getSocialCounts } from '@/api/post';
import { usePostOptions } from '@/hooks/usePostOptions';
import PublicOption from '@/components/post/overlay/PublicOption';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import PostBody from '@/components/posts/following/PostBody';

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
  const PostBodyProps = { postTitle, photo, caffeine, shot, menu, brand };
  const MiniProfileProps = { url: profileUrl, nickname, caffeine: sum };

  const { data: socialCounts } = useQuery({
    queryKey: ['socialCounts', postId],
    queryFn: () => {
      return getSocialCounts(postId);
    },
    enabled: !!postId
  });
  const { toggle, cancelOptions } = usePostOptions();

  const navigateToProfile = useNavigateTo(`/profile/${userId}`);
  const navigateToPost = useNavigateTo(`/post/${postId}`);
  const handleToProfile = () => {
    navigateToProfile();
  };
  const handleToPost = () => {
    navigateToPost();
  };
  return (
    <>
      {toggle && (
        <PublicOption
          handleToggle={cancelOptions}
          postId={postId}
        />
      )}
      <Container>
        <UserProfile className={cx(Flex, Between)}>
          <MiniProfile
            {...MiniProfileProps}
            onClick={handleToProfile}
          />
          <Icon
            {...iconPropsGenerator('user-more')}
            onClick={cancelOptions}
          />
        </UserProfile>

        <PostBody
          {...PostBodyProps}
          onTouchEnd={handleToPost}
        />

        <div>
          {socialCounts && (
            <PostSocial
              posts={true}
              likes={socialCounts.data.totalLikes}
              comments={socialCounts.data.totalComments}
              createdAt={timestampToDate(createdAt)}
              postId={postId}
              onClick={handleToPost}
            />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
`;

const UserProfile = styled.div`
  padding-bottom: 12px;
`;

export default PostCard;
