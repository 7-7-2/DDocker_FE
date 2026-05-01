import PostItem from '@/components/common/PostItem';

import { PostsListProps } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';

const PostsList = ({ data, postRef, handleOnError }: PostsListProps) => {
  return (
    <AllPostsList className={Column}>
      {data?.map(item => (
        <PostItem
          key={item.postId}
          item={item}
          handleOnError={handleOnError}
        />
      ))}
      <Target ref={postRef} />
    </AllPostsList>
  );
};

const AllPostsList = styled.div`
  flex-grow: 1;
  padding-top: 12px;
`;

const Target = styled.div`
  height: 1px;
`;

export default PostsList;
