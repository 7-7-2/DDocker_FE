import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { styled } from 'styled-system/jsx';
import PostItem from '@/components/common/PostItem';
import MiniProfile from '@/components/common/MiniProfile';

import {
  SearchListMorePostIQParam,
  SearchListMoreUserIQParam
} from '@/hooks/useInfiniteScroll';

import {
  InfiniteSearchList,
  SearchPostListTypes,
  SimplifyUser
} from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const { search: searchText } = SEARCH_TEXTS;

const SearchMoreList = ({
  search,
  type,
  initialCursor,
  sort
}: {
  search: string;
  type: string;
  initialCursor: string | null;
  sort?: string;
}) => {
  const searchListMoreIQParam: InfiniteSearchList = !sort
    ? SearchListMoreUserIQParam(search, initialCursor)
    : SearchListMorePostIQParam(search, sort, initialCursor);

  const { searchMoreList, ref } = useTargetInfiniteScroll(
    searchListMoreIQParam,
    searchText
  );

  const mapSearchUserList = (user: SimplifyUser) => {
    return (
      <Container key={user.userId}>
        <MiniProfile
          url={user.url}
          nickname={user.nickname}
          caffeineSum={user.caffeineSum}
          userId={user.userId}
          mini={true}
        />
      </Container>
    );
  };
  const mapSearchPostList = (post: SearchPostListTypes) => {
    return (
      <Container key={post.postId}>
        <PostItem
          item={post}
          search={search}
        />
      </Container>
    );
  };
  return (
    <>
      {searchMoreList && searchMoreList.length !== 0 && (
        <>
          {type === 'user'
            ? searchMoreList.map(mapSearchUserList)
            : searchMoreList.map(mapSearchPostList)}
          <Target ref={ref} />
        </>
      )}
    </>
  );
};

const Container = styled.div`
  margin: 20px 0;
`;

const Target = styled.div`
  padding: 1px;
`;

export default SearchMoreList;
