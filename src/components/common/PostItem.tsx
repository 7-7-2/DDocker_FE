import React from 'react';
import { useNavigate } from 'react-router-dom';

import PostSocialCount from '@/components/post/PostSocialCount';

import { useLikeOnPost } from '@/hooks/post/useLikeOnPost';
import timestampToDate from '@/utils/timestampToDate';
import { brandMapToKor } from '@/utils/convertBrandName';
import {
  PostItemProps,
  SearchPostListTypes,
  UserProfileListDataTypes
} from '@/types/types';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column, Flex } from '@/styles/layout';
import {
  defaultWidth,
  hasImgWidth,
  Medium,
  Regular,
  Semibold
} from '@/styles/styles';

const { privatePost } = PROFILE_TEXTS;

const PostItem = ({ item: postData, search, handleOnError }: PostItemProps) => {
  const profileData = 'visibility' in postData;
  const searchData = 'likeCount' in postData;
  const { handleLikeOnPost } = useLikeOnPost(postData.postId);

  const searchHighlightGenerator = () => {
    const splitDescription =
      search && postData.description?.split(new RegExp(`(${search})`, 'gi'));
    if (Array.isArray(splitDescription)) {
      return splitDescription;
    } else return [postData.description];
  };
  const description = searchHighlightGenerator();

  const navigate = useNavigate();
  const goToPostDetail: React.MouseEventHandler<HTMLImageElement> = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    navigate(`/post/${e.currentTarget.id}`);
  };

  return (
    <PostItemContainer
      key={postData.postId}
      id={postData.postId}
      onClick={goToPostDetail}
      className={cx(Column, Between)}>
      <div className={cx(Flex, Between)}>
        <div className={cx(Column, postData.photo && hasImgWidth)}>
          <Brand>
            {brandMapToKor(
              (postData as SearchPostListTypes).brandName ||
                (postData as UserProfileListDataTypes).brand
            )}
          </Brand>
          <ProductName className={Semibold}>{postData.productName}</ProductName>
          <div className={postData.photo ? hasImgWidth : defaultWidth}>
            {profileData ? (
              <Description>{postData.description}</Description>
            ) : (
              <Description>
                {description.map((item, id) => (
                  <span
                    key={id}
                    className={item === search ? Semibold : Regular}>
                    {item}
                  </span>
                ))}
              </Description>
            )}
          </div>
        </div>
        {postData.photo && (
          // <Img>
          <Img
            src={postData.photo}
            onError={handleOnError}
          />
          // </Img>
        )}
      </div>
      <PostOption className={cx(Regular, Flex, Between)}>
        <div>
          <span>{timestampToDate(postData.createdAt)}</span>
          {profileData && postData.visibility === 0 && (
            <span className={cx(Medium, Flex)}>{privatePost}</span>
          )}
        </div>
        {searchData && (
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
        )}
      </PostOption>
    </PostItemContainer>
  );
};

const PostItemContainer = styled.div`
  height: 130px;

  max-width: 460px;
  box-shadow: inset 0 -1px 0 0 var(--colors-border-grey);
  padding: 12px 0;
  gap: 12px;
  overflow: hidden;
`;
const Brand = styled.span`
  line-height: 18px;
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-xs);
`;
const ProductName = styled.span`
  padding-top: 2px;
  line-height: 24px;
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;
const Description = styled.p`
  margin-top: 6px;
  line-height: 18px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Img = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 6px;
  border: 1px solid var(--colors-tertiary);
`;

const PostOption = styled.div`
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  white-space: pre-wrap;
`;

const SocialContainer = styled.div`
  gap: 6px;
`;
export default PostItem;
