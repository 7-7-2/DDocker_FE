import { lazy, Suspense } from 'react';

const CTA = lazy(() => import('@/components/common/CTA'));
import { PROFILE_TEXTS } from '@/constants/profile';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { usePostOptions } from '@/hooks/post/usePostOptions';

import { styled } from 'styled-system/jsx';
import { Justify } from '@/styles/layout';

const { my, another } = PROFILE_TEXTS.user;

const EmptyPostGrid = ({
  profileId,
  userId
}: {
  profileId: string | undefined;
  userId?: string;
}) => {
  const goToHome = useNavigateTo('/');
  const goToRegister = useNavigateTo('/post/register');
  const { recoverFooterState } = usePostOptions();
  const myProfile = userId === profileId;
  const handleClickBtn = () => {
    if (myProfile) {
      return goToRegister();
    } else {
      goToHome();
      recoverFooterState();
    }
  };

  return (
    <Container className={Justify}>
      <Suspense>
        <CTA
          text={myProfile ? my.text : another.text}
          actionText={myProfile ? my.actionText : another.actionText}
          fn={handleClickBtn}
        />
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

export default EmptyPostGrid;
