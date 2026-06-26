import { lazy, Suspense } from 'react';

import Button from '@/components/common/Button';

import { BUTTON_TEXTS } from '@/constants/common';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DisabledBtn, MainRegisterBtn } from '@/styles/styles';

const CaffeineInfo = lazy(() => import('@/components/home/CaffeineInfo'));
const CoffeeSelection = lazy(() => import('@/components/home/CoffeeSelection'));

const CaffeineFilter = () => {
  const registPage = useNavigateTo('/post/register');
  const { signedIn } = useGetSignedIn();
  const { caffeineValue } = useCoffeeSelection();
  const DisabledRegisterBtn = cx(DisabledBtn, MainRegisterBtn);

  return (
    <Container>
      <Suspense>
        <CoffeeSelection />
      </Suspense>
      <Suspense>
        <CaffeineInfo />
      </Suspense>
      <Button
        text={BUTTON_TEXTS.mainRegister}
        onClick={registPage}
        className={
          signedIn && caffeineValue ? MainRegisterBtn : DisabledRegisterBtn
        }
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 24px 0 28px;
`;

export default CaffeineFilter;
