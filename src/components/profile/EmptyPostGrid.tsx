import { lazy, Suspense } from 'react';

const CTA = lazy(() => import('@/components/common/CTA'));
import { PROFILE_TEXTS } from '@/constants/profile';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { usePostOptions } from '@/hooks/post/usePostOptions';

import { styled } from 'styled-system/jsx';
import { Center, Column, Justify } from '@/styles/layout';

const { text, actionText } = PROFILE_TEXTS.user;

const EmptyPostGrid = ({
  myProfile,
  isGrid
}: {
  myProfile: boolean;
  isGrid: boolean;
}) => {
  const goToHome = useNavigateTo('/');
  const goToRegister = useNavigateTo('/post/register');
  const { recoverFooterState } = usePostOptions();

  const handleClickBtn = () => {
    if (myProfile) {
      return goToRegister();
    } else {
      goToHome();
      recoverFooterState();
    }
  };

  return (
    <Container className={Center}>
      <Suspense>
        <CTA
          text={isGrid ? text.grid : text.list}
          actionText={myProfile ? actionText : undefined}
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
