import { useState } from 'react';
import UserListItem from '@/components/follow/UserListItem';
import { FollowCountProps } from '@/types/types';
import { getUsernameById } from '@/api/follow';
import { useLocation, useParams } from 'react-router-dom';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useQuery } from '@tanstack/react-query';
import FollowTabs from '@/components/follow/FollowTabs';

const Follow: React.FC<FollowCountProps> = () => {
  const { signedIn } = useGetSignedIn();
  const { userId } = useParams();
  console.log('🚀 ~ userId:', userId);

  const { state: tabState } = useLocation();
  const [activeTab, setActiveTab] = useState(tabState || '팔로워');

  const { data: username } = useQuery({
    queryKey: ['username', userId],
    queryFn: () => {
      return userId && getUsernameById(userId);
    },
    enabled: !!userId && !!signedIn
  });

  const handleButtonTouch = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveTab(e.currentTarget?.value);
  };

  return (
    <>
      {username && (
        <FollowTabs
          activeTab={activeTab}
          handleButtonTouch={handleButtonTouch}
          username={username.data}
        />
      )}

      <UserListItem
        activeTab={activeTab}
        pageUserId={userId}
      />
    </>
  );
};

export default Follow;
