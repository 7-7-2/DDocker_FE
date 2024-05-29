import SearchBar from '@/components/search/SearchBar';
import SearchListItem from '@/components/search/SearchListItem';
import SearchHistory from '@/components/search/SearchHistory';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { SearchContext } from '@/context/contexts';
import { useSearchInput } from '@/hooks/search/useSearchInput';

const Search = () => {
  const { results, search, handleChange, reset, setSearch } = useSearchInput();
  return (
    <>
      <SEOMeta pageData={SEO_DATA.search} />
      <SearchBar
        search={search}
        handleChange={handleChange}
        reset={reset}
      />
      {search && (
        <SearchListItem
          users={results}
          search={search}
        />
      )}
      {!search && (
        <SearchContext.Provider value={{ setSearch }}>
          <SearchHistory />
        </SearchContext.Provider>
      )}
    </>
  );
};

export default Search;
