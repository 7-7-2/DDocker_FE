import { lazy, Suspense } from 'react';

import SEOMeta from '@/components/common/SEOMeta';

import { useSearchInput } from '@/hooks/search/useSearchInput';
import { SearchContext } from '@/context/contexts';
import { useShowFooter } from '@/hooks/useShowFooter';
import SEO_DATA from '@/constants/SEOData';

import { Divider } from '@/styles/styles';
import { styled } from 'styled-system/jsx';

const SearchBar = lazy(() => import('../components/search/SearchBar'));
const SearchList = lazy(() => import('@/components/search/SearchList'));
const SearchHistory = lazy(() => import('../components/search/SearchHistory'));

const Search = () => {
  useShowFooter(false);
  const {
    results,
    initialCursor,
    search,
    handleChange,
    reset,
    setSearch,
    selectedTab,
    setSelectedTab,
    clickSortBtn
  } = useSearchInput();

  return (
    <>
      <SEOMeta pageData={SEO_DATA.search} />
      <Suspense>
        <SearchBar
          search={search}
          handleChange={handleChange}
          reset={reset}
        />
        <SearchArea />
      </Suspense>
      {search && (
        <Suspense>
          <SearchList
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            clickSortBtn={clickSortBtn}
            results={results}
            initialCursor={initialCursor}
            search={search}
          />
        </Suspense>
      )}
      {!search && <div className={Divider} />}
      {!search && (
        <SearchContext.Provider value={{ setSearch }}>
          <Suspense>
            <SearchHistory />
          </Suspense>
        </SearchContext.Provider>
      )}
    </>
  );
};

const SearchArea = styled.div`
  height: 56px;
`;

export default Search;
