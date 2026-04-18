import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Tabs from '@/components/common/Tabs';
import UserListItem from '@/components/follow/UserListItem';
import { useSelectTab } from '@/hooks/useSelectTab';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import { getUsernameById } from '@/api/follow';
import { FOLLOW_TEXTS } from '@/constants/follow';
import { FollowCountProps } from '@/types/types';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

const { tabs } = FOLLOW_TEXTS;

const Follow: React.FC<FollowCountProps> = () => {
  const { signedIn } = useGetSignedIn();
  const { userId } = useParams();
  const { state: tabState } = useLocation();
  const { selectedTab, handleSelectTab } = useSelectTab(tabState || tabs[0]);

  const { data: username } = useQuery({
    queryKey: ['username', userId],
    queryFn: () => {
      return userId && getUsernameById(userId);
    },
    enabled: !!userId && !!signedIn
  });
  const headerText = username && username.data;
  useComposeHeader('back', headerText, '');

  const pageData =
    selectedTab === tabs[0]
      ? { ...SEO_DATA.follow, pageUrl: `${SEO_DATA.follow.pageUrl}/${userId}` }
      : {
          ...SEO_DATA.following,
          pageUrl: `${SEO_DATA.following.pageUrl}/${userId}`
        };

  return (
    <>
      <SEOMeta pageData={pageData} />
      {username && (
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          handleButtonClick={handleSelectTab}
        />
      )}
      <UserListItem
        activeTab={selectedTab}
        pageUserId={userId}
      />
    </>
  );
};

export default Follow;
