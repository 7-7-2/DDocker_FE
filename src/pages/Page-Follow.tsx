import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Taps from '@/components/common/Taps';
import UserListItem from '@/components/follow/UserListItem';
import { useSelectTap } from '@/hooks/useSelectTap';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import { getUsernameById } from '@/api/follow';
import { FOLLOW_TEXTS } from '@/constants/follow';
import { FollowCountProps } from '@/types/types';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

const { taps } = FOLLOW_TEXTS;

const Follow: React.FC<FollowCountProps> = () => {
  const { signedIn } = useGetSignedIn();
  const { userId } = useParams();
  const { state: tabState } = useLocation();
  const { seletedTap, handleSelectTap } = useSelectTap(tabState || taps[0]);

  const { data: username } = useQuery({
    queryKey: ['username', userId],
    queryFn: () => {
      return userId && getUsernameById(userId);
    },
    enabled: !!userId && !!signedIn
  });
  const headerText = username && username.data;
  useComposeHeader(false, headerText, 'close');

  const pageData =
    seletedTap === taps[0]
      ? { ...SEO_DATA.follow, pageUrl: `${SEO_DATA.follow.pageUrl}/${userId}` }
      : {
          ...SEO_DATA.following,
          pageUrl: `${SEO_DATA.following.pageUrl}/${userId}`
        };

  return (
    <>
      <SEOMeta pageData={pageData} />
      {username && (
        <Taps
          taps={taps}
          selectedTab={seletedTap}
          handleButtonClick={handleSelectTap}
        />
      )}
      <UserListItem
        activeTab={seletedTap}
        pageUserId={userId}
      />
    </>
  );
};

export default Follow;
