import Icon from '@/components/common/Icon';
import PostItem from '@/components/common/PostItem';

import { SEARCH_TEXTS } from '@/constants/search';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { SearchPostListProps } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';
import { useState } from 'react';

const SearchPostList = ({
  posts,
  search,
  clickSortBtn
}: SearchPostListProps) => {
  const [isLabelText, setIsLabelText] = useState(false);
  const handleOnclick = () => {
    clickSortBtn();
    setIsLabelText(!isLabelText);
  };
  return (
    <>
      <SortBtn
        className={Flex}
        onClick={handleOnclick}>
        <SortText className={Medium}>
          {!isLabelText
            ? SEARCH_TEXTS.sortOption[0]
            : SEARCH_TEXTS.sortOption[1]}
        </SortText>
        <Icon {...iconPropsGenerator('sort', '20')} />
      </SortBtn>
      {posts.map(item => (
        <div key={item.postId}>
          <PostItem
            item={item}
            search={search}
          />
        </div>
      ))}
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
export default SearchPostList;
