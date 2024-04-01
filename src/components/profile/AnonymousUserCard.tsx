import CTA from '@/components/common/CTA';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column, Justify } from '@/styles/layout';
import { Default, Semibold } from '@/styles/styles';

const { anonymous } = PROFILE_TEXTS;

const AnonymousUserCard = () => {
  const goToSignIn = useNavigateTo('/start/1');

  const handleSignInBtn = () => {
    goToSignIn();
  };

  return (
    <AnonymousCard className={cx(Default, Column, Justify)}>
      <Title className={Semibold}>{anonymous.title}</Title>
      <CTA
        text={anonymous.text}
        actionText={anonymous.actionText}
        btn
        fn={handleSignInBtn}
      />
    </AnonymousCard>
  );
};

const AnonymousCard = styled.div`
  width: inherit;
  height: 364px;
  border-radius: 16px;
  margin-top: 28px;
  padding: 0 52px;
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
`;

export default AnonymousUserCard;
