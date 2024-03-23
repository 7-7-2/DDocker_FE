import { checkFollowing } from '@/api/follow';
import { useEffect, useState } from 'react';

const useGetCheckFollowing = (ProfileId: string | undefined) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const getCheckFollowing = async () => {
    const res = ProfileId && (await checkFollowing(ProfileId));
    setIsFollowing(res.data);
  };

  useEffect(() => {
    getCheckFollowing();
  }, [isFollowing]);

  return { isFollowing, getCheckFollowing };
};

export default useGetCheckFollowing;
