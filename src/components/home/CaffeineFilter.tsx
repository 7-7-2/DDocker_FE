import { lazy, Suspense } from 'react';

import Button from '@/components/common/Button';

import { BUTTON_TEXTS } from '@/constants/common';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { styled } from 'styled-system/jsx';
import { MainRegisterBtn } from '@/styles/styles';
import { Flex } from '@/styles/layout';

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
        <div className={Flex}>
          <Button
            text={BUTTON_TEXTS.mainRegister}
            onClick={registPage}
            className={MainRegisterBtn}
          />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 32px 0;
`;

export default CaffeineFilter;
