import CTA from '@/components/common/CTA';
import { PROFILE_TEXTS } from '@/constants/profile';

import { css, cx } from 'styled-system/css';
import { Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const {
  user: { my, another }
} = PROFILE_TEXTS;

const EmptyPostGrid = ({
  profileId,
  userId
}: {
  profileId: string | undefined;
  userId?: string;
}) => {
  const goToHome = useNavigateTo('/');
  return (
    <Container
      className={cx(
        Justify,
        userId || (userId === profileId && DefaultHeight)
      )}>
      {userId === profileId ? (
        <CTA
          text={my.text}
          actionText={my.actionText}
          fn={goToHome}
        />
      ) : (
        <CTA
          text={another}
          btn={false}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: auto 0;
  height: calc(100vh - 460px);
`;

const DefaultHeight = css`
  height: calc(100vh - 500px);
`;

export default EmptyPostGrid;
