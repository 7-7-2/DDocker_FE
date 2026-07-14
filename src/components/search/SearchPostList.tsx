import { useEffect, useState } from 'react';

import SortBtn from '@/components/common/SortBtn';
import PostItem from '@/components/common/PostItem';
import SearchMore from '@/components/search/SearchMore';
import SearchMoreList from '@/components/search/SearchMoreList';

import { useSetHistory } from '@/hooks/search/useSetHistory';
import { SearchPostListProps } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

import { styled } from 'styled-system/jsx';
import { useSortOption } from '@/hooks/useSortOption';
import { SORT_TEXTS } from '@/constants/common';
import SortOptionModal from '@/components/common/SortOptionModal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchSortState } from '@/atoms/atoms';

const SearchPostList = ({
  posts,
  search,
  initialCursor
}: SearchPostListProps) => {
  const { mutateSearchText } = useSetHistory();
  const [loadMore, setLoadMore] = useState(false);
  const [isLabelText, setIsLabelText] = useState(false);
  const setSortType = useSetRecoilState(searchSortState);

  const { isSelected, selectSortOption, isModal, handleSortOption } =
    useSortOption(SORT_TEXTS.posts[0]);

  const handleSortBtn = () => {
    handleSortOption();
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

  useEffect(() => {
    if (isSelected !== SORT_TEXTS.posts[0]) {
      return setSortType(true);
    }
    return setSortType(false);
  }, [isSelected]);

  return (
    <>
      <Container>
        <SortBtn
          handleSortOption={handleSortBtn}
          isSelected={isSelected}
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
      {isModal && (
        <SortOptionModal
          option={SORT_TEXTS.posts}
          isSelected={isSelected}
          handleSortOption={handleSortOption}
          selectSortOption={selectSortOption}
        />
      )}
    </>
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
