import Button from '@/components/common/Button';
import { BUTTON_TEXTS } from '@/constants/common';
import { ERROR_TEXTS } from '@/constants/error';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { Align, Column, MarginAuto } from '@/styles/layout';
import { DefaultBtn, Regular, Semibold } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { home } = BUTTON_TEXTS;
const { title, text } = ERROR_TEXTS;
const Error = () => {
  return (
    <Container className={cx(Align, Column)}>
      <ContentsContainer>
        <svg
          width={'158'}
          height={'136'}
          className={MarginAuto}>
          <use href={`/sprite.svg#icon-ddocker-error`} />
        </svg>
        <Title className={Semibold}>{title}</Title>
        <Text className={Regular}>{text}</Text>
      </ContentsContainer>
      <Button
        text={home}
        className={cx(DefaultBtn)}
        onTouchEnd={useNavigateTo('/')}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 500px;
  min-width: 360px;
  width: 100vw;
  height: calc(
    100dvh - 50px - env(safe-area-inset-bottom) - env(safe-area-inset-top)
  );
  padding: 0 20px 20px;
  margin-bottom: calc(env(safe-area-inset-bottom));
`;

const ContentsContainer = styled.div`
  text-align: center;
  margin: auto 0;
`;

const Title = styled.div`
  margin-top: 26px;
  font-size: var(--font-sizes-xl);
  color: var(--colors-main-dark);
  line-height: 24px;
`;

const Text = styled.div`
  margin: 10px auto 0;
  white-space: break-spaces;
  text-align: center;
  color: var(--colors-mid-grey);
  line-height: 20px;
`;

export default Error;
