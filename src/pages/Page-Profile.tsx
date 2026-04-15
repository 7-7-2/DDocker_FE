import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import SEOMeta from '@/components/common/SEOMeta';

import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { PROFILE_TEXTS } from '@/constants/profile';
import SEO_DATA from '@/constants/SEOData';

const MemberProfile = lazy(() => import('../components/profile/MemberProfile'));
const AnonymousUserCard = lazy(
  () => import('../components/profile/AnonymousUserCard')
);

const { nonMemberId } = PROFILE_TEXTS;

const Profile = () => {
  const { userId: profileId } = useParams();
  const { userId } = useCachedUserInfo();
  const nonMember = !userId || profileId === nonMemberId;

  const pageData = {
    ...SEO_DATA.profile,
    pageUrl: `${SEO_DATA.profile.pageUrl}/${profileId}`
  };

  return (
    <>
      <SEOMeta pageData={pageData} />
      {!nonMember ? (
        <Suspense>
          <MemberProfile
            userId={userId}
            profileId={profileId}
          />
        </Suspense>
      ) : (
        <Suspense>
          <AnonymousUserCard />
        </Suspense>
      )}
    </>
  );
};

export default Profile;
