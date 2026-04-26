import React, { Suspense, useRef } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import MiniProfile from '@/components/common/MiniProfile';
import PostSocial from '@/components/post/PostSocial';
import PostComments from '@/components/post/PostComments';
import CaffeineInfo from '@/components/post/CaffeineInfo';
import PostedAt from '@/components/post/PostedAt';
import Icon from '@/components/common/Icon';
import PostInput from '@/components/post/PostInput';
import PostDetailImg from '@/components/post/PostDetailImg';

import { useVerifyOwner } from '@/hooks/post/useVerifyOwner';
import { usePostOptions } from '@/hooks/post/usePostOptions';
import { useRefIntoView } from '@/hooks/post/useRefIntoView';
import { useShowFooter } from '@/hooks/useShowFooter';

import { getPostDetail, getSocialCounts } from '@/api/post';
import { PostDetailTypes } from '@/types/types';
import timestampToDate from '@/utils/timestampToDate';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { InputContext } from '@/context/contexts';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Align, Flex, Column } from '@/styles/layout';
import { PostContent, Divider, Medium, Regular } from '@/styles/styles';

const ReplyToPanel = React.lazy(() => import('./ReplyToPanel'));
const PublicOption = React.lazy(() => import('./overlay/PublicOption'));
const PostOwnerOption = React.lazy(() => import('./overlay/PostOwnerOption'));
const ConfirmDelete = React.lazy(() => import('./overlay/ConfirmDelete'));

const { privatePost } = PROFILE_TEXTS;

const PostDetail = ({ postNum }: { postNum: string }) => {
  useShowFooter(false);
  const { ref } = useRefIntoView(null, 'auto');
  const { postOwner } = useVerifyOwner(postNum);

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
  const postData = queries[0].data?.data as PostDetailTypes;
  const socialCounts = queries[1].data;

  const {
    toggle: openActionModal,
    isModal,
    isPostOption,
    cancelOptions,
    confirmDelete
  } = usePostOptions();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isPostOwner = postOwner && postData && postOwner === postData.nickname;
  return (
    <>
      {openActionModal && isPostOwner && (
        <Suspense>
          <PostOwnerOption
            cancleOptions={cancelOptions}
            confirmDelete={confirmDelete}
            postId={postNum}
          />
        </Suspense>
      )}
      {openActionModal && !isPostOwner && (
        <Suspense>
          <PublicOption
            handleToggle={cancelOptions}
            postId={postNum}
          />
        </Suspense>
      )}
      {isModal && isPostOwner && isPostOption && (
        <Suspense>
          <ConfirmDelete postId={postNum} />
        </Suspense>
      )}
      {postData && socialCounts && (
        <Container className={Column}>
          <UserProfile
            className={cx(Flex, Between, Align)}
            ref={ref}>
            <MiniProfile
              url={postData?.profileUrl}
              nickname={postData.nickname}
              caffeineSum={postData.userSum}
              userId={postData.userId}
              post={true}
            />
            <Icon
              {...iconPropsGenerator('user-more')}
              onClick={cancelOptions}
            />
          </UserProfile>
          <PostContent>{postData.description}</PostContent>
          {postData?.photo && <PostDetailImg postImg={postData?.photo} />}
          <PostSocial
            posts={false}
            likes={socialCounts.likeCount}
            comments={socialCounts.commentCount}
            postId={postNum}
            userId={postData.userId}
          />
          <CaffeineInfo
            brand={postData.brand}
            productName={postData.productName}
            caffeine={postData.caffeine}
            shot={postData.shot}
            intensity={postData.intensity}
            size={postData.size}
          />
          <PostOption className={cx(Regular, Align)}>
            <PostedAt at={timestampToDate(postData.createdAt)} />
            {postData.visibility === 0 && (
              <span className={cx(Medium, Flex)}>{privatePost}</span>
            )}
          </PostOption>
          <div className={Divider} />
          <InputContext.Provider value={{ inputRef }}>
            <PostComments
              postNum={postNum}
              commentCount={socialCounts.commentCount}
            />
          </InputContext.Provider>
          <PostInputContainer>
            <Suspense>
              <ReplyToPanel />
            </Suspense>
            <PostInput
              inputRef={inputRef}
              postId={postNum}
            />
          </PostInputContainer>
          <Toaster />
        </Container>
      )}
    </>
  );
};

const UserProfile = styled.div`
  padding: 12px 0;
  margin-bottom: 12px;
`;

const Container = styled.div`
  height: 100%;
`;

const PostOption = styled.div`
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  white-space: pre-wrap;
`;

const PostInputContainer = styled.div`
  position: fixed;
  padding: 0 20px;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default PostDetail;
