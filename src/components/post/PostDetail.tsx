import React, { useRef } from 'react';
import { useQueries } from '@tanstack/react-query';

import MiniProfile from '@/components/common/MiniProfile';
import PostSocial from '@/components/post/PostSocial';
import PostComments from '@/components/post/PostComments';
import CaffeineInfo from '@/components/post/CaffeineInfo';
import PostedAt from '@/components/post/PostedAt';
import Icon from '@/components/common/Icon';
import PostInput from '@/components/post/PostInput';

import { useVerifyOwner } from '@/hooks/post/useVerifyOwner';
import { usePostOptions } from '@/hooks/post/usePostOptions';
import { useRefIntoView } from '@/hooks/post/useRefIntoView';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';

import { getPostDetail, getSocialCounts } from '@/api/post';
import timestampToDate from '@/utils/timestampToDate';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { InputContext } from '@/context/contexts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Align, Flex } from '@/styles/layout';
import { PostContent, Divider } from '@/styles/styles';

const ReplyToPanel = React.lazy(() => import('./ReplyToPanel'));
const PublicOption = React.lazy(() => import('./overlay/PublicOption'));
const PostOwnerOption = React.lazy(() => import('./overlay/PostOwnerOption'));
const ConfirmDelete = React.lazy(() => import('./overlay/ConfirmDelete'));

const PostDetail = ({ postNum }: { postNum: string }) => {
  const { ref } = useRefIntoView(null, 'auto');
  useResetRegistInfo();
  const queries = useQueries({
    queries: [
      {
        queryKey: ['postData', postNum],
        queryFn: () => getPostDetail(postNum),
        enabled: !!postNum
      },
      {
        queryKey: ['socialCounts', postNum],
        queryFn: () => getSocialCounts(postNum),
        enabled: !!postNum
      }
    ]
  });
  const postData = queries[0].data;
  const socialCounts = queries[1].data;

  const { postOwner } = useVerifyOwner(postNum);
  const { toggle, cancelOptions } = usePostOptions();
  const {
    toggle: confirm,
    handleToggle: setConfirm,
    cancelConfirm
  } = usePostOptions();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isPostOwner =
    postOwner && postData && postOwner === postData.data.nickname;
  return (
    <>
      {toggle && isPostOwner && (
        <PostOwnerOption
          cancleOptions={cancelOptions}
          setConfirm={setConfirm}
          postId={postNum}
        />
      )}
      {toggle && !isPostOwner && (
        <PublicOption
          handleToggle={cancelOptions}
          postId={postNum}
        />
      )}
      {confirm && (
        <ConfirmDelete
          cancelConfirm={cancelConfirm}
          postId={postNum}
        />
      )}
      {postData && socialCounts && (
        <>
          <UserProfile
            className={cx(Flex, Between, Align)}
            ref={ref}>
            <MiniProfile
              url={postData?.data?.profileUrl}
              nickname={postData.data.nickname}
              caffeine={postData.data.sum}
              userId={postData.data.userId}
              post={true}
            />
            <Icon
              {...iconPropsGenerator('user-more')}
              onTouchEnd={cancelOptions}
            />
          </UserProfile>
          <DetailImg src={postData?.data.photo} />
          <PostSocial
            posts={false}
            likes={socialCounts.data.totalLikes}
            comments={socialCounts.data.totalComments}
            postId={postNum}
            userId={postData.data.userId}
          />
          <PostContent>{postData.data.post_title}</PostContent>
          <CaffeineInfo
            brand={postData.data.brand}
            menu={postData.data.menu}
            caffeine={postData.data.caffeine}
            shot={postData.data.shot}
          />
          <PostedAt at={timestampToDate(postData.data.created_at)} />
          <div className={Divider} />

          <InputContext.Provider value={{ inputRef }}>
            <PostComments
              postNum={postNum}
              commentCount={socialCounts.data.totalComments}
            />
          </InputContext.Provider>
          <ReplyToPanel />
          <PostInput
            inputRef={inputRef}
            postId={postNum}
          />
        </>
      )}
    </>
  );
};

const UserProfile = styled.div`
  padding: 12px 0;
`;

const DetailImg = styled.img`
  display: block;
  position: relative;
  margin-left: -20px;
  margin-right: -20px;
  height: 100vw;
  @media (max-width: 500px) {
    min-width: 100vw;
  }
  @media (min-width: 500px) {
    max-width: 500px;
  }
  max-height: 500px;
  object-fit: fill;
  aspect-ratio: 1/1;
`;

export default PostDetail;
