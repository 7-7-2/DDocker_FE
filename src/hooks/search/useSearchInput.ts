import { useState, useEffect, useRef } from 'react';

import { useDebounce } from '@/hooks/search/useDebounce';
import { getSearchUser } from '@/api/search';
import { SearchPostListTypes, SimplifyUser } from '@/types/types';
import { SEARCH_TEXTS } from '@/constants/search';

const { tabs, type, sortOption } = SEARCH_TEXTS;

export const useSearchInput = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<
    SimplifyUser[] | SearchPostListTypes[]
  >([]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isSortType, setSortType] = useState(sortOption[0]);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const reset = () => {
    setSearch('');
  };

  const debounceVal = useDebounce(search);
  const searchType = selectedTab === tabs[0] ? type.type[0] : type.type[1];
  const sortType = isSortType === sortOption[0] ? type.sort[0] : type.sort[1];

  useEffect(() => {
    if (debounceVal) {
      getSearchUser(debounceVal, searchType, sortType).then(res => {
        setResults(res.data.results);
      });
    }
  }, [debounceVal]);

  useEffect(() => {
    if (searchRef.current) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 0);
    }
  }, []);
  return {
    selectedTab,
    setSelectedTab,
    setSortType,
    results,
    search,
    handleChange,
    reset,
    setSearch,
    searchRef
  };
};
