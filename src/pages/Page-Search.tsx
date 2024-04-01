import SearchBar from '@/components/search/SearchBar';
import SearchListItem from '@/components/search/SearchListItem';
import { useSearchInput } from '@/hooks/search/useSearchInput';
import SearchHistory from '@/components/search/SearchHistory';
import { SearchContext } from '@/context/contexts';

const Search = () => {
  const { results, search, handleChange, reset, setSearch } = useSearchInput();

  return (
    <>
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
