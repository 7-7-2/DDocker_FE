import { useDebounce } from '@/hooks/search/useDebounce';
import { useState, useEffect } from 'react';
import { getSearchUser } from '@/api/search';
import { SimplifyUser } from '@/types/types';

export const useSearchInput = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SimplifyUser[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const reset = () => {
    setSearch('');
  };

  const debounceVal = useDebounce(search);

  useEffect(() => {
    if (debounceVal) {
      getSearchUser(debounceVal).then(res => {
        setResults(res.data);
      });
    }
  }, [debounceVal]);

  return { results, search, handleChange, reset, setSearch };
};
