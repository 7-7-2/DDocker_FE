import { useNavigate } from 'react-router-dom';

import timestampToDate from '@/utils/timestampToDate';
import { brandMapToKor } from '@/utils/convertBrandName';
import { PostsListProps } from '@/types/types';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column, Flex } from '@/styles/layout';
import { Medium, Regular, Semibold } from '@/styles/styles';

const { privatePost } = PROFILE_TEXTS;

const PostsList = ({ data, postRef, handleOnError }: PostsListProps) => {
  const navigate = useNavigate();
  const goToPostDetail: React.MouseEventHandler<HTMLImageElement> = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    navigate(`/post/${e.currentTarget.id}`);
  };

  return (
    <AllPostsList className={Column}>
      {data?.map(item => (
        <PostItem
          key={item.postId}
          id={item.postId}
          onClick={goToPostDetail}
          className={cx(Column, Between)}>
          <div className={cx(Flex, Between)}>
            <div className={Column}>
              <Brand>{brandMapToKor(item.brand)}</Brand>
              <ProductName className={Semibold}>{item.productName}</ProductName>
              <Description>{item.description}</Description>
            </div>
            {item.photo && (
              <Img
                src={item.photo}
                onError={handleOnError}
              />
            )}
          </div>
          <PostOption className={cx(Regular, Flex)}>
            <span>{timestampToDate(item.createdAt)}</span>
            {item.visibility === 0 && (
              <span className={cx(Medium, Flex)}>{privatePost}</span>
            )}
          </PostOption>
        </PostItem>
      ))}
      <Target ref={postRef} />
    </AllPostsList>
  );
};

const AllPostsList = styled.div`
  flex-grow: 1;
  padding-top: 12px;
`;
const PostItem = styled.div`
  height: 130px;
  box-shadow: inset 0 -1px 0 0 var(--colors-border-grey);
  padding: 12px 0;
  gap: 12px;
`;
const Brand = styled.span`
  line-height: 18px;
  font-size: var(--font-siezs-xs);
  color: var(--colors-mid-grey);
`;
const ProductName = styled.span`
  padding-top: 2px;
  line-height: 24px;
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;
const Description = styled.span`
  margin-top: 6px;
  line-height: 18px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
`;
const Img = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 6px;
`;

const PostOption = styled.div`
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  white-space: pre-wrap;
`;

const Target = styled.div`
  height: 1px;
`;

export default PostsList;
