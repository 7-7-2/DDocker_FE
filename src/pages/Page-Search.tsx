import SearchBar from '@/components/search/SearchBar';
import SearchListItem from '@/components/search/SearchListItem';
import { SimplifyUser } from '@/types/types';

const Search = () => {
  const usersData: SimplifyUser[] = [
    // { userId: '1', NickName: '내가바로커피왕', caffeine: 34054 },
    // { userId: '2', NickName: '커피커피마셔', caffeine: 2560 }
  ];
  return (
    <>
      <SearchBar />
      {usersData.length > 0 ? <SearchListItem users={usersData} /> : <></>}
    </>
  );
};

export default Search;
