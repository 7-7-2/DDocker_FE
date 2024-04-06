import Button from '@/components/common/Button';
import { ANONYMOUS_TEXTS } from '@/constants/coffee';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { Align, Column } from '@/styles/layout';
import { DefaultBtn, Regular } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { logInCTA } = ANONYMOUS_TEXTS;

const LogInCTA = () => {
  const goToSignIn = useNavigateTo('/start/1');

  const handleSignInBtn = () => {
    goToSignIn();
  };

  return (
    <Container className={cx(Column, Align)}>
      <Text className={Regular}>{logInCTA.text}</Text>
      <Button
        text={logInCTA.btn}
        onTouchEnd={handleSignInBtn}
        className={DefaultBtn}
      />
    </Container>
  );
};

const Container = styled.div`
  gap: 11px;
  margin-bottom: 20px;
`;
const Text = styled.span`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
  left: calc(100vw / 2 - 46px);
  bottom: 20px;
`;
export default LogInCTA;
