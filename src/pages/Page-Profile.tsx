import { lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';
import { PROFILE_TEXTS } from '@/constants/profile';
import { isModalState } from '@/atoms/atoms';

import SEO_DATA from '@/constants/SEOData';
import SEOMeta from '@/components/common/SEOMeta';

const MemberProfile = lazy(() => import('../components/profile/MemberProfile'));
const ModalCTA = lazy(() => import('../components/common/ModalCTA'));
const AnonymousUserCard = lazy(
  () => import('../components/profile/AnonymousUserCard')
);

const { nonMemberId } = PROFILE_TEXTS;
const { signIn2 } = BUTTON_TEXTS;
const { signIn } = MODAL_CTA_TEXTS;

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const { userId: profileId } = useParams();
  const { userId } = useCachedUserInfo();
  const isModal = useRecoilValue(isModalState);
  const goToSignIn = useNavigateTo('/start/1');
  const nonMembers = profileId === nonMemberId;

  const handleActions: React.MouseEventHandler<HTMLButtonElement> = () => {
    goToSignIn();
  };

  const AnonymousModalCTA = isModal && !userId && (
    <ModalCTA
      actionText={signIn2}
      text={signIn.text}
      fn={handleActions}
    />
  );

  const pageData = {
    ...SEO_DATA.profile,
    pageUrl: `${SEO_DATA.profile.pageUrl}/${profileId}`
  };

  return (
    <>
      <SEOMeta pageData={pageData} />
      {!nonMembers ? (
        <>
          {AnonymousModalCTA}
          <MemberProfile
            userId={userId}
            profileId={profileId}
          />
        </>
      ) : (
        <AnonymousUserCard />
      )}
    </>
  );
};

export default Profile;
