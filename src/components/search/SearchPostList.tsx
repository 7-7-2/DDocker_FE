import Icon from '@/components/common/Icon';
import PostItem from '@/components/common/PostItem';
import SearchMore from '@/components/search/SearchMore';
import SearchMoreList from '@/components/search/SearchMoreList';

import { useSetHistory } from '@/hooks/search/useSetHistory';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { SearchPostListProps } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';
import { useState } from 'react';

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
    <>
      <SortBtn
        className={Flex}
        onClick={handleSortBtn}>
        <SortText className={Medium}>
          {!isLabelText
            ? SEARCH_TEXTS.sortOption[0]
            : SEARCH_TEXTS.sortOption[1]}
        </SortText>
        <Icon {...iconPropsGenerator('sort', '20')} />
      </SortBtn>
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
            !isLabelText ? SEARCH_TEXTS.type.sort[0] : SEARCH_TEXTS.type.sort[1]
          }
          initialCursor={initialCursor || null}
        />
      )}
    </>
  );
};

const SortText = styled.span`
  font-size: var(--font-sizes-sm);
  line-height: 20px;
  color: var(--colors-main-dark);
`;
const SortBtn = styled.button`
  gap: 2px;
  margin: 20px 0 8px 0;
  justify-self: end;
`;
const BtnArea = styled.div`
  margin: 50px 0;
`;
export default SearchPostList;
