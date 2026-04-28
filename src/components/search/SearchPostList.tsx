import Icon from '@/components/common/Icon';
import PostItem from '@/components/common/PostItem';

import { SEARCH_TEXTS } from '@/constants/search';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { SearchPostListProps } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';

const SearchPostList = ({ posts, search }: SearchPostListProps) => {
  return (
    <>
      <SortBtn className={Flex}>
        <SortText className={Medium}>{SEARCH_TEXTS.sortOption[0]}</SortText>
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
