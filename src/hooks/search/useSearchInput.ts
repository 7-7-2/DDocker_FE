import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useDebounce } from '@/hooks/search/useDebounce';
import { getSearchUser } from '@/api/search';
import { backToSearchState, searchSortState } from '@/atoms/atoms';
import { SearchPostListTypes, SimplifyUser } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const { tabs, type } = SEARCH_TEXTS;

export const useSearchInput = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<
    SimplifyUser[] | SearchPostListTypes[]
  >([]);
  const [initialCursor, setinitialCursor] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const isSortType = useRecoilValue(searchSortState);
  const setIsSearch = useSetRecoilState(backToSearchState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const reset = () => {
    setSearch('');
    setIsSearch(false);
  };

  const debounceVal = useDebounce(search);
  const searchType = selectedTab === tabs[0] ? type.type[0] : type.type[1];
  const sortType = isSortType === false ? type.sort[0] : type.sort[1];

  useEffect(() => {
    if (debounceVal) {
      getSearchUser(debounceVal, searchType, sortType).then(res => {
        setResults(res.data.results);
        setinitialCursor(res.data.nextCursor);
      });
    }
  }, [debounceVal, isSortType, searchType]);

  useEffect(() => {
    setIsSearch(true);

    let timerId: number | undefined;
    if (searchRef.current) {
      timerId = setTimeout(() => {
        searchRef.current?.focus();
      }, 0);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return {
    selectedTab,
    handleSelectTab,
    results,
    initialCursor,
    search,
    handleChange,
    reset,
    setSearch,
    searchRef
  };
};
