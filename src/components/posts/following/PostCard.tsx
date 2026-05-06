import React, { Suspense, useLayoutEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import PostSocial from '@/components/post/PostSocial';
import MiniProfile from '@/components/common/MiniProfile';
import Icon from '@/components/common/Icon';
import PostBody from '@/components/posts/following/PostBody';

import { usePostOptions } from '@/hooks/post/usePostOptions';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useVerifyOwner } from '@/hooks/post/useVerifyOwner';

import timestampToDate from '@/utils/timestampToDate';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { getSocialCounts } from '@/api/post';
import { FollowingPost } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex, Between } from '@/styles/layout';
import { splitPostCardProps } from '@/utils/splitPostCardProps';
import { useSetRecoilState } from 'recoil';
import { footerShowState } from '@/atoms/atoms';

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
  const { postId, createdAt, PostBodyProps, MiniProfileProps } =
    splitPostCardProps({ ...props });

  const { postOwner } = useVerifyOwner(postId);
  const isPostOwner = postOwner && postOwner === MiniProfileProps.nickname;

  const { data: socialCounts } = useQuery({
    queryKey: ['socialCounts', postId],
    queryFn: () => {
      return getSocialCounts(postId);
    },
    enabled: !!postId
  });

  const {
    toggle,
    handleToggle: setConfirm,
    isModal,
    cancelOptions,
    confirmDelete,
    isPostOption
  } = usePostOptions();

  const navigateToPost = useNavigateTo(`/post/${postId}`);
  const handleToPost = () => {
    navigateToPost();
  };
  const setFooterState = useSetRecoilState(footerShowState);
  useLayoutEffect(() => {
    setFooterState(true);
  }, []);

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
            confirmDelete={confirmDelete}
          />
        </Suspense>
      )}
      {isModal && isPostOwner && isPostOption && (
        <Suspense>
          <ConfirmDelete
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
        <div>
          {socialCounts && (
            <PostSocial
              posts={true}
              likes={socialCounts.likeCount}
              comments={socialCounts.commentCount}
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
