import { getUserFollowCounts } from '@/api/user';
import { UserFollowCountsTypes } from '@/types/types';
import { useEffect, useState } from 'react';

const useGetFollowCount = (
  ProfileId: string | undefined,
  isFollowing?: boolean
) => {
  const [userFollowCount, setUserFollowCount] =
    useState<UserFollowCountsTypes>();
  const getUserFollowCount = async () => {
    const res = ProfileId && (await getUserFollowCounts(ProfileId));
    setUserFollowCount(res);
  };

  useEffect(() => {
    getUserFollowCount();
  }, [ProfileId, isFollowing]);

  return {
    userFollowCount
  };
};

export default useGetFollowCount;
