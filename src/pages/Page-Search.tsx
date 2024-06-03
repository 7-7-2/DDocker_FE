import { lazy, Suspense } from 'react';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { SearchContext } from '@/context/contexts';
import { useSearchInput } from '@/hooks/search/useSearchInput';

const SearchListItem = lazy(
  () => import('../components/search/SearchListItem')
);
const SearchHistory = lazy(() => import('../components/search/SearchHistory'));
const SearchBar = lazy(() => import('../components/search/SearchBar'));

const Search = () => {
  const { results, search, handleChange, reset, setSearch } = useSearchInput();
  return (
    <>
      <SEOMeta pageData={SEO_DATA.search} />
      <Suspense>
        <SearchBar
          search={search}
          handleChange={handleChange}
          reset={reset}
        />
      </Suspense>

      {search && (
        <Suspense>
          <SearchListItem
            users={results}
            search={search}
          />
        </Suspense>
      )}
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

export default Search;
