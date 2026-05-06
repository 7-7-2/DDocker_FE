import { useLayoutEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { brandState } from '@/atoms/atoms';
import { useToggle } from '@/hooks/post/useToggle';
import { brandMapToEng } from '@/utils/convertBrandName';
import { getAnchorPosition } from '@/utils/getAnchorPosition';

import {
  getWeeklyPopularBrandMenu,
  getBrandPopularPosts,
  getBrandRecentPosts
} from '@/api/trend';

export const usePostBrandPopular = () => {
  const selected = useRecoilValue(brandState);
  const { toggle: sort, setToggle } = useToggle();
  const [location, setLocation] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleSortBtn = () => {
    setToggle(!sort);
  };

  const { data: weeklyPopularBrandMenu } = useQuery({
    queryKey: ['weeklyPopularBrandMenu', selected],
    queryFn: () => {
      return getWeeklyPopularBrandMenu(brandMapToEng(selected));
    },
    enabled: !!selected && !sort
  });

  const { data: brandPopularPosts } = useQuery({
    queryKey: ['brandPopularPosts', selected],
    queryFn: () => {
      return getBrandPopularPosts(brandMapToEng(selected));
    },
    enabled: !!selected && !sort
  });

  const { data: brandRecentPosts } = useQuery({
    queryKey: ['brandRecentPosts', selected],
    queryFn: () => {
      return getBrandRecentPosts(brandMapToEng(selected));
    },
    enabled: !!selected && sort
  });

  useLayoutEffect(() => {
    setLocation(getAnchorPosition(bodyRef));
  }, [selected]);

  return {
    bodyRef,
    location,
    selected,
    sort,
    handleSortBtn,
    weeklyPopularBrandMenu,
    brandPopularPosts,
    brandRecentPosts
  };
};
