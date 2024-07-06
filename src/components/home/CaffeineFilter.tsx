import { lazy, Suspense } from 'react';
import Button from '@/components/common/Button';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { styled } from 'styled-system/jsx';
import { RegistBtn } from '@/styles/styles';
import { css, cx } from 'styled-system/css';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

const CaffeineInfo = lazy(() => import('@/components/home/CaffeineInfo'));
const CoffeeSelection = lazy(() => import('@/components/home/CoffeeSelection'));

const CaffeineFilter = () => {
  const registPage = useNavigateTo('/post/register');
  const { signedIn } = useGetSignedIn();

  return (
    <Container>
      <Suspense>
        <CoffeeSelection />
      </Suspense>
      <Suspense>
        <CaffeineInfo />
      </Suspense>
      {signedIn && (
        <Button
          text={BUTTON_TEXTS.mainRegister}
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
