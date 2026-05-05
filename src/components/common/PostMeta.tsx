import PostSocialCount from '@/components/post/PostSocialCount';

import timestampToDate from '@/utils/timestampToDate';
import { PostMetaData } from '@/types/types';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Flex } from '@/styles/layout';
import { Medium, Regular } from '@/styles/styles';

const { privatePost } = PROFILE_TEXTS;
const PostMeta = ({
  postData,
  handleLikeOnPost
}: {
  postData: PostMetaData;
  handleLikeOnPost: () => void;
}) => {
  return (
    <PostOption className={cx(Regular, Flex, Between)}>
      <div>
        <span>{timestampToDate(postData.createdAt)}</span>
        {postData.visibility === 0 && (
          <span className={cx(Medium, Flex)}>{privatePost}</span>
        )}
      </div>
      {
        <SocialContainer className={Flex}>
          <PostSocialCount
            count={postData.likeCount}
            icon={'like-sm'}
            size="20"
            onClick={handleLikeOnPost}
          />
          <PostSocialCount
            count={postData.commentCount}
            icon={'comments-sm'}
            size="20"
            onClick={() => {}}
          />
        </SocialContainer>
      }
    </PostOption>
  );
};

const PostOption = styled.div`
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  white-space: pre-wrap;
`;

const SocialContainer = styled.div`
  gap: 6px;
`;

export default PostMeta;
