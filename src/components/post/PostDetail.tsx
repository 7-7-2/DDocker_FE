import MiniProfile from '@/components/common/MiniProfile';
import PostSocial from '@/components/post/PostSocial';
import PostComments from '@/components/post/PostComments';
import CaffeineInfo from '@/components/post/CaffeineInfo';
import PostedAt from '@/components/post/PostedAt';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { useQuery } from '@tanstack/react-query';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { INPUT_TEXTS } from '@/constants/common';
import { styled } from 'styled-system/jsx';
import { Between, Align, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { PaddingTB10, PostContent } from '@/styles/styles';
import timestampToDate from '@/utils/timestampToDate';
import { getPostDetail, getSocialCounts } from '@/api/post';

const { type } = INPUT_TEXTS;
const { comment } = type;

const PostDetail = ({ postNum }: { postNum: string }) => {
  const {
    data: postData,
    isLoading,
    isError
  } = useQuery({
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
  const handleTouch = () => {
    // writeComment();
  };
  return (
    <>
      {postData && socialCounts && (
        <>
          <UserProfile className={cx(Flex, Between, Align)}>
            <MiniProfile
              url={postData?.data?.profileUrl}
              nickname={postData.data.nickname}
              caffeine={postData.data.sum}
            />
            <Icon {...iconPropsGenerator('user-more')} />
          </UserProfile>
          <DetailImg src={postData.data.photo} />
          <PostSocial
            posts={false}
            likes={socialCounts.data.totalLikes}
            comments={socialCounts.data.totalComments}
            postId={postNum}
          />
          <PostContent>{postData.data.post_title}</PostContent>
          <CaffeineInfo
            brand={postData.data.brand}
            menu={postData.data.menu}
            caffeine={postData.data.caffeine}
            shot={postData.data.shot}
          />
          <PostedAt at={timestampToDate(postData.data.created_at)} />
          <Divider />
          <PostComments
            postNum={postNum}
            commentCount={socialCounts.data.totalComments}
          />
          <Divider />
          <div className={PaddingTB10}>
            <Input
              type={comment.typeName}
              handleEvent={handleTouch}
            />
          </div>
        </>
      )}
    </>
  );
};

const UserProfile = styled.div`
  padding: 12px 0;
`;

const Divider = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    border-top: 1px solid #edecec;
    left: -20px;
    width: calc(50% + 20px);
  }
  &::before {
    content: '';
    position: absolute;
    border-top: 1px solid #edecec;
    right: -20px;
    width: calc(50% + 20px);
  }
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
