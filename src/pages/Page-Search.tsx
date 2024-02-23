import { useRecoilState } from 'recoil';
import { searchResultsState } from '@/atoms/atoms';
import SearchBar from '@/components/search/SearchBar';
import SearchListItem from '@/components/search/SearchListItem';
import { SimplifyUser } from '@/types/types';

const Search = () => {
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);

  const usersData: SimplifyUser[] = [
    { userId: '1', nickname: '시우', caffeine: 99999999999999 },
    { userId: '2', nickname: '중후', caffeine: 500 },
    { userId: '3', nickname: '상원', caffeine: 250 }
  ];

  const handleSearch = () => {
    setSearchResults(usersData);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchListItem users={searchResults} />
    </>
  );
};

export default Search;
