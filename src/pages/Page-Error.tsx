import Button from '@/components/common/Button';
import { BUTTON_TEXTS } from '@/constants/common';
import { ERROR_TEXTS } from '@/constants/error';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { Align, Column, DVW, MarginAuto } from '@/styles/layout';
import {
  BottomBtnContainer,
  DefaultBtn,
  Regular,
  Semibold
} from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { home } = BUTTON_TEXTS;
const { title, text } = ERROR_TEXTS;
const Error = () => {
  return (
    <Container className={cx(Align, Column, DVW)}>
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
      <div className={BottomBtnContainer}>
        <Button
          text={home}
          className={cx(DefaultBtn)}
          onClick={useNavigateTo('/')}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100dvh - env(safe-area-inset-bottom) - env(safe-area-inset-top));
  padding: 0 20px;
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
