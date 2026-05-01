import React, { Suspense, lazy } from 'react';

import Tabs from '@/components/common/Tabs';

import {
  SearchListTypes,
  SearchPostListTypes,
  SimplifyUser
} from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

import { styled } from 'styled-system/jsx';
import { FlexCenter } from '@/styles/layout';

const SearchPostList = lazy(() => import('@/components/search/SearchPostList'));
const SearchUserList = lazy(() => import('@/components/search/SearchUserList'));

const SearchList = ({
  selectedTab,
  setSelectedTab,
  clickSortBtn,
  results,
  initialCursor,
  search
}: SearchListTypes) => {
  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  return (
    <>
      <Tabs
        tabs={SEARCH_TEXTS.tabs}
        selectedTab={selectedTab}
        handleButtonClick={handleSelectTab}
      />
      {results.length === 0 ? (
        <EmptyContainer className={FlexCenter}>
          <EmptyText>{SEARCH_TEXTS.emptyResults}</EmptyText>
        </EmptyContainer>
      ) : (
        <>
          {selectedTab === SEARCH_TEXTS.tabs[0] ? (
            <Suspense>
              <SearchPostList
                posts={results as SearchPostListTypes[]}
                search={search}
                clickSortBtn={clickSortBtn}
                initialCursor={initialCursor}
              />
            </Suspense>
          ) : (
            <Suspense>
              <SearchUserList
                users={results as SimplifyUser[]}
                search={search}
              />
            </Suspense>
          )}
        </>
      )}
    </>
  );
};

const EmptyContainer = styled.div`
  height: calc(100% - 96px);
`;

const EmptyText = styled.span`
  margin: auto 0;
  text-align: center;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  color: var(--colors-mid-grey);
`;

export default SearchList;
