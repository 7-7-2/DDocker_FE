import MiniProfile from '@/components/common/MiniProfile';
import PostSocial from '@/components/post/PostSocial';
import PostComments from '@/components/post/PostComments';
import CaffeineInfo from '@/components/post/CaffeineInfo';
import PostedAt from '@/components/post/PostedAt';
import Icon from '@/components/common/Icon';
import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import ReplyToPanel from '@/components/post/ReplyToPanel';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Between, Align, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { PostContent, Divider } from '@/styles/styles';
import timestampToDate from '@/utils/timestampToDate';
import { getPostDetail, getSocialCounts } from '@/api/post';
import PostOwnerOption from '@/components/post/overlay/PostOwnerOption';
import PublicOption from '@/components/post/overlay/PublicOption';
import PostInput from '@/components/post/PostInput';
import { useRef } from 'react';
import { InputContext } from '@/context/inputContext';
import { usePostOptions } from '@/hooks/usePostOptions';
import { useVerifyOwner } from '@/hooks/useVerifyOwner';

const PostDetail = ({ postNum }: { postNum: string }) => {
  const { data: postData } = useQuery({
    queryKey: ['postData'],
    queryFn: () => {
      return getPostDetail(postNum);
    },
    enabled: !!postNum
  });
  const { data: socialCounts } = useQuery({
    queryKey: ['socialCounts', postNum],
    queryFn: () => {
      return getSocialCounts(postNum);
    },
    enabled: !!postNum
  });
  // signedIn => 로그인만을 판별
  // modify => 본인의 포스트인지 판별
  // userId? nickname? 을 통해 검증

  const { postOwner } = useVerifyOwner(postNum);
  const { toggle, handleOptions } = usePostOptions();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isPostOwner =
    postOwner && postData && postOwner === postData.data.nickname;
  return (
    <>
      {toggle && isPostOwner && (
        <PostOwnerOption
          handleToggle={handleOptions}
          postId={postNum}
        />
      )}
      {toggle && !isPostOwner && (
        <PublicOption
          handleToggle={handleOptions}
          postId={postNum}
        />
      )}
      {postData && socialCounts && (
        <>
          <UserProfile className={cx(Flex, Between, Align)}>
            <MiniProfile
              url={postData?.data?.profileUrl}
              nickname={postData.data.nickname}
              caffeine={postData.data.sum}
              onClick={() => {}}
            />
            <Icon
              {...iconPropsGenerator('user-more')}
              onTouchEnd={handleOptions}
            />
          </UserProfile>
          <DetailImg src={postData.data.photo} />
          <PostSocial
            posts={false}
            likes={socialCounts.data.totalLikes}
            comments={socialCounts.data.totalComments}
            postId={postNum}
            onClick={() => {}}
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
`;

export default PostDetail;
