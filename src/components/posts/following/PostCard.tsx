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
import { usePostOptions } from '@/hooks/post/usePostOptions';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import PostBody from '@/components/posts/following/PostBody';
import { useVerifyOwner } from '@/hooks/post/useVerifyOwner';
import React, { Suspense } from 'react';
import { Divider } from '@/styles/styles';

const PublicOption = React.lazy(
  () => import('../../post/overlay/PublicOption')
);
const PostOwnerOption = React.lazy(
  () => import('../../post/overlay/PostOwnerOption')
);
const ConfirmDelete = React.lazy(
  () => import('../../post/overlay/ConfirmDelete')
);

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
    brand,
    intensity,
    size
  } = props;
  const PostBodyProps = {
    postTitle,
    photo,
    caffeine,
    shot,
    menu,
    brand,
    intensity,
    size
  };
  const MiniProfileProps = { url: profileUrl, nickname, caffeine: sum, userId };

  const { postOwner } = useVerifyOwner(postId);
  const isPostOwner = postOwner && postOwner === nickname;
  const {
    toggle: confirm,
    handleToggle: setConfirm,
    cancelConfirm
  } = usePostOptions();

  const { data: socialCounts } = useQuery({
    queryKey: ['socialCounts', postId],
    queryFn: () => {
      return getSocialCounts(postId);
    },
    enabled: !!postId
  });
  const { toggle, cancelOptions } = usePostOptions();

  const navigateToPost = useNavigateTo(`/post/${postId}`);
  const handleToPost = () => {
    navigateToPost();
  };
  return (
    <>
      {toggle && !isPostOwner && (
        <Suspense>
          <PublicOption
            handleToggle={cancelOptions}
            postId={postId}
          />
        </Suspense>
      )}
      {toggle && isPostOwner && (
        <Suspense>
          <PostOwnerOption
            cancleOptions={cancelOptions}
            postId={postId}
            setConfirm={setConfirm}
          />
        </Suspense>
      )}
      {confirm && (
        <Suspense>
          <ConfirmDelete
            cancelConfirm={cancelConfirm}
            postId={postId}
            posts={true}
          />
        </Suspense>
      )}
      <Container>
        <UserProfile className={cx(Flex, Between)}>
          <MiniProfile
            {...MiniProfileProps}
            post={true}
          />
          <Icon
            {...iconPropsGenerator('user-more')}
            onClick={cancelOptions}
          />
        </UserProfile>

        <PostBody
          {...PostBodyProps}
          onClick={handleToPost}
        />

        <CardDivider className={Divider} />

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

const CardDivider = styled.div`
  padding-top: 16px;
  margin: 0 16px;
`;

export default PostCard;
