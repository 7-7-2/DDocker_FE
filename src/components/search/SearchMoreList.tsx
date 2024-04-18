import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { styled } from 'styled-system/jsx';
import { SearchListMoreUserIQParam } from '@/hooks/useInfiniteScroll';
import MiniProfile from '@/components/common/MiniProfile';
import { SimplifyUser } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const { search: searchText } = SEARCH_TEXTS;

const SearchMoreList = ({ search }: { search: string }) => {
  const { searchMoreList, ref } = useTargetInfiniteScroll(
    SearchListMoreUserIQParam(search),
    searchText
  );

  const mapSearchList = (user: SimplifyUser) => {
    return (
      <Container key={user.userId}>
        <MiniProfile
          url={user.url}
          nickname={user.nickname}
          caffeine={user.caffeine}
          userId={user.userId}
        />
      </Container>
    );
  };
  return (
    <>
      {searchMoreList && searchMoreList.length !== 0 && (
        <>
          {searchMoreList && searchMoreList.map(mapSearchList)}
          <Target ref={ref} />
        </>
      )}
    </>
  );
};

const Container = styled.div`
  margin: 20px 0;
`;

const Target = styled.div`
  padding: 1px;
`;

export default SearchMoreList;
