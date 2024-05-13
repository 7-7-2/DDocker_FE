import CTA from '@/components/common/CTA';
import { PROFILE_TEXTS } from '@/constants/profile';

import { css, cx } from 'styled-system/css';
import { Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { usePostOptions } from '@/hooks/post/usePostOptions';

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
  const { recoverFooterState } = usePostOptions();

  const handleClickBtn = () => {
    goToHome();
    recoverFooterState();
  };
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
          fn={handleClickBtn}
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
  height: calc(100vh - 520px);
`;

const DefaultHeight = css`
  height: calc(100vh - 500px);
`;

export default EmptyPostGrid;
