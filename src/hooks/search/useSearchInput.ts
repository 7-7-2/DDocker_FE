import { useState, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { useDebounce } from '@/hooks/search/useDebounce';
import { getSearchUser } from '@/api/search';
import { backToSearchState } from '@/atoms/atoms';
import { SearchPostListTypes, SimplifyUser } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const { tabs, type } = SEARCH_TEXTS;

export const useSearchInput = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<
    SimplifyUser[] | SearchPostListTypes[]
  >([]);
  const [initialCursor, setinitialCursor] = useState('');
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isSortType, setSortType] = useState(false);
  const setIsSearch = useSetRecoilState(backToSearchState);
  const searchRef = useRef<HTMLInputElement>(null);

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

  const clickSortBtn = () => {
    setSortType(!isSortType);
  };

  useEffect(() => {
    if (debounceVal) {
      getSearchUser(debounceVal, searchType, sortType).then(res => {
        setResults(res.data.results);
        setinitialCursor(res.data.nextCursor);
      });
    }
  }, [debounceVal, isSortType, searchType]);

  useEffect(() => {
    if (searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 0);
    }
  }, []);

  useEffect(() => {
    setIsSearch(true);
  }, []);

  return {
    selectedTab,
    setSelectedTab,
    clickSortBtn,
    results,
    initialCursor,
    search,
    handleChange,
    reset,
    setSearch,
    searchRef
  };
};
