import { useState } from 'react';

import SortBtn from '@/components/common/SortBtn';
import PostItem from '@/components/common/PostItem';
import SearchMore from '@/components/search/SearchMore';
import SearchMoreList from '@/components/search/SearchMoreList';

import { useSetHistory } from '@/hooks/search/useSetHistory';
import { SearchPostListProps } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

import { styled } from 'styled-system/jsx';

const SearchPostList = ({
  posts,
  search,
  initialCursor,
  clickSortBtn
}: SearchPostListProps) => {
  const { mutateSearchText } = useSetHistory();
  const [loadMore, setLoadMore] = useState(false);
  const [isLabelText, setIsLabelText] = useState(false);

  const handleSortBtn = () => {
    clickSortBtn();
    setIsLabelText(!isLabelText);
    setLoadMore(false);
  };

  const handleOnclick = () => {
    mutateSearchText(search);
  };
  const handleSearchMore = () => {
    setLoadMore(true);
    mutateSearchText(search);
  };

  return (
    <Container>
      <SortBtn
        btnState={isLabelText}
        handleOnClick={handleSortBtn}
      />
      <PostsContainer>
        {posts.map(item => (
          <div
            onClick={handleOnclick}
            key={item.postId}>
            <PostItem
              item={item}
              search={search}
            />
          </div>
        ))}
        {posts.length == 5 && !loadMore && (
          <BtnArea>
            <SearchMore onClick={handleSearchMore} />
          </BtnArea>
        )}
        {loadMore && (
          <SearchMoreList
            search={search}
            type={SEARCH_TEXTS.tabs[0]}
            sort={
              !isLabelText
                ? SEARCH_TEXTS.type.sort[0]
                : SEARCH_TEXTS.type.sort[1]
            }
            initialCursor={initialCursor || null}
          />
        )}
      </PostsContainer>
    </Container>
  );
};
const Container = styled.div`
  margin-top: 20px;
`;

const PostsContainer = styled.div`
  margin-top: 6px;
`;
const BtnArea = styled.div`
  margin: 50px 0;
`;

export default SearchPostList;
