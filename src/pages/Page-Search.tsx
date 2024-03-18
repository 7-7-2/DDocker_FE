import SearchBar from '@/components/search/SearchBar';
import SearchListItem from '@/components/search/SearchListItem';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useSearchInput } from '@/hooks/useSearchInput';

const Search = () => {
  useShowFooter(false);
  const { results, search, handleChange, reset } = useSearchInput();

  return (
    <>
      <SearchBar
        search={search}
        handleChange={handleChange}
        reset={reset}
      />
      <SearchListItem
        users={results}
        search={search}
      />
    </>
  );
};

export default Search;
