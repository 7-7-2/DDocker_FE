import { Suspense, lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SEOMeta from '@/components/common/SEOMeta';

import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { PROFILE_TEXTS } from '@/constants/profile';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

import SEO_DATA from '@/constants/SEOData';

const MemberProfile = lazy(() => import('../components/profile/MemberProfile'));

const { nonMemberId } = PROFILE_TEXTS;
const Profile = () => {
  useShowFooter(true);
  const { userId: profileId } = useParams();
  const { signedIn } = useGetSignedIn();
  const { userId } = useCachedUserInfo();
  const nonMember = profileId === nonMemberId;
  const goToLogIn = useNavigateTo('/start/1');

  const pageData = {
    ...SEO_DATA.profile,
    pageUrl: `${SEO_DATA.profile.pageUrl}/${profileId}`
  };

  useEffect(() => {
    !signedIn && nonMember && goToLogIn();
  }, [profileId]);

  return (
    <>
      <SEOMeta pageData={pageData} />
      {!nonMember && (
        <Suspense>
          <MemberProfile
            userId={userId}
            profileId={profileId}
          />
        </Suspense>
      )}
    </>
  );
};

export default Profile;
