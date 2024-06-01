import Button from '@/components/common/Button';
import CaffeineInfo from '@/components/home/CaffeineInfo';
import CoffeeSelection from '@/components/home/CoffeeSelection';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { styled } from 'styled-system/jsx';
import { RegistBtn } from '@/styles/styles';
import { css, cx } from 'styled-system/css';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

const CaffeineFilter = () => {
  const registPage = useNavigateTo('/post/register');
  const { signedIn } = useGetSignedIn();

  return (
    <Container>
      <CoffeeSelection />
      <CaffeineInfo />
      {signedIn && (
        <Button
          text={BUTTON_TEXTS.regist}
          onClick={registPage}
          className={cx(RegistBtn, MarginBottom)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 32px 0 0;
`;
const MarginBottom = css`
  margin-bottom: 32px;
`;

export default CaffeineFilter;
