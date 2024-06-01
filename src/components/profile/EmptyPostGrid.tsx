import { lazy, Suspense } from 'react';
import { PROFILE_TEXTS } from '@/constants/profile';

import { css, cx } from 'styled-system/css';
import { Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { usePostOptions } from '@/hooks/post/usePostOptions';

const CTA = lazy(() => import('@/components/common/CTA'));
const { my, another } = PROFILE_TEXTS.user;

const EmptyPostGrid = ({
  profileId,
  userId
}: {
  profileId: string | undefined;
  userId?: string;
}) => {
  const goToHome = useNavigateTo('/');
  const { recoverFooterState } = usePostOptions();
  const myProfile = userId === profileId;
  const handleClickBtn = () => {
    goToHome();
    recoverFooterState();
  };

  return (
    <Container className={cx(Justify, userId === profileId && DefaultHeight)}>
      <Suspense>
        <CTA
          text={myProfile ? my.text : another}
          actionText={myProfile ? my.actionText : ''}
          fn={myProfile ? handleClickBtn : undefined}
        />
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  padding: auto 0;
  height: calc(100vh - 520px);
`;

const DefaultHeight = css`
  height: calc(100vh - 470px);
`;

export default EmptyPostGrid;
