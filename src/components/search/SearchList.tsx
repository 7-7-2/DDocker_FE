import React, { Suspense, lazy } from 'react';

import Tabs from '@/components/common/Tabs';
import SearchPostList from '@/components/search/SearchPostList';

import {
  SearchListTypes,
  SearchPostListTypes,
  SimplifyUser
} from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const SearchUserList = lazy(() => import('@/components/search/SearchUserList'));

const SearchList = ({
  selectedTab,
  setSelectedTab,
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
