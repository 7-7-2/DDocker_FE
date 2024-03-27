import SearchBar from '@/components/search/SearchBar';
import SearchListItem from '@/components/search/SearchListItem';
import { useSearchInput } from '@/hooks/search/useSearchInput';
import SearchHistory from '@/components/search/SearchHistory';

const Search = () => {
  const { results, search, handleChange, reset } = useSearchInput();

  return (
    <>
      <SearchBar
        search={search}
        handleChange={handleChange}
        reset={reset}
      />
      {search && <SearchListItem users={results} />}
      {!search && <SearchHistory />}
    </>
  );
};

export default Search;
