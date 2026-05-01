import { useQuery } from '@tanstack/react-query';

import HistoryHeader from '@/components/search/HistoryHeader';
import HistoryList from '@/components/search/HistoryList';

import useGetCacheData from '@/hooks/useGetCacheData';

const SearchHistory = () => {
  const { data } = useQuery({
    queryKey: ['cachedHistory'],
    queryFn: () => {
      return useGetCacheData('search', '/user');
    }
  });

  return (
    data?.cacheData.length !== 0 && (
      <>
        <HistoryHeader />
        <HistoryList cachedHistory={data?.cacheData} />
      </>
    )
  );
};

export default SearchHistory;
