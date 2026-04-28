import React, { Suspense, lazy } from 'react';

import Tabs from '@/components/common/Tabs';

import {
  SearchListTypes,
  SearchPostListTypes,
  SimplifyUser
} from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const SearchPostList = lazy(() => import('@/components/search/SearchPostList'));
const SearchUserList = lazy(() => import('@/components/search/SearchUserList'));

const SearchList = ({
  selectedTab,
  setSelectedTab,
  clickSortBtn,
  results,
  search
}: SearchListTypes) => {
  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };
  console.log(results);
  return (
    <div>
      <Tabs
        tabs={SEARCH_TEXTS.tabs}
        selectedTab={selectedTab}
        handleButtonClick={handleSelectTab}
      />
      {selectedTab === SEARCH_TEXTS.tabs[0] ? (
        <Suspense>
          <SearchPostList
            posts={results as SearchPostListTypes[]}
            search={search}
            clickSortBtn={clickSortBtn}
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
    </div>
  );
};

export default SearchList;
